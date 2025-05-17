import { ref, computed, onMounted, watch, toRaw, inject } from "vue"
import { fromXsdDuration } from "@servicestack/client"
import ServiceStackVue, { useClient, useFormatters } from "@servicestack/vue"
import { GetComfyWorkflows, QueueComfyWorkflow, GetExecutedComfyWorkflowsResults, GetComfyWorkflowInfo } from "dtos.mjs"
import WorkflowsViewer, { formatName, toWorkflow } from "./components/WorkflowsViewer.mjs"
import { ArtifactGallery, ArtifactDownloads } from "./components/Artifacts.mjs"
import { HistoryTitle, HistoryGroups } from "./components/HistoryGroupsIdb.mjs"
import { openDB, deleteDB, wrap, unwrap } from '/lib/mjs/idb.mjs'
import FileUpload from "./components/FileUpload.mjs"

const UiLayout = {
    template:`<div class="flex flex-wrap md:flex-nowrap w-full">
    <div class="flex flex-col flex-grow pr-4 overflow-y-auto md:h-screen md:pl-1" style="">
        <div>
            <div id="top" ref="refTop"></div>
            <div class="text-base px-3 m-auto lg:px-1 pt-3">
                <slot name="main"></slot>

                <div id="bottom" ref="refBottom"></div>
            </div>
        </div>
    </div>
    <div class="w-full sm:w-72 md:w-92 h-screen md:border-l h-full md:py-2 md:px-2 bg-white">
        <slot name="sidebar"></slot>
    </div>
</div>`,
    setup(props, { expose }) {
        const refTop = ref()
        const refBottom = ref()

        expose({ refTop, refBottom })

        return { refTop, refBottom }
    }
}

