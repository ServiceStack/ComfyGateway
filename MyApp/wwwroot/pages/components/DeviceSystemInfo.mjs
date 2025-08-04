import { computed, inject, onMounted, ref, watch } from "vue"
import { useClient } from "@servicestack/vue"
import { GetDeviceStats } from "../../mjs/dtos.mjs"
import { humanifyNumber } from "../lib/utils.mjs"

export const SystemInfo = {
    template: `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">System Information</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Device ID</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white font-mono truncate" :title="device.deviceId || device.shortId || ''">
              {{ device.deviceId || device.shortId || 'N/A' }}
            </dd>
          </div>
          <div v-if="device.lastIp">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Last IP</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ device.lastIp }}</dd>
          </div>
          <div v-if="device.comfyVersion">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">ComfyUI Version</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ device.comfyVersion }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Queue Count</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ device.queueCount || 0 }}</dd>
          </div>
          <div v-if="device.userName">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">User</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ device.userName }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Update</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatLastUpdate(device.lastUpdate) }}
            </dd>
          </div>
        </div>
      </div>
    `,
    props: {
        device: Object,
    },
    setup(props) {

        function formatLastUpdate(lastUpdate) {
            if (!lastUpdate) return 'Never'
            const date = new Date(lastUpdate)
            const now = new Date()
            const diffMs = now - date
            const diffMins = Math.floor(diffMs / 60000)

            if (diffMins < 1) return 'Just now'
            if (diffMins < 60) return `${diffMins}m ago`
            if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
            return `${Math.floor(diffMins / 1440)}d ago`
        }

        return {
            formatLastUpdate,
        }
    }
}

export const GpusInfo = {
    template: `
      <div v-if="device.gpus && device.gpus.length > 0">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">GPU Information</h3>
        <div>
          <div v-for="gpu in device.gpus" :key="gpu.index" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-medium text-gray-900 dark:text-white">{{ gpu.name }}</h4>
              <span class="text-sm text-gray-500 dark:text-gray-400">GPU {{ gpu.index }}</span>
            </div>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-300">Memory Usage</span>
                  <span class="text-gray-900 dark:text-gray-100 font-medium">
                        {{ formatMemory(gpu.used) }} / {{ formatMemory(gpu.total) }}
                    </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div class="h-3 rounded-full transition-all duration-300"
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
        </div>
      </div>
    `,
    props: {
        device: Object,
    },
    setup(props) {

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
            if (percentage >= 90) return 'bg-red-500 dark:bg-red-600'
            if (percentage >= 70) return 'bg-yellow-500 dark:bg-yellow-600'
            return 'bg-green-500 dark:bg-green-600'
        }

        return {
            formatMemory,
            getMemoryPercentage,
            getMemoryBarClass,
        }

    }
}

export const DeviceStats = {
    template: `
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Workflows Executed</h3>

        <div v-if="loading" class="flex justify-center py-4">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
        </div>

        <div v-else-if="stats.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
          <p class="mt-2 text-sm">No workflows have been executed on this device yet.</p>
        </div>

        <div v-else class="space-y-2">
          <div v-for="stat in sortedStats" :key="stat.name"
               class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-sm transition-shadow duration-200">
            <div class="flex items-center space-x-1">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="#fff" d="M5 5h2v3h10V5h2v6h2V5c0-1.1-.9-2-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v-2H5zm7-2c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1"/><path fill="#fff" d="m18.01 13l-1.42 1.41l1.58 1.58H12v2h6.17l-1.58 1.59l1.42 1.41l3.99-4z"/>
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate" :title="stat.name">
                  {{ stat.name }}
                </p>
              </div>
            </div>
            <div class="flex-shrink-0 flex space-x-1">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                    :title="'Executions: ' + stat.count">
                {{ humanifyNumber(stat.count) }}
              </span>
              <div v-if="stat.credits" class="lg:px-1 p-0.5 shadow-sm rounded border bg-gray-200 dark:bg-gray-700"
                   :title="'Credits: ' + stat.credits">
                <span class="flex gap-1 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g fill="none"><path fill="currentColor" d="M11.5 13.8h-1.063c-1.53 0-2.294 0-2.583-.497s.088-1.162.844-2.491l2.367-4.167c.375-.66.563-.99.749-.94c.186.049.186.428.186 1.187V9.7c0 .236 0 .354.073.427s.191.073.427.073h1.063c1.53 0 2.294 0 2.583.497s-.088 1.162-.844 2.491l-2.367 4.167c-.375.66-.563.99-.749.94C12 18.247 12 17.868 12 17.109V14.3c0-.236 0-.354-.073-.427s-.191-.073-.427-.073"></path><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"></circle></g>
                    </svg>
                    <span>{{humanifyNumber(stat.credits)}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="stats.length > 0" class="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{{ humanifyNumber(stats.length) }} Workflows</span>
            <span>{{ humanifyNumber(totalGenerations) }} Generations</span>
            <span>{{ humanifyNumber(totalCredits) }} Credits</span>
          </div>
        </div>
      </div>
    `,
    props: {
        device: Object,
    },
    setup(props) {

        const client = useClient()
        const stats = ref([])
        const loading = ref(false)

        const sortedStats = computed(() => {
            return [...stats.value].sort((a, b) => b.total - a.total)
        })

        const totalGenerations = computed(() => {
            return stats.value.reduce((sum, stat) => sum + stat.count, 0)
        })

        const totalCredits = computed(() => {
            return stats.value.reduce((sum, stat) => sum + stat.credits, 0)
        })

        watch(() => props.device.id, async () => {
            await update()
        })

        async function update(){
            if (!props.device.id) return

            loading.value = true
            try {
                const api = await client.api(new GetDeviceStats({
                    id: props.device.id
                }))
                if (api.succeeded) {
                    stats.value = api.response.results || []
                }
            } finally {
                loading.value = false
            }
        }

        onMounted(async () => {
            await update()
        })

        return {
            stats,
            loading,
            sortedStats,
            totalCredits,
            totalGenerations,
            humanifyNumber,
        }
    }
}

