import { ref, onMounted, onUnmounted, inject, unref } from "vue"
import { useClient, useAuth, useUtils } from "@servicestack/vue"
import { Inspect } from "@servicestack/client"
import { useRouter, useRoute } from "vue-router"
import { MyDevices, AgentInfo } from "../../mjs/dtos.mjs"
import ShellCommand from "./ShellCommand.mjs"

export class UserApiKeyResponse {
    /** @param {{result?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    result;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class CreateUserApiKey {
    /** @param {{name?:string,scopes?:string[],features?:string[],restrictTo?:string[],expiryDate?:string,notes?:string,refId?:number,refIdStr?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {string[]} */
    scopes;
    /** @type {string[]} */
    features;
    /** @type {string[]} */
    restrictTo;
    /** @type {?string} */
    expiryDate;
    /** @type {string} */
    notes;
    /** @type {?number} */
    refId;
    /** @type {string} */
    refIdStr;
    /** @type {{ [index: string]: string; }} */
    meta;
    getTypeName() { return 'CreateUserApiKey' }
    getMethod() { return 'POST' }
    createResponse() { return new UserApiKeyResponse() }
}

const CopyIcon = {
    template:`
      <div @click="copy(text)">
          <div class="cursor-pointer select-none p-1 rounded-md border block border-gray-200 dark:border-gray-700 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900">
            <svg v-if="copied" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" viewBox="0 0 24 24"><g fill="none"><path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1M8 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M8 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m0 0h2a2 2 0 0 1 2 2v3m2 4H10m0 0l3-3m-3 3l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
          </div>
      </div>
    `,
    props:['text'],
    setup(props) {
        const { copyText } = useUtils()
        const copied = ref(false)

        function copy(text) {
            copied.value = true
            copyText(text)
            setTimeout(() => copied.value = false, 3000)
        }
        return { copied, copy, }
    }
}