function formatDuration(xsdDuration) {
    const seconds = fromXsdDuration(xsdDuration)
    const wholeSeconds = Math.floor(seconds);
    const milliseconds = Math.round((seconds - wholeSeconds) * 1000);
    const duration = {
        seconds: wholeSeconds,
        milliseconds: milliseconds
    };
    return new Intl.DurationFormat("en", { style:"narrow" }).format(duration)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function wordList(items) {
    if (!items || !items.length) return ''
    if (typeof items == 'string') {
        items = items.split(',')
    }
    if (!Array.isArray(items)) return ''
    if (items.length === 1) return items[0]
    return items.slice(0, -1).join(', ') + ' or ' + items[items.length - 1]
}

export const acceptedImages = `${wordList('WEBP,JPG,PNG,GIF,BMP,TIFF')} (max 5MB)`
export const acceptedVideos = `${wordList('MP4,MOV,WEBM,MKV,AVI,WMV,OGG')} (max 50MB)`
export const acceptedAudios = `${wordList('MP3,M4A,AAC,FLAC,WAV,WMA')} (max 10MB)`

export default {
    components: {
        UiLayout,
        HistoryTitle,
        HistoryGroups,
        WorkflowsViewer,
        ArtifactGallery,
        ArtifactDownloads,
        FileUpload,
    },
    template: `
<UiLayout>
    <template #main>
        <div class="pt-4">
            <!-- Top controls: Workflow selection, text prompt, and run button -->
            <div class="w-full mb-8">
                <div>
                    <!-- Text prompt input -->
                    <div class="w-full md:flex-grow">
                        <textarea
                            type="text"
                            v-model="workflowArgs.positivePrompt"
                            placeholder="Enter your prompt here..."
                            class="w-full h-[6rem] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            :disabled="!selectedWorkflow"
                            @keydown.enter.prevent="selectedWorkflow && workflowArgs.positivePrompt && runWorkflow(selectedWorkflow)"
                        />
                        <div v-if="selectedWorkflowInfo">
                            <!-- Controls Row -->
                            <div class="mt-2 flex flex-col lg:flex-row justify-center gap-2">
                                <!-- Aspect Ratio Controls -->
                                <div v-if="hasInput('width','height')" class="inline-flex items-center lg:rounded-md lg:shadow-sm" role="group" aria-label="Aspect ratio selection">
                                    <!-- Square aspect ratio -->
                                    <button type="button"
                                        @click="setArgs({ width:1024, height:1024 })"
                                        :class="['px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg',
                                            workflowArgs.width == workflowArgs.height
                                                ? 'bg-indigo-500 text-white hover:bg-indigo-600 border-indigo-600'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        ]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        </svg>
                                        <span class="text-xs mt-1 block">Square</span>
                                    </button>
                                    <!-- Landscape aspect ratio -->
                                    <button type="button"
                                        @click="setArgs({ width:1344, height:768 })"
                                        :class="['px-4 py-2 text-sm font-medium border-t border-b border-gray-200',
                                            workflowArgs.width > workflowArgs.height
                                                ? 'bg-indigo-500 text-white hover:bg-indigo-600 border-indigo-600'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        ]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                                        </svg>
                                        <span class="text-xs mt-1 block">Landscape</span>
                                    </button>
                                    <!-- Portrait aspect ratio -->
                                    <button
                                        type="button"
                                        @click="setArgs({ height:1344, width:768 })"
                                        :class="[
                                            'px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-lg',
                                            workflowArgs.width < workflowArgs.height
                                                ? 'bg-indigo-500 text-white hover:bg-indigo-600 border-indigo-600'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                        ]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                        </svg>
                                        <span class="text-xs mt-1 block">Portrait</span>
                                    </button>
                                </div>
                                <div v-if="hasInput('width','height')" class="px-4 py-1 text-sm font-medium flex items-center">
                                    <div class="text-center">
                                        <div class="text-xs">
                                            <input type="text" v-model="workflowArgs.width" class="w-8 p-0 m-0 text-xs text-center border-none">
                                        </div>
                                        <div class="text-xs px-0.5 text-gray-500">x</div>
                                        <div class="text-xs">
                                            <input type="text" v-model="workflowArgs.height" class="w-8 p-0 m-0 text-xs text-center border-none">
                                        </div>
                                    </div>
                                </div>

                                <!-- Denoise/Creativity Slider -->
                                <div v-if="hasInput('denoise')" class="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                                    <label for="denoise" class="text-sm font-medium text-gray-700 whitespace-nowrap cursor-help"
                                        title="The amount of denoising applied, lower values will maintain the structure of the initial image allowing for image to image sampling.">
                                        Denoise
                                    </label>
                                    <input
                                        id="denoise"
                                        type="range"
                                        v-model="workflowArgs.denoise"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        class="w-28 sm:w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    >
                                    <span class="text-sm font-medium text-gray-700 w-6 text-right">{{ workflowArgs.denoise }}</span>
                                </div>

                                <!-- CFG Input with Up/Down Controls -->
                                <div v-if="hasInput('cfg')" class="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
                                    <label for="cfg-control" class="text-sm font-medium text-gray-700 whitespace-nowrap cursor-help"
                                        title="The Classifier-Free Guidance scale balances creativity and adherence to the prompt. Higher values result in images more closely matching the prompt however too high values will negatively impact quality.">
                                        CFG
                                    </label>
                                    <div class="flex items-center">
                                        <button @click="workflowArgs.cfg = Math.max(0, parseFloat((workflowArgs.cfg - 0.1).toFixed(1)))"
                                                class="py-1 text-gray-500 hover:text-gray-700 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                        <input type="text" v-model="workflowArgs.cfg" class="w-8 p-0 text-sm text-center border-none">
                                        <button @click="workflowArgs.cfg = Math.min(100, parseFloat((workflowArgs.cfg + 0.1).toFixed(1)))"
                                                class="py-1 text-gray-500 hover:text-gray-700 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="hasInput('image')" class="mt-4">
                                <FileUpload ref="refImage" id="image" v-model="workflowArgs.image" required
                                    accept=".webp,.jpg,.jpeg,.png,.gif" :acceptLabel="acceptedImages" @change="renderKey++">
                                    <template #title>
                                        <span class="font-semibold text-green-600">Click to upload</span> or drag and drop
                                    </template>
                                    <template #icon>
                                        <svg class="mb-2 h-12 w-12 text-green-500 inline" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true" data-phx-id="m9-phx-F_34be7KYfTF66Xh">
                                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </template>
                                </FileUpload>
                            </div>
                            <div v-if="hasInput('audio')" class="mt-4">
                                <FileUpload ref="refAudio" id="audio" v-model="workflowArgs.audio" required
                                    accept=".mp3,.m4a,.aac,.flac,.wav,.wma" :acceptLabel="acceptedAudios" @change="renderKey++">
                                    <template #title>
                                        <span class="font-semibold text-green-600">Click to upload</span> or drag and drop
                                    </template>
                                    <template #icon>
                                        <svg class="mb-2 h-12 w-12 text-green-500 inline" viewBox="0 0 24 24">
                                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M22 12c-.237 5.082-4.622 9.133-9.995 9.133q-.976.001-1.936-.178c-.459-.087-.689-.13-.849-.105c-.16.024-.387.145-.842.386a6.5 6.5 0 0 1-4.226.657a5.3 5.3 0 0 0 1.087-2.348c.1-.53-.147-1.045-.519-1.422C3.034 16.411 2 14.105 2 11.567C2 6.284 6.48 2 12.005 2q.762 0 1.495.106M16 4.5c.491-.506 1.8-2.5 2.5-2.5M21 4.5c-.491-.506-1.8-2.5-2.5-2.5m0 0v8m-6.504 2h.008m3.987 0H16m-8 0h.009" color="currentColor"/>
                                        </svg>
                                    </template>
                                </FileUpload>
                            </div>
                            <div v-if="hasInput('video')" class="mt-4">
                                <FileUpload ref="refVideo" id="video" v-model="workflowArgs.video" required
                                    accept=".mp4,.mov,.webm,.mkv,.avi,.wmv,.ogg" :acceptLabel="acceptedVideos" @change="renderKey++">
                                    <template #title>
                                        <span class="font-semibold text-green-600">Click to upload</span> or drag and drop
                                    </template>
                                    <template #icon>
                                        <svg class="mb-2 h-12 w-12 text-green-500 inline" viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1">
                                                <path stroke-miterlimit="10" d="M9.047 9.5v5"/>
                                                <path stroke-linejoin="round" d="M11.34 11.605L9.373 9.638a.46.46 0 0 0-.651 0l-1.968 1.967"/>
                                                <path stroke-linejoin="round" d="M12 5.32H6.095A3.595 3.595 0 0 0 2.5 8.923v6.162a3.595 3.595 0 0 0 3.595 3.595H12a3.595 3.595 0 0 0 3.595-3.595V8.924A3.594 3.594 0 0 0 12 5.32m9.5 4.118v5.135c0 .25-.071.496-.205.708a1.36 1.36 0 0 1-.555.493a1.27 1.27 0 0 1-.73.124a1.37 1.37 0 0 1-.677-.278l-3.225-2.588a1.38 1.38 0 0 1-.503-1.047c0-.2.045-.396.133-.575c.092-.168.218-.315.37-.432l3.225-2.567a1.36 1.36 0 0 1 .678-.278c.25-.032.504.011.729.124a1.33 1.33 0 0 1 .76 1.181"/>
                                            </g>
                                        </svg>
                                    </template>
                                </FileUpload>
                            </div>

                            <!-- Advanced Controls Toggle -->
                            <div v-if="advancedInputs.length" class="mt-4">
                                <button @click="setPrefs({ showAdvanced: !prefs.showAdvanced })"
                                    class="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path v-if="prefs.showAdvanced" fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        <path v-else fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                    </svg>
                                    {{ prefs.showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options' }}
                                </button>

                                <!-- Advanced Inputs -->
                                <div v-show="prefs.showAdvanced" class="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 ease-in-out">
                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div v-for="input in advancedInputs" class="flex flex-col space-y-1" :class="input.type === 'String' && input.classType == 'CLIPTextEncode' ? 'row-span-2' : ''">
                                            <label :for="input.name" class="text-sm font-medium text-gray-700" :class="input.tooltip ? 'cursor-help' : ''" :title="input.tooltip">{{input.label}}</label>
                                            <textarea v-if="input.type === 'String' && input.classType == 'CLIPTextEncode'"
                                                :id="input.name" :name="input.name"
                                                v-model="workflowArgs[input.name]"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                rows="5"></textarea>
                                            <input v-else-if="input.type === 'String'"
                                                v-model="workflowArgs[input.name]"
                                                :id="input.name"
                                                type="text"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <input v-else-if="input.type === 'Int' || input.type === 'Float'"
                                                v-model="workflowArgs[input.name]"
                                                :id="input.name"
                                                type="number"
                                                :step="input.step ?? 1"
                                                :min="input.min ?? 0"
                                                :max="input.max ?? Number.MAX_SAFE_INTEGER"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <select v-else-if="input.type === 'Enum'"
                                                v-model="workflowArgs[input.name]"
                                                :id="input.name"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option v-for="value in input.enumValues" :value="value">{{ value }}</option>
                                            </select>
                                            <div v-else class="text-sm text-red-500">Unknown {{input.name}} {{input.classType}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 flex flex-col md:flex-row gap-4 items-center justify-center">
                    <!-- Select workflow button -->
                    <button
                        class="pl-4 pr-6 py-3 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2 text-lg font-medium w-full md:w-auto"
                        :class="selectedWorkflow ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border border-indigo-300' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'"
                        @click="showWorkflowList = !showWorkflowList">
                        <!-- Chevron that changes direction based on expanded state -->
                        <svg class="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path v-if="showWorkflowList" d="M19 9l-7 7-7-7"></path>
                            <path v-else d="M9 6l6 6-6 6"></path>
                        </svg>
                        <!-- File icon when workflow is selected -->
                        <svg v-if="selectedWorkflow" class="h-5 w-5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                        </svg>
                        <span class="truncate">{{ selectedWorkflow ? formatName(selectedWorkflow.name) : 'Select a Workflow' }}</span>
                    </button>

                    <!-- Run workflow button -->
                    <button
                        class="pl-4 pr-6 py-3 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2 text-lg font-medium w-full md:w-auto"
                        :class="selectedWorkflow && workflowArgs.positivePrompt ? 'bg-indigo-500 text-white hover:bg-indigo-700 border border-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400'"
                        :disabled="!selectedWorkflow || !workflowArgs.positivePrompt"
                        @click="selectedWorkflow && workflowArgs.positivePrompt && runWorkflow(selectedWorkflow)">
                        <svg class="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Run
                    </button>
                </div>
            </div>
        </div>
        <WorkflowsViewer :workflows="workflows" :show="showWorkflowList" @select="selectWorkflow" />
        <div>
            <div v-for="gen in generations">
                <div>
                    <div class="flex items-center justify-between">
                        <span @click="selectGeneration(gen)" class="cursor-pointer my-4 flex justify-center items-center text-xl hover:underline underline-offset-4" :title="gen.request.args?.positivePrompt ?? ''">
                            <div class="overflow-hidden text-ellipsis whitespace-nowrap max-w-3xl">{{ gen.request.args?.positivePrompt ?? '' }}</div>
                        </span>
                        <div class="group flex cursor-pointer" @click="discardResult(gen)">
                            <div class="ml-1 invisible group-hover:visible">discard</div>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z"></path><path fill="currentColor" d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"></path></svg>
                        </div>
                    </div>

                    <div v-if="gen.workflow.name" class="float-right">
                        <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                            :title="'Workflow ' + gen.workflow.path">
                            {{gen.workflow.name}}
                        </span>
                        <span v-if="gen.results?.duration" class="ml-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                            :title="'Executed in ' + formatDuration(gen.results?.duration)">
                            {{formatDuration(gen.results?.duration)}}
                        </span>
                    </div>
                    <div v-if="gen.error">
                        <ErrorSummary :status="gen.error" />
                        <div class="mt-2">
                            <button @click="retryGeneration(gen)" class="flex items-center text-small text-blue-500 hover:text-blue-700">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11.896 18a.75.75 0 0 1-.75.75c-3.792 0-6.896-3.005-6.896-6.75s3.104-6.75 6.896-6.75c3.105 0 5.749 2.015 6.605 4.801l.603-1.02a.75.75 0 0 1 1.292.763l-1.63 2.755a.75.75 0 0 1-1.014.272L14.18 11.23a.75.75 0 1 1 .737-1.307l1.472.83c-.574-2.288-2.691-4.003-5.242-4.003C8.149 6.75 5.75 9.117 5.75 12s2.399 5.25 5.396 5.25a.75.75 0 0 1 .75.75"/></svg>
                                retry
                            </button>
                        </div>
                    </div>
                    <div v-else-if="gen.results" class="w-full">

                        <ArtifactGallery :results="toArtifacts(gen.results.assets)">
                            <template #bottom="{ selected }">
                                <ArtifactDownloads :url="selected.url">
                                    <div @click.stop.prevent="toggleIcon(selected)" class="flex cursor-pointer text-sm text-gray-300 hover:text-gray-100 hover:drop-shadow">
                                        <svg :class="['w-5 h-5 mr-0.5',selected.url == selectedThread?.icon ? '-rotate-45' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 18l-8 8M20.667 4L28 11.333l-6.38 6.076a2 2 0 0 0-.62 1.448v3.729c0 .89-1.077 1.337-1.707.707L8.707 12.707c-.63-.63-.184-1.707.707-1.707h3.729a2 2 0 0 0 1.448-.62z"/></svg>
                                        {{selected.url == selectedThread?.icon ? 'unpin icon' : 'pin icon' }}
                                    </div>
                                </ArtifactDownloads>
                            </template>
                        </ArtifactGallery>

                    </div>
                    <div v-else class="py-12 flex justify-center">
                        <Loading><span class="text-lg text-gray-500">Executing Workflow...</span></Loading>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template #sidebar>
        <HistoryTitle @clear="clearHistory" />
        <div v-href="{id:undefined}" :class="['md:pl-4 whitespace-nowrap hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6', !routes.id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"/><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z"/></svg>
            New Thread
        </div>
        <HistoryGroups :history="history" v-slot="{ item }" @save="saveHistoryItem($event)" @remove="removeHistoryItem($event)">
            <Icon class="h-5 w-5 rounded-full flex-shrink-0 mr-1" :src="item.icon ?? icons.image" loading="lazy" alt="icon" />
            <span :title="item.title">{{item.title}}</span>
        </HistoryGroups>
    </template>
</UiLayout>
    `,
    setup(props) {
        const routes = inject('routes')
        const client = useClient()
        const workflows = ref(toJsonArray(localStorage.getItem('workflows')))
        const prefs = ref(toJsonObject(localStorage.getItem('comfy:prefs')) ?? {
            showAdvanced: false, // Toggle for showing/hiding advanced controls
            width: 1024,
            height: 1024,
        })
        const selectedWorkflow = ref(null)
        const selectedWorkflowInfo = ref(null)
        const showWorkflowList = ref(true)
        const selectedThread = ref(null)
        const generations = ref([])
        const history = ref([])
        const workflowArgs = ref({})
        const refImage = ref()
        const refAudio = ref()
        const refVideo = ref()
        const usedSeeds = []

        const renderKey = ref(0)

        const advancedInputs = computed(() => {
            return selectedWorkflowInfo.value?.inputs?.filter(x => 
                !['positivePrompt','width','height','denoise','cfg','image','audio','video'].includes(x.name)) ?? []
        })
        
        function setPrefs(newPrefs) {
            Object.assign(prefs.value, newPrefs)
            localStorage.setItem('comfy:prefs', JSON.stringify(prefs.value,undefined,2))
        }
        function setArgs(newArgs) {
            Object.assign(workflowArgs.value, newArgs)
        }

        const { truncate } = useFormatters()

        const icons = {
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%234f46e5" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 2v14h14V5H5m11.5 11l-3-3l-2 2l-3-3l-2 2v1h10v-1Z"/%3E%3C/svg%3E'
        }

        function toJsonArray(json) {
            try {
                return json ? JSON.parse(json) : []
            } catch (e) {
                return []
            }
        }

        function toJsonObject(json) {
            try {
                return json ? JSON.parse(json) : null
            } catch (e) {
                return null
            }
        }

        // Select a workflow
        async function selectWorkflow(workflow, args=null) {
            // When selecting a new workflow within an existing thread retain positivePrompt, width, height
            if (!args && workflowArgs.value.positivePrompt) {
                args = {
                    positivePrompt: workflowArgs.value.positivePrompt,
                    width: workflowArgs.value.width,
                    height: workflowArgs.value.height,
                }
            }
            selectedWorkflow.value = workflow
            showWorkflowList.value = false
            selectedWorkflowInfo.value = workflow
                ? toJsonObject(localStorage.getItem(`info:${workflow.path}`))
                : null
            updateAdvancedArgs(args)
            const api = await client.api(new GetComfyWorkflowInfo({ workflow: workflow.path }))
            selectedWorkflowInfo.value = api.response?.result
            if (selectedWorkflowInfo.value) {
                localStorage.setItem(`info:${workflow.path}`, JSON.stringify(selectedWorkflowInfo.value,undefined,2))
            }
            updateAdvancedArgs(args)
        }

        function updateAdvancedArgs(args) {
            for (const input of selectedWorkflowInfo.value?.inputs ?? []) {
                let value = input.default
                if (args && args[input.name]) {
                    value = args[input.name]
                }
                if (input.name === 'seed' || input.name === 'noise_seed') {
                    if (usedSeeds.includes(value)) {
                        value = getRandomInt(0, Number.MAX_SAFE_INTEGER)
                    }
                }
                workflowArgs.value[input.name] = value 
            }
        }

        function hasInput(...inputs) {
            if (!selectedWorkflowInfo.value?.inputs?.length) {
                return false
            }
            for (const input of inputs) {
                if (!selectedWorkflowInfo.value.inputs.find(x => x.name === input)) {
                    return false
                }
            }
            return true
        }

        let checkForUpdatesHandle

        // Run the selected workflow
        async function runWorkflow(workflow, existingGen) {
            console.log('Running workflow:', workflow.path)
            const positivePrompt = workflowArgs.value.positivePrompt
            console.log('Prompt text:', positivePrompt)

            // Use timestamp as ID
            const id = Date.now()
            if (!routes.id) {
                // Navigate to the new generation
                routes.to({ id })
            }

            const date = new Date().getTime()
            const threadId = parseInt(routes.id)
            let thread = await getThread(threadId)
            if (!thread) {
                console.error('Creating new thread for generation', id, threadId)
                thread = {
                    id: threadId,
                    date,
                    title: truncate(positivePrompt, 80),
                    workflow: workflow.path,
                    positivePrompt,
                }
                await saveThread(thread)
            }

            thread.date = date
            thread.workflow = workflow.path
            // Only change title if not set
            thread.title = thread.title || truncate(positivePrompt, 80)
            thread.positivePrompt = positivePrompt
            thread.width = workflowArgs.value.width ?? prefs.value.width
            thread.height = workflowArgs.value.height ?? prefs.value.height
            thread.denoise = workflowArgs.value.denoise
            thread.cfg = workflowArgs.value.cfg

            // Update the thread in the history list
            const historyItem = history.value.find(h => h.id === threadId)
            if (!historyItem) {
                history.value.push({
                    id: threadId,
                    created: date,
                    date,
                    title: thread.title,
                    icon: icons.image
                })
            } else {
                historyItem.date = date
            }

            const request = {
                workflow: workflow.path,
                args: Object.assign({}, toRaw(workflowArgs.value))
            }
            
            //console.log('request.args', request.args)

            thread.request = request
            await saveThread(thread)

            if (existingGen) {
                existingGen.error = undefined
            }

            const api = await client.api(new QueueComfyWorkflow(request))
            const useGeneration = existingGen ?? {
                id,
                threadId,
                workflow: toRaw(workflow),
            }

            useGeneration.date = date
            useGeneration.request = request
            useGeneration.queued = api.response
            useGeneration.error = api.error

            if (!existingGen) {
                generations.value.unshift(useGeneration)
            }

            await saveGenerationToDb(useGeneration)
            
            if (!api.error) {
                if ('seed' in workflowArgs.value) {
                    usedSeeds.push(workflowArgs.value.seed)
                    workflowArgs.value.seed = getRandomInt(0, Number.MAX_SAFE_INTEGER)
                }
                if ('noise_seed' in workflowArgs.value) {
                    usedSeeds.push(workflowArgs.value.noise_seed)
                    workflowArgs.value.noise_seed = getRandomInt(0, Number.MAX_SAFE_INTEGER)
                }
            }

            clearTimeout(checkForUpdatesHandle)
            checkForUpdatesHandle = setTimeout(checkForUpdates, 0)
        }

        async function retryGeneration(gen) {
            selectGeneration(gen)
            await runWorkflow(gen.workflow, gen)
        }

        // If there are any queued workflows, check for updates
        async function checkForUpdates() {
            const queuedGenerations = generations.value.filter(x => !x.results && !x.error)
            const refIds = queuedGenerations.map(x => x.queued.refId)
            if (!refIds.length) return

            const api = await client.api(new GetExecutedComfyWorkflowsResults({
                refIds: refIds,
                poll: true,
            }))
            if (api.succeeded) {
                console.log(`checkForUpdates: results=${Object.keys(api.response.results).join(',')}, errors=${Object.keys(api.response.errors).join(',')}`)
                for (const gen of queuedGenerations) {
                    const genError = api.response.errors[gen.queued.refId]
                    if (genError) {
                        gen.error = genError
                    } else {
                        gen.results = api.response.results[gen.queued.refId]

                        // Update thread icon if there are image results
                        if (gen.results && gen.results.assets && gen.results.assets.length > 0) {
                            try {
                                // Get the thread
                                const thread = await getThread(gen.threadId)
                                if (thread) {
                                    // Update the thread icon with the first image result
                                    const imageUrl = gen.results.assets[0].url
                                    thread.icon = imageUrl
                                    await saveThread(thread)

                                    // Update the history item icon
                                    const historyItem = history.value.find(h => h.id === gen.threadId)
                                    if (historyItem) {
                                        historyItem.icon = imageUrl
                                    }
                                }
                            } catch (error) {
                                console.error('Error updating thread icon:', error)
                            }
                        }
                    }

                    // Update the generation in IndexedDB
                    try {
                        if (db) {
                            await db.put('generations', toRaw(gen))
                        }
                    } catch (error) {
                        console.error('Error updating generation in IndexedDB:', error)
                        console.log(gen)
                    }
                }
                //renderKey.value++
            } else if (api.error) {
                console.error(`Error checking for updates: ${api.error.message}`)
            }

            const remaining = generations.value.filter(x => !x.results && !x.error)
            if (remaining.length) {
                clearTimeout(checkForUpdatesHandle)
                checkForUpdatesHandle = setTimeout(checkForUpdates, 0)
            }
        }

        async function selectGeneration(gen) {
            await selectWorkflow(gen.workflow, {
                positivePrompt: gen.request.args?.positivePrompt,
                width: gen.request.args?.width,
                height: gen.request.args?.height,
                denoise: gen.request.args?.denoise,
                cfg: gen.request.args?.cfg,
            })
        }

        function toArtifacts(assets) {
            return assets?.map(x => ({
                width: x.width,
                height: x.height,
                url: x.url,
                filePath: x.url.substring(x.url.indexOf('/artifacts')),
            })) ?? []
        }

        async function discardResult(gen) {
            const index = generations.value.findIndex(g => g === gen)
            if (index !== -1) {
                generations.value.splice(index, 1)
                await deleteGenerationFromDb(gen)
            }
        }

        // Initialize database
        let db

        async function initDb() {
            db = await openDB('comfy-db', 1, {
                upgrade(db) {
                    // Create a store of objects
                    const genStore = db.createObjectStore('generations', {
                        // The 'id' property of the object will be the key
                        keyPath: 'id',
                        // If it isn't explicitly set, create a value
                        autoIncrement: true,
                    })
                    // Create an index on the 'date' property
                    genStore.createIndex('date', 'date')
                    // Create an index on the 'threadId' property
                    genStore.createIndex('threadId', 'threadId')

                    // Create a store for threads which contains many generations
                    const threadStore = db.createObjectStore('threads', {
                        keyPath: 'id',
                    })
                    // Create an index on the 'date' property
                    threadStore.createIndex('date', 'date')
                }
            })
        }

        async function getThread(threadId) {
            if (!threadId) return null
            try {
                if (!db) await initDb()
                // Add to the store
                return await db.get('threads', threadId)
            } catch (error) {
                console.error(`Error retrieving thread ${threadId} from IndexedDB:`, error)
                console.log(threadId)
            }
        }
        async function saveThread(thread) {
            try {
                if (!db) await initDb()
                // Add to the store
                console.log('saveThread', toRaw(thread))
                await db.put('threads', toRaw(thread))
            } catch (error) {
                console.error('Error saving thread to IndexedDB:', error)
                console.log(thread)
            }
        }

        async function deleteThread(threadId) {
            if (!threadId) return null
            try {
                if (!db) await initDb()
                // Delete from the store
                await db.delete('threads', threadId)
            } catch (error) {
                console.error(`Error deleting thread ${threadId} from IndexedDB:`, error)
            }
        }

        async function loadGenerationsFromDb(threadId) {
            try {
                if (!db) await initDb()

                // Get only generations with the specified threadId
                const index = db.transaction('generations').store.index('threadId')
                const allGenerations = threadId ? await index.getAll(threadId) : []

                // Sort by date descending (newest first)
                allGenerations.sort((a, b) => b.date - a.date)

                generations.value = allGenerations

                const remaining = generations.value.filter(x => !x.results && !x.error)
                if (remaining.length) {
                    clearTimeout(checkForUpdatesHandle)
                    checkForUpdatesHandle = setTimeout(checkForUpdates, 0)
                }
            } catch (error) {
                console.error('Error loading generations from IndexedDB:', error)
            }
        }

        async function saveGenerationToDb(generation) {
            try {
                if (!db) await initDb()
                // Add to the store
                await db.add('generations', generation)
            } catch (error) {
                console.error('Error saving generation to IndexedDB:', error)
                console.log(generation)
            }
        }

        async function deleteGenerationFromDb(generation) {
            try {
                if (!db) await initDb()
                // Delete from the store
                await db.delete('generations', generation.id)
            } catch (error) {
                console.error('Error deleting generation from IndexedDB:', error)
            }
        }

        async function clearGenerationsFromDb() {
            try {
                if (!db) await initDb()

                // Clear the store
                await db.clear('generations')
                generations.value = []
            } catch (error) {
                console.error('Error clearing generations from IndexedDB:', error)
            }
        }

        async function clearHistory() {
            try {
                if (!db) await initDb()

                // Clear the generations store
                await clearGenerationsFromDb()

                // Clear the threads store
                await db.clear('threads')

                // Clear the history array
                history.value = []

                // Navigate to root if we're on a thread
                if (routes.id) {
                    routes.to({ id: undefined })
                }
            } catch (error) {
                console.error('Error clearing history:', error)
            }
        }

        async function selectThread(threadId) {
            const thread = await getThread(threadId)
            console.log('selectThread', routes.id, thread)
            selectedThread.value = thread
            if (thread) {
                await loadGenerationsFromDb(threadId)
                await selectWorkflow(toWorkflow(thread.workflow), {
                    positivePrompt: thread.positivePrompt,
                    width: thread.width,
                    height: thread.height,
                    denoise: thread.denoise,
                    cfg: thread.cfg,
                })
            } else {
                generations.value = []
            }
        }

        async function toggleIcon(selected){
            selectedThread.value.icon = selected.url === selectedThread.value.icon ? null : selected.url;
            await saveThread(selectedThread.value)
            const historyItem = history.value.find(h => h.id === selectedThread.value.id)
            if (historyItem) {
                historyItem.icon = selectedThread.value.icon;
            }
        }

        watch(() => routes.id, async () => {
            const threadId = parseInt(routes.id)
            if (!isNaN(threadId)) {
                await selectThread(threadId)
            } else {
                if (selectedWorkflowInfo.value) {
                    for (const input of selectedWorkflowInfo.value.inputs) {
                        workflowArgs.value[input.name] = input.default
                    }
                } else {
                    
                }
                generations.value = []
            }
        })

        async function loadThreadsFromDb() {
            try {
                if (!db) await initDb()

                // Get all threads from the store
                const allThreads = await db.getAll('threads')

                // Convert to history format
                const historyItems = allThreads.map(thread => ({
                    id: thread.id,
                    date: thread.date,
                    title: thread.title || 'Untitled',
                    icon: thread.icon || icons.image
                }))

                history.value = historyItems
            } catch (error) {
                console.error('Error loading threads from IndexedDB:', error)
            }
        }

        async function saveHistoryItem(item) {
            try {
                if (!db) await initDb()

                // Get the thread from the store
                const thread = await db.get('threads', item.id)
                if (thread) {
                    thread.title = item.title
                    await db.put('threads', thread)

                    // Update the history item
                    const historyItem = history.value.find(h => h.id === item.id)
                    if (historyItem) {
                        historyItem.title = item.title
                    }
                } else {
                    console.error('Error saving history item: thread not found', item.id)
                }
            } catch (error) {
                console.error('Error saving history item:', error)
                console.log(item)
            }
        }

        async function removeHistoryItem(item) {
            try {
                if (!db) await initDb()

                // Delete the thread from the store
                await db.delete('threads', item.id)

                // Delete all generations with this threadId
                const index = db.transaction('generations', 'readwrite').store.index('threadId')
                let cursor = await index.openCursor(item.id)

                while (cursor) {
                    await cursor.delete()
                    cursor = await cursor.continue()
                }

                // Remove from history
                const idx = history.value.findIndex(h => h.id === item.id)
                if (idx !== -1) {
                    history.value.splice(idx, 1)
                }

                // If we're currently viewing this thread, clear the view
                if (routes.id === item.id) {
                    routes.to({ id: undefined })
                }
            } catch (error) {
                console.error('Error removing history item:', error)
            }
        }

        // Initialize with first major group selected
        onMounted(async () => {
            const api = await client.api(new GetComfyWorkflows())
            workflows.value = api.response
            localStorage.setItem('workflows', JSON.stringify(workflows.value,undefined,2))

            // Load generations from IndexedDB for the current thread
            const threadId = routes.id ? parseInt(routes.id) : null
            await loadGenerationsFromDb(threadId)

            // Load threads for history
            await loadThreadsFromDb()

            // Load thread
            if (!isNaN(threadId)) {
                await selectThread(threadId)
            }
        })

        return {
            routes,
            prefs,
            renderKey,
            workflows,
            generations,
            history,
            icons,
            selectedWorkflow,
            selectedWorkflowInfo,
            selectedThread,
            showWorkflowList,
            formatName,
            selectWorkflow,
            runWorkflow,
            formatDuration,
            selectGeneration,
            toArtifacts,
            discardResult,
            clearHistory,
            saveHistoryItem,
            removeHistoryItem,
            retryGeneration,
            toggleIcon,
            hasInput,
            workflowArgs,
            refImage,
            refAudio,
            refVideo,
            acceptedImages,
            acceptedAudios,
            acceptedVideos,
            advancedInputs,
            setPrefs,
            setArgs,
        }
    }
}