export default {
    components: {
        SystemInfo,
        GpusInfo,
        DeviceStats,
    },
    template: `
      <div class="">
        <div class="p-6 space-y-6">
          
          <div class="flex gap-x-6">
            <div class="w-1/2">
              <SystemInfo :device="device" />
              <GpusInfo :device="device" />
            </div>
            <div class="w-1/2">
              <DeviceStats :device="device" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Available Models</h3>
              <div class="flex items-center space-x-2">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search models..."
                    class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div v-for="category in filteredModelCategories" :key="category.name"
                   class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ category.name }}</h4>
                  <span :class="category.badgeClass"
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium">
                        {{ category.models.length }}
                    </span>
                </div>
                <div v-if="category.models.length > 0" class="max-h-32 overflow-y-auto">
                  <div class="space-y-1">
                    <div v-for="model in category.models"
                         :key="model"
                         class="text-xs text-gray-600 dark:text-gray-300 font-mono bg-white dark:bg-gray-600 px-2 py-1 rounded">
                      {{ model }}
                    </div>
                  </div>
                </div>
                <div v-else class="text-sm text-gray-500 dark:text-gray-400 italic">
                  No models available
                </div>
              </div>
            </div>
          </div>

          <div v-if="device.nodes && device.nodes.length > 0">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Available Custom Nodes</h3>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ device.nodes.length }} nodes</span>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div class="max-h-40 overflow-y-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div v-for="node in device.nodes" :key="node"
                       class="text-xs text-gray-600 dark:text-gray-300 font-mono bg-white dark:bg-gray-600 px-2 py-1 rounded">
                    {{ node }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
        device: Object,
    },
    setup(props) {
        const store = inject('store')
        const searchQuery = ref('')

        const modelCategories = computed(() => {
            const categories = [
                {
                    key: 'checkpoints',
                    name: 'Checkpoints',
                    models: props.device.checkpoints || [],
                    badgeClass: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                },
                {
                    key: 'loras',
                    name: 'LoRAs',
                    models: props.device.loras || [],
                    badgeClass: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                },
                {
                    key: 'vaes',
                    name: 'VAEs',
                    models: props.device.vaes || [],
                    badgeClass: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                },
                {
                    key: 'controlNets',
                    name: 'ControlNets',
                    models: props.device.controlNets || [],
                    badgeClass: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                },
                {
                    key: 'upscalers',
                    name: 'Upscalers',
                    models: props.device.upscalers || [],
                    badgeClass: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                },
                {
                    key: 'embeddings',
                    name: 'Embeddings',
                    models: props.device.embeddings || [],
                    badgeClass: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                },
                {
                    key: 'clips',
                    name: 'CLIP Models',
                    models: props.device.clips || [],
                    badgeClass: 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200'
                },
                {
                    key: 'clipVisions',
                    name: 'CLIP Vision',
                    models: props.device.clipVisions || [],
                    badgeClass: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200'
                },
                {
                    key: 'unets',
                    name: 'UNet Models',
                    models: props.device.unets || [],
                    badgeClass: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                },
                {
                    key: 'stylers',
                    name: 'Style Models',
                    models: props.device.stylers || [],
                    badgeClass: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200'
                },
                {
                    key: 'gligens',
                    name: 'GLIGEN Models',
                    models: props.device.gligens || [],
                    badgeClass: 'bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200'
                },
                {
                    key: 'photoMakers',
                    name: 'PhotoMaker',
                    models: props.device.photoMakers || [],
                    badgeClass: 'bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200'
                },
                {
                    key: 'languageModels',
                    name: 'Language Models',
                    models: props.device.languageModels || [],
                    badgeClass: 'bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-800 dark:text-fuchsia-200'
                },
            ]
            return categories.filter(cat => cat.models.length > 0)
        })

        const filteredModelCategories = computed(() => {
            if (!searchQuery.value) return modelCategories.value

            return modelCategories.value.map(category => ({
                ...category,
                models: category.models.filter(model =>
                    model.toLowerCase().includes(searchQuery.value.toLowerCase())
                )
            })).filter(category => category.models.length > 0)
        })

        return {
            store,
            searchQuery,
            modelCategories,
            filteredModelCategories,
        }
    }
}