export default {
    components: {
        ShellCommand,
        CopyIcon,
    },
    template:`
    <div class="p-6">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">My Devices</h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage and monitor your connected ComfyUI devices
            </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span class="ml-3 text-gray-600 dark:text-gray-400">Loading devices...</span>
        </div>

        <!-- Empty State -->
        <div v-else-if="devices.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class=" dark:hover:bg-green-800"></span>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No devices found</h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Get unlimited generations by using your own NVIDIA GPU
            </p>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Install and connect your own ComfyUI Agent to get started:
            </p>
            <div class="mt-4 mx-auto max-w-xl flex flex-col gap-2">
                <ShellCommand>curl -fsSL {{store.appConfig.publicBaseUrl}}/install.sh | sh</ShellCommand>
            </div>
            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Then connect your ComfyUI instance by registering it with the API Key below:
            </p>
            <div v-if="!apiKey">
                <PrimaryButton class="mt-4" @click="createApiKey">Create API Key</PrimaryButton>
            </div>
            <ModalDialog v-else size-class="w-96" @done="apiKey=''">
              <div class="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="">
                  <div class="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">New API Key</h3>
                    <div class="pb-4">
                      <div class="space-y-6 pt-6 pb-5">
                        <div class="flex">
                          <TextInput id="apikey" type="text" v-model="apiKey" label="" @focus="$event.target.select()" readonly
                                     help="Make sure to copy your new API Key now as it wont be available later" />
                          <CopyIcon :text="apiKey" class="mt-1 ml-1" />
                        </div>
                      </div>
                      <div>
                        <PrimaryButton @click="apiKey=''" class="w-full">Close</PrimaryButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalDialog>            
        </div>

        <!-- Devices Grid -->
        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="device in devices" :key="device.id"
                 class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">

                <!-- Device Header -->
                <div class="px-4 py-5 sm:p-6">
                    <div class="flex justify-between">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                    <svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-4">
                                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 truncate" :title="device.deviceId ?? ''">
                                    {{ device.shortId }}
                                </h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    {{device.lastIp ?? 'Device ID'}}
                                </p>
                            </div>
                        </div>

                        <!-- Status Badge -->
                        <div class="flex-shrink-0">
                            <span :class="getStatusBadgeClass(device)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                                <svg class="-ml-0.5 mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                </svg>
                                {{ getDeviceStatus(device) }}
                            </span>
                        </div>
                    </div>

                    <!-- GPU Information -->
                    <div v-if="device.gpus && device.gpus.length > 0" class="mt-4">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">GPU</h4>
                        <div class="space-y-2">
                            <div v-for="gpu in device.gpus" :key="gpu.index" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                <div>
                                    {{gpu.name}}
                                </div>
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-gray-600 dark:text-gray-300">GPU {{ gpu.index }}</span>
                                    <span class="text-gray-900 dark:text-gray-100 font-medium">
                                        {{ formatMemory(gpu.used) }} / {{ formatMemory(gpu.total) }}
                                    </span>
                                </div>
                                <div class="mt-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div class="h-2 rounded-full transition-all duration-300"
                                         :class="getMemoryBarClass(gpu)"
                                         :style="{ width: getMemoryPercentage(gpu) + '%' }">
                                    </div>
                                </div>
                                <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {{ getMemoryPercentage(gpu).toFixed(1) }}% used
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Queue Information -->
                    <div class="mt-4 flex items-center justify-between">
                        <div class="flex items-center">
                            <svg class="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="text-sm text-gray-600 dark:text-gray-300">Queue: {{ device.queueCount || 0 }}</span>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            {{ formatLastUpdate(device.lastUpdate) }}
                        </div>
                    </div>

                    <!-- Model Counts -->
                    <div class="mt-4">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Available Models</h4>
                        <div class="flex flex-wrap gap-2">
                            <div v-if="device.checkpoints?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 cursor-help"
                                 :title="getModelTooltip(device.checkpoints, 'Checkpoints')">
                                Checkpoints: {{ device.checkpoints.length }}
                            </div>
                            <div v-if="device.loras?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 cursor-help"
                                 :title="getModelTooltip(device.loras, 'LoRAs')">
                                LoRAs: {{ device.loras.length }}
                            </div>
                            <div v-if="device.vaes?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 cursor-help"
                                 :title="getModelTooltip(device.vaes, 'VAEs')">
                                VAEs: {{ device.vaes.length }}
                            </div>
                            <div v-if="device.controlNets?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 cursor-help"
                                 :title="getModelTooltip(device.controlNets, 'ControlNets')">
                                ControlNets: {{ device.controlNets.length }}
                            </div>
                            <div v-if="device.upscalers?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 cursor-help"
                                 :title="getModelTooltip(device.upscalers, 'Upscalers')">
                                Upscalers: {{ device.upscalers.length }}
                            </div>
                            <div v-if="device.embeddings?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 cursor-help"
                                 :title="getModelTooltip(device.embeddings, 'Embeddings')">
                                Embeddings: {{ device.embeddings.length }}
                            </div>
                            <div v-if="device.clips?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 cursor-help"
                                 :title="getModelTooltip(device.clips, 'CLIP Models')">
                                CLIPs: {{ device.clips.length }}
                            </div>
                            <div v-if="device.clipVisions?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 cursor-help"
                                 :title="getModelTooltip(device.clipVisions, 'CLIP Vision Models')">
                                CLIP Visions: {{ device.clipVisions.length }}
                            </div>
                            <div v-if="device.unets?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 cursor-help"
                                 :title="getModelTooltip(device.unets, 'UNet Models')">
                                UNets: {{ device.unets.length }}
                            </div>
                            <div v-if="device.stylers?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 cursor-help"
                                 :title="getModelTooltip(device.stylers, 'Style Models')">
                                Stylers: {{ device.stylers.length }}
                            </div>
                            <div v-if="device.gligens?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200 cursor-help"
                                 :title="getModelTooltip(device.gligens, 'GLIGEN Models')">
                                GLIGENs: {{ device.gligens.length }}
                            </div>
                            <div v-if="device.photoMakers?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 cursor-help"
                                 :title="getModelTooltip(device.photoMakers, 'PhotoMaker Models')">
                                PhotoMakers: {{ device.photoMakers.length }}
                            </div>
                            <div v-if="device.languageModels?.length"
                                 class="relative inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-800 dark:text-fuchsia-200 cursor-help"
                                 :title="getModelTooltip(device.languageModels, 'Language Models')">
                                Language Models: {{ device.languageModels.length }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    setup() {
        const client = useClient()
        const { user } = useAuth()
        const store = inject('store')
        /** @type {Ref<AgentInfo[]>} */
        const devices = ref([])
        const apiKey = ref('')
        const loading = ref(true)
        let updateTimer = null

        async function update() {
            const startedAt = Date.now()
            try {
                const lastUpdate = devices.value.length 
                    ? devices.value.map(x => x.lastUpdate).sort().pop() 
                    : null
                const request = new MyDevices()
                if (lastUpdate) {
                    request.afterModifiedDate = lastUpdate
                }
                const api = await client.api(request)
                if (api.succeeded) {
                    devices.value = api.response.results
                    // devices.value.length = 0
                    console.log('MyDevices GPUs', Inspect.printDump(devices.value.map(x => x.gpus)),
                        devices.value.map(x => x.queueCount))
                }
            } catch (error) {
                console.error('Failed to load devices:', error)
            } finally {
                loading.value = false
            }
            clearTimeout(updateTimer)
            const timeRemaining = 5000 - (Date.now() - startedAt)
            updateTimer = setTimeout(update, Math.max(timeRemaining, 1000))
        }
        
        onMounted(async () => {
            await update()
        })
        onUnmounted(() => clearTimeout(updateTimer))

        function getDeviceStatus(device) {
            if (!device.enabled) return 'Disabled'
            if (device.offlineDate) return 'Offline'
            return 'Online'
        }

        function getStatusBadgeClass(device) {
            const status = getDeviceStatus(device)
            const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'

            switch (status) {
                case 'Online':
                    return `${baseClasses} bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200`
                case 'Offline':
                    return `${baseClasses} bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200`
                case 'Disabled':
                    return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300`
                default:
                    return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300`
            }
        }

        function formatMemory(bytes) {
            if (!bytes) return '0 GB'
            const gb = bytes / 1024
            return `${gb.toFixed(1)} GB`
        }

        function getMemoryPercentage(gpu) {
            if (!gpu.total || gpu.total === 0) return 0
            return (gpu.used / gpu.total) * 100
        }

        function getMemoryBarClass(gpu) {
            const percentage = getMemoryPercentage(gpu)
            if (percentage >= 90) return 'bg-red-500'
            if (percentage >= 70) return 'bg-yellow-500'
            return 'bg-green-500'
        }

        function formatLastUpdate(lastUpdate) {
            if (!lastUpdate) return 'Never'

            const date = new Date(lastUpdate)
            const now = new Date()
            const diffMs = now.getTime() - date.getTime()
            const diffMins = Math.floor(diffMs / 60000)

            if (diffMins < 1) return 'Just now'
            if (diffMins < 60) return `${diffMins}m ago`

            const diffHours = Math.floor(diffMins / 60)
            if (diffHours < 24) return `${diffHours}h ago`

            const diffDays = Math.floor(diffHours / 24)
            return `${diffDays}d ago`
        }

        function getModelTooltip(models, categoryName) {
            if (!models || models.length === 0) return ''

            // Limit the number of models shown in tooltip to prevent it from being too long
            const maxModels = 30
            const modelNames = models.slice(0, maxModels)

            let tooltip = `${categoryName}:\n${modelNames.join('\n')}`

            if (models.length > maxModels) {
                tooltip += `\n... and ${models.length - maxModels} more`
            }

            return tooltip
        }
        
        async function createApiKey() {
            console.log('createApiKey')
            const request = ref(new CreateUserApiKey({
                name: `${user.value.userName} API Key`
            }))
            const api = await client.api(request.value)
            if (api.succeeded) {
                apiKey.value = api.response.result
            }
        }

        return {
            store,
            devices,
            loading,
            getDeviceStatus,
            getStatusBadgeClass,
            formatMemory,
            getMemoryPercentage,
            getMemoryBarClass,
            formatLastUpdate,
            getModelTooltip,
            apiKey,
            createApiKey,
        }
    }
}