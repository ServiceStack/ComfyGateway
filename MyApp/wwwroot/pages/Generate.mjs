import { ref, onMounted, watch, toRaw, inject } from "vue"
import { useRouter, useRoute } from "vue-router"
import { ApiResult, indexOfAny, JSV } from "@servicestack/client"
import { useClient, useFormatters } from "@servicestack/vue"
import {
    QueueWorkflow, WaitForMyWorkflowGenerations, MyWorkflowGenerations, RequeueGeneration
} from "../mjs/dtos.mjs"
import { toJsonObject, toJsonArray, getRandomInt } from "./lib/utils.mjs"
import WorkflowSelector from "./components/WorkflowSelector.mjs"
import WorkflowPrompt from "./components/WorkflowPrompt.mjs"
import AssetGallery from "./components/AssetGallery.mjs"
import RecentThreads from "./components/RecentThreads.mjs"

const { truncate } = useFormatters()

export default {
    components:{
        WorkflowSelector,
        WorkflowPrompt,
        AssetGallery,
        RecentThreads,
    },
    template:`
<div v-if="store.initializing" class="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div class="flex flex-col items-center space-y-4">
        <div class="relative">
            <svg class="w-12 h-12 text-gray-300 dark:text-gray-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        <div class="text-center">
            <h2 class="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Initializing Application</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Please wait while we set up your workspace...</p>
        </div>
    </div>
</div>
<div v-else class="grid w-full" style="min-height:calc(100vh - 56px)" 
    :style="(store.threadCount && showRecents ? 'grid-template-columns: 22rem 1fr 15rem' : store.threadCount ? 'grid-template-columns: 22rem 1fr auto' : 'grid-template-columns: 25rem 1fr')">
    <!-- Left Panel -->
    <div class="py-2 px-2 border-r dark:border-gray-700 overflow-y-auto">
        <div v-if="selectedWorkflow" class="mb-2 flex justify-between">
            <span>{{selectedWorkflow.name}}</span>
            <span>
                <button type="button" @click="selectedWorkflow=null">change</button>
            </span>
        </div>
        <WorkflowPrompt ref="refPrompt"
            :selectedWorkflow="selectedWorkflow"
            :selectedWorkflowInfo="selectedWorkflowInfo"
            :workflowArgs="workflowArgs"
            @run="runWorkflow">
            <template #bottom>
                <div class="mt-4">
                    <ErrorSummary :status="runError" class="mb-2" />
                    <div v-if="selectedWorkflow" class="mb-2 flex flex-col md:flex-row gap-4 items-center justify-center">
                        <!-- Run workflow button -->
                        <div class="relative">
                            <button type="button"
                                class="pl-4 pr-6 py-3 rounded-lg shadow-md transition-all duration-200 flex items-center space-x-2 text-lg font-medium w-full md:w-auto"
                                :class="selectedWorkflow && workflowArgs.positivePrompt ? 'bg-indigo-500 text-white hover:bg-indigo-700 border border-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400'"
                                :disabled="!selectedWorkflow || !workflowArgs.positivePrompt"
                                @click="selectedWorkflow && workflowArgs.positivePrompt && runWorkflow(selectedWorkflow)">
                                <svg class="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                Run
                            </button>

                            <!-- Added to queue popup -->
                            <div v-if="showQueuedPopup" class="top-6 left-26 absolute bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-md shadow-md flex items-center space-x-2 animate-fade-in-out">
                                <svg class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                </svg>
                                <span class="whitespace-nowrap">in queue</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </WorkflowPrompt>
    </div>
    <!-- Main Panel -->
    <div class="flex flex-col overflow-y-auto h-full pl-1">
        <div>
            <div id="top" ref="refTop"></div>
            <div class="text-base m-auto">
                <WorkflowSelector :show="!selectedWorkflow" @select="selectWorkflow" />
                <AssetGallery v-if="selectedWorkflow" @selectWorkflow="selectWorkflow"
                    @selectGeneration="selectGeneration"
                    @retryGeneration="retryGeneration" />
                <div id="bottom" ref="refBottom"></div>
            </div>
        </div>
    </div>
    <!-- Right Panel -->
    <div v-if="store.threadCount && showRecents" class="bg-slate-50 dark:bg-slate-900 overflow-y-auto">
        <h4 class="flex items-center h-8">
            <button type="button" class="group ml-1 mr-1" @click="showRecents=!showRecents">
                <svg class="size-6 text-gray-500 dark:text-gray-400 group-hover:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Show Recents</title><path fill="currentColor" d="M18 6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3zm-6.5-2v11H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm1 0H15a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2.5z"/></svg>
                <svg class="size-6 text-gray-600 dark:text-gray-300 hidden group-hover:inline-block rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><title>Close Recents</title><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="M3.5 15.5v-10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2"/><path fill="currentColor" d="M5.5 15.5v-10a2 2 0 0 1 2-2h-2c-1 0-2 .895-2 2v10c0 1.105 1 2 2 2h2a2 2 0 0 1-2-2"/><path d="m10.5 13.5l-3-3l3-3m5 3h-8"/></g></svg>
            </button>
            Recents
        </h4>
        <div class="pl-1 py-2 text-sm">
            <RouterLink :to="{ path:'/generate/feed', query:{ ...$route.query, new:null } }" class="flex items-center gap-1 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                <svg class="size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"/><path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z"/></g></svg>
                New Thread
            </RouterLink>
        </div>
        <RecentThreads />
    </div>
    <!-- Collapsed Right Panel -->
    <div v-else-if="store.threadCount" class="bg-slate-50 dark:bg-slate-900 flex items-start justify-center pt-2">
        <button type="button" class="group" @click="showRecents=!showRecents">
            <svg class="size-6 text-gray-500 dark:text-gray-400 group-hover:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Show Recents</title><path fill="currentColor" d="M18 6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3zm-6.5-2v11H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm1 0H15a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2.5z"/></svg>
            <svg class="size-6 text-gray-600 dark:text-gray-300 hidden group-hover:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"><title>Show Recents</title><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="M3.5 15.5v-10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2"/><path fill="currentColor" d="M5.5 15.5v-10a2 2 0 0 1 2-2h-2c-1 0-2 .895-2 2v10c0 1.105 1 2 2 2h2a2 2 0 0 1-2-2"/><path d="m10.5 13.5l-3-3l3-3m5 3h-8"/></g></svg>
        </button>
    </div>
</div>
    `,
    setup() {
        const client = useClient()
        const store = inject('store')
        const router = useRouter()
        const route = useRoute()
        const selectedWorkflow = ref(store.selectedWorkflow)
        const selectedWorkflowInfo = ref(null)
        const selectedVersionId = ref(null)
        const workflowArgs = ref({})
        const refPrompt = ref()
        const refTop = ref()
        const refBottom = ref()
        const apiRunning = ref(new ApiResult())
        const runError = ref(null)
        const showRecents = ref(true)
        const showQueuedPopup = ref(false)

        function regenSeedsIfNeeded() {
            if ('seed' in workflowArgs.value && store.usedSeeds.includes(`${workflowArgs.value.seed}`)) {
                const old = workflowArgs.value.seed
                workflowArgs.value.seed = getRandomInt(0, Number.MAX_SAFE_INTEGER)
                console.log(`seed ${old} already used, replaced with ${workflowArgs.value.seed}`)
            }
            if ('noise_seed' in workflowArgs.value && store.usedSeeds.includes(`${workflowArgs.value.noise_seed}`)) {
                const old = workflowArgs.value.noise_seed
                workflowArgs.value.noise_seed = getRandomInt(0, Number.MAX_SAFE_INTEGER)
                console.log(`noise_seed ${old} already used, replaced with ${workflowArgs.value.noise_seed}`)
            }
        }

        // Select a Workflow
        async function selectWorkflow(workflow, args=null) {
            console.log('selectWorkflow', workflow, args, router?.currentRoute.value)

            let version = workflow.pinVersionId
            if (!version) {
                const workflowVersion = await store.getWorkflowVersionByWorkflowId(workflow.id)
                version = workflowVersion?.id
            }
            if (!version) {
                console.error('Workflow version not found', workflow)
                // return
            }

            await selectWorkflowVersion(version)
        }
        async function selectGeneration(gen) {
            await selectWorkflowVersion(gen.versionId)
            if (gen.args) {
                Object.keys(gen.args).forEach(key => {
                    workflowArgs.value[key] = gen.args[key]
                })
            }
        }
        async function selectWorkflowVersion(versionId) {
            if (!versionId) return

            try {
                const workflow = await store.getWorkflow(versionId)
                if (!workflow) {
                    console.error(`Workflow Version '${versionId}' not found`)
                    return
                }
                selectedVersionId.value = versionId
    
                let args = {}
                // When selecting a new workflow within an existing thread retain positivePrompt, width, height
                if (workflowArgs.value.positivePrompt) {
                    args = {
                        positivePrompt: workflowArgs.value.positivePrompt,
                        width: workflowArgs.value.width,
                        height: workflowArgs.value.height,
                        batchSize: workflowArgs.value.batchSize,
                    }
                }
                selectedWorkflow.value = workflow
                //updateAdvancedArgs(args)
                selectedWorkflowInfo.value = await store.getWorkflowInfo(workflow.pinVersionId)
                updateAdvancedArgs(args)
            } catch (e) {
                console.error('Failed to select workflow', e)
            }
        }

        function updateAdvancedArgs(args) {
            for (const input of selectedWorkflowInfo.value?.inputs ?? []) {
                let value = input.default
                if (args && args[input.name]) {
                    value = args[input.name]
                }
                if (input.name === 'seed' || input.name === 'noise_seed') {
                    if (store.usedSeeds.includes(`${value}`)) {
                        value = getRandomInt(0, Number.MAX_SAFE_INTEGER)
                    }
                }
                workflowArgs.value[input.name] = value
            }
        }

        async function onRouteChange() {

            const latestThreadPath = store.threads.length
                ? '/generate/feed/' + store.threads[0].id
                : null
            console.log('Generate.onRouteChange', route.path, route.params.tab, route.params.id, route.query, latestThreadPath)
            if (latestThreadPath && route.path === '/generate' && !('new' in route.query)) {
                console.log('redirecting to latest thread', latestThreadPath)
                router.replace({ path:latestThreadPath, query: route.query })
                return
            }
            
            if (route.query.version) {
                await selectWorkflowVersion(route.query.version)
            } else if (route.query.remix) {
                const api = await store.getWorkflowGeneration(route.query.remix)
                if (api.succeeded) {
                    const gen = api.response.result
                    console.log('gen', api.response.result)
                    await selectGeneration(gen)
                    router.replace({ query:{} })
                }
            } else if (route.params.tab === 'feed') {
                if (route.params.id) {
                    const thread = await store.selectThread(route.params.id)
                    if (!thread) return
                    if (!selectedWorkflow.value && thread?.args) {
                        if (thread.args.versionId) {
                            await selectWorkflowVersion(thread.args.versionId)
                        } else if (thread.args.workflowId) {
                            selectedWorkflow.value = await store.getWorkflow(thread.args.workflowId)
                            if (selectedWorkflow.value) {
                                await selectWorkflow(selectedWorkflow.value)
                            }
                        }
                    }

                    const pendingGenerations = store.threadGenerations.filter(x => !x.result && !x.error)
                    console.log(`/feed/${thread.id}: has ${pendingGenerations.length} pending generations`)
                    if (pendingGenerations.length) {
                        const api = await client.api(new MyWorkflowGenerations({
                            ids: pendingGenerations.map(x => x.id),
                        }))
                        if (api.succeeded) {
                            const updatedGenerations = api.response.results
                            console.log(`/feed/${thread.id}: results=${Object.keys(updatedGenerations.map(x => `${x.id}: ${x.statusUpdate}`)).join(',')}`)
                            for (const gen of updatedGenerations) {
                                await store.addGeneration(gen)
                            }
                            await store.loadMyGenerations()
                        }
                    }
                } else if ('new' in route.query) {
                    console.log('Opening new thread')
                    await store.selectThread(null)
                }

                console.log('startCheckingForUpdates.onRouteChange()')
                startCheckingForUpdates()
            }
        }

        watch(() => route.query.version, selectWorkflowVersion)
        watch(() => route.path, onRouteChange)

        onMounted(async () => {
            if (store.selectedWorkflow) {
                await selectWorkflowVersion(store.selectedWorkflow.versionId)
            }
            await onRouteChange()
        })

        let checkForUpdatesHandle
        async function runWorkflow(workflow) {
            if (!store.user) {
                location.href = '/Account/Login'
                return
            }
            
            runError.value = null
            console.log('Running workflow:', workflow.name, refPrompt.value?.refForm)
            const positivePrompt = workflowArgs.value.positivePrompt
            console.log('Prompt text:', positivePrompt)

            // Show the "Added to queue" popup
            showQueuedPopup.value = true
            setTimeout(() => {
                showQueuedPopup.value = false
            }, 2000) // Hide after 2 seconds (matches animation duration)

            regenSeedsIfNeeded()

            ;['image','video','audio'].forEach(inputName => {
                if (route.query[inputName]) {
                    workflowArgs.value[inputName] = route.query[inputName]
                }
            })

            const versionId = Number(selectedVersionId.value)
            let threadId = Number(route.params.id)
            const args = {
                workflowId: workflow.id,
                versionId,
                ...workflowArgs.value,
            }
            if (!threadId) {
                console.log('Creating new thread for generation', threadId, route)
                const pos = indexOfAny(positivePrompt, [',', '.', ':', '!'])
                const description = truncate(pos === -1
                    ? positivePrompt
                    : positivePrompt.substring(0, pos))
                const api = await store.createThread({
                    url: '/generate/feed/{id}',
                    description,
                    args,
                })
                if (api.error) {
                    runError.value = api.error
                    return
                }
                threadId = api.response.id
            } else {
                const api = await store.updateThread({
                    id: threadId,
                    args,
                })
                if (api.error) {
                    runError.value = api.error
                    return
                }
            }

            if (threadId !== Number(route.params.id)) {
                router.push({ path:'/generate/feed/' + threadId, query: route.query })
            }
            
            if (!refPrompt.value?.refForm) {
                console.error('Failed to find prompt form')
                return
            }
            
            const formData = new FormData(refPrompt.value?.refForm)
            
            // Log all items in formData with their type:
            for (const [name, value] of formData.entries()) {
                // Check if value is File or Blob
                if (value instanceof File || value instanceof Blob) {
                    console.log(`formData[${name}] = ${value.name} (${value.type})`)
                } else {
                    formData.delete(name)
                }
            }
            
            formData.set('description', positivePrompt)
            formData.set('workflowId', workflow.id)
            formData.set('versionId', versionId)
            formData.set('threadId', threadId)
            formData.set('args', JSV.stringify(Object.assign({}, toRaw(workflowArgs.value))))
            // console.log('formData', [...formData.entries()])
            
            const api = await client.apiForm(new QueueWorkflow(), formData)
            
            /*
            const request = new QueueWorkflow({
                description: positivePrompt,
                workflowId: workflow.id,
                versionId,
                threadId,
                args: Object.assign({}, toRaw(workflowArgs.value)),
            })
            console.log('QueueWorkflow', request)
            const api = await client.api(request)
            */

            store.selectWorkflow(args)
            await store.loadMyGenerations()

            console.log('startCheckingForUpdates.runWorkflow()')
            startCheckingForUpdates()

            let argsRemoved = false
            for (const inputName of ['image','video','audio']) {
                if (route.query[inputName]) {
                    delete workflowArgs.value[inputName]
                    argsRemoved = true
                }
            }
            if (argsRemoved) {
                router.push({ path:'/generate/feed/' + threadId })
            }
        }

        function startCheckingForUpdates(timeout=0) {
            if (waitingForUpdates) return
            clearTimeout(checkForUpdatesHandle)
            checkForUpdatesHandle = setTimeout(checkForUpdates, timeout)
        }

        let waitingForUpdates = false
        // If there are any queued workflows, check for updates
        async function checkForUpdates() {

            let threadId = Number(route.params.id)
            console.log('checkForUpdates', route.params.id, store.threadGenerations.length)
            if (!threadId) return

            const pendingGenerations = store.threadGenerations.filter(x => !x.result && !x.error)
            if (!pendingGenerations.length) {
                console.log('No pending generations', threadId)
                return
            }

            console.log('WaitForMyWorkflowGenerations', threadId, pendingGenerations.length)

            waitingForUpdates = true
            const api = await store.waitForMyWorkflowGenerations({ threadId })
            if (api.error) {
                console.error(`Error checking for updates: ${api.error.message}`)
                //wait for 5s
                await new Promise(resolve => setTimeout(resolve, 5000))
            }
            waitingForUpdates = false

            const remaining = store.threadGenerations.filter(x => !x.result && !x.error)
            if (remaining.length) {
                console.log('startCheckingForUpdates.checkForUpdates()')
                startCheckingForUpdates()
            }
        }

        async function retryGeneration(gen) {
            const request = new RequeueGeneration({
                id: gen.id,
            })
            console.log('RequeueGeneration', request)
            const api = await client.api(request)

            await Promise.all([
                store.loadMyGenerations(),
                store.processDeletedRows(),
            ])

            console.log('startCheckingForUpdates.retryGeneration()')
            startCheckingForUpdates()
        }

        return {
            store,
            selectedWorkflow,
            selectedWorkflowInfo,
            workflowArgs,
            runError,
            refPrompt,
            refTop,
            refBottom,
            showRecents,
            showQueuedPopup,
            selectWorkflow,
            selectGeneration,
            retryGeneration,
            runWorkflow,
        }
    }
}