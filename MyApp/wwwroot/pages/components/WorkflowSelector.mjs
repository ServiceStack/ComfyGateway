import { ref, computed, onMounted, inject, watch } from "vue"
import { useRoute } from "vue-router"
import { lastLeftPart, rightPart } from "@servicestack/client"
import { WorkflowGroups, reactionCounts } from "../lib/utils.mjs"

const majorGroups = WorkflowGroups

const WorkflowReactions = {
    template:`
    <div v-if="version" class="pt-1.5 text-sm flex items-center justify-between w-full">
        <button v-for="(count,emoji) of reactionCounts(version.reactions,['👍','❤','😂'])" type="button" 
                @click.prevent.stop="toggleReaction(version, emoji)"
                :title="'React with ' + emoji"
                class="px-1 py-0.5 lg:px-2 border" 
                :class="[ store.hasWorkflowVersionReaction(version.id, emoji) 
                    ? 'shadow-sm bg-gray-200 dark:bg-gray-700' 
                    : 'border-transparent hover:bg-gray-200 dark:hover:bg-gray-700' ]">
            <div>
                <span class="flex gap-1">
                    <div :class="{ 'text-red-500': emoji == '❤' }">{{emoji}}</div> {{count}}
                </span>
            </div>
        </button>
        <!-- download button -->
        <button type="button" class="px-1 py-0.5 lg:px-2 border" 
                @click.prevent.stop="downloadWorkflow(version)"
                :title="'Download Workflow'"
                class="border-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <div>
                <!-- download icon -->
                <svg class="size-5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"></path></svg>
            </div>
        </button>
    </div>
    `,
    emits: ['changed'],
    props: {
        version:Object,
    },
    setup(props, { emit }) {
        const store = inject('store')

        async function toggleReaction(version, reaction) {
            await store.toggleWorkflowVersionReaction(version.id, reaction)
            const latestVersion = await store.getWorkflowVersion(version.id)
            if (latestVersion) {
                emit('changed', latestVersion)
            }
        }
        
        function downloadWorkflow() {
            location.href = `/api/DownloadWorkflowVersion?id=${props.version.id}`
        }

        return {
            store,
            toggleReaction,
            reactionCounts,
            downloadWorkflow,
        }
    }
}


export default {
    components: {
        WorkflowReactions,
    },
    template: `
    <!-- Workflow selection area with transition -->
    <div v-show="show" class="p-4 w-full overflow-hidden"
         style="opacity: 1; transform: translateY(0);"
         :style="show ? {} : {maxHeight: '0px', opacity: '0', transform: 'translateY(-20px)'}">

        <div class="bg-gray-50/80 dark:bg-gray-800/80">
            <div class="w-full py-1">
                <div class="flex items-center gap-3">
                    <!-- Categories Container -->
                    <div class="flex gap-1.5 min-w-0 flex-1 hide-scrollbar flex-wrap">
                        <!-- All Categories Pill -->
                        <RouterLink type="button"
                            :to="{ query: { ...$route.query, tag:undefined } }"
                            :class="[
                                'whitespace-nowrap px-2 rounded-sm font-normal text-sm transition-all duration-200',
                                !$route.query.tag
                                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 border border-indigo-400 dark:border-indigo-500'
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                            ]"
                        >
                            all
                        </RouterLink>
                        <!-- Individual Category Pills -->
                        <RouterLink
                            v-for="tag in allTags"
                            :key="tag"
                            :to="{ query: { ...$route.query, tag } }"
                            :class="[
                                'whitespace-nowrap px-2 rounded-sm font-normal text-sm transition-all duration-200',
                                $route.query.tag === tag
                                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 border border-indigo-400 dark:border-indigo-500'
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                            ]">
                            {{ tag.toLowerCase() }}
                        </RouterLink>
                    </div>                    
                </div>
            </div>
        </div>

        <!-- Workflow Grid -->
        <div class="mt-6">
            <div v-if="filteredWorkflows.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
                No workflows found for the selected filters.
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div v-for="workflow in filteredWorkflows"
                     :key="workflow.version.id"
                     @click="$emit('select', workflow)"
                     class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 group flex flex-col justify-between overflow-hidden">

                    <!-- Poster Image -->
                    <div class="overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-700">
                        <img v-if="workflow.version.posterImage"
                             :src="workflow.version.posterImage"
                             :alt="workflow.version.name"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200">
                        <div v-else style2="aspect-ratio: 1/2;" 
                            class="aspect-square w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                            <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div class="relative">
                        <!-- Title -->
                        <h3 :title="workflowTitle(workflow)"
                            class="absolute -mt-7 text-center w-full p-1 bg-gray-900/50 font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2 line-clamp-2">
                            {{ workflow.version.name }}
                            <span v-if="false && workflow.version.version" class="text-xs text-gray-500 dark:text-gray-400">({{ workflow.version.version }})</span>
                        </h3>
                        
                        <!-- Content -->
                        <div class="px-2 pt-2">
    
                            <!-- Description -->
                            <p v-if="workflow.description" class="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                {{ workflow.description }}
                            </p>
    
                            <!-- Tags -->
                            <div v-if="workflow.tags && workflow.tags.length > 0" class="flex flex-wrap gap-1 mb-3">
                                <span v-for="tag in workflow.tags.slice(0, 3)"
                                      :key="tag"
                                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                    {{ tag }}
                                </span>
                                <span v-if="workflow.tags.length > 3"
                                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                    +{{ workflow.tags.length - 3 }}
                                </span>
                            </div>
    
                            <!-- Footer Info -->
                            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <!-- Node Count -->
                                <div class="flex items-center" 
                                    :title="workflow.version.nodes?.join('\\n')">
                                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                    </svg>
                                    {{ workflow.version.nodes?.length || 0 }} nodes
                                </div>
                                
                                <!-- Asset Count -->
                                <div class="flex items-center" 
                                    :title="workflow.version.assets?.join('\\n')">
                                    {{ workflow.version.assets?.length || 0 }} assets
                                </div>
    
                                <!-- Gallery Link -->
                                <RouterLink class="text-right hover:text-sky-500 dark:hover:text-sky-400" :to="{ path: '/images', query: { version: workflow.version.id } }">
                                    gallery
                                    <span>&rarr;</span>
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    
                    <WorkflowReactions :version="workflow.version" @changed="workflow.version.reactions = $event.reactions" />
                </div>
            </div>
        </div>
    </div>
    `,
    emits:['select'],
    props: {
        show: Boolean,
    },
    setup(props) {
        const store = inject('store')
        const route = useRoute()
        
        const categoryWorkflows = computed(() => {
            const category = route.query.category ?? 'Text to Image'
            return store.workflows.filter(x => x.category === category)
        })

        const allTags = computed(() => {
            return Array.from(new Set(categoryWorkflows.value.flatMap(x => x.tags).filter(Boolean)))
        })

        const filteredWorkflows = computed(() => {
            const tag = route.query.tag
            if (!tag) return categoryWorkflows.value
            return categoryWorkflows.value.filter(x => x.tags?.includes(tag))
        })
        
        function workflowTitle(workflow) {
            const sb = []
            
            const nameOnly = path => lastLeftPart(rightPart(path,'/'),'.')
            
            const assets = workflow.version.assets || []
            const checkpoints = assets.filter(x => x.startsWith('checkpoints/')
                || x.startsWith('diffusion_models/') || x.toLowerCase().startsWith('stable-diffusion/'))
                .map(nameOnly)
            if (checkpoints.length > 0) {
                sb.push(`Checkpoint: ${checkpoints.join(', ')}`)
            }
            const vaes = assets.filter(x => x.toLowerCase().startsWith('vae/')).map(nameOnly)
            if (vaes.length > 0) {
                sb.push(`VAE: ${vaes.join(', ')}`)
            }
            const loras = assets.filter(x => x.startsWith('loras/')).map(nameOnly)
            if (loras.length > 0) {
                sb.push(`LoRAs: ${loras.join(', ')}`)
            }
            
            return sb.join('\n')
        }
        
        // Initialize with first major group selected and expand all workflow types by default
        onMounted(() => {
            // Update workflows tables behind scenes
            store.loadWorkflowsAndVersions()
        })

        return {
            store,
            filteredWorkflows,
            allTags,
            workflowTitle,
        }
    }
}
