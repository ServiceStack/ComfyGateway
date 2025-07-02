import {ref, computed, inject, onMounted, onUnmounted} from "vue"

export default {
    template: `
      <div class="fixed cursor-zoom-out inset-0 z-10 overflow-y-auto" @click.stop="$emit('done')">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
        <div class="z-10 flex min-h-full items-start justify-center p-4 pt-8 sm:pt-12">
          <div class="relative cursor-default transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all w-full max-w-6xl max-h-[90vh] flex flex-col"
            @click.stop>
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <svg class="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ device.shortId }}</h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Device Details</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                        <span :class="getStatusBadgeClass(device)"
                              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                            <svg class="-ml-0.5 mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="3"/>
                            </svg>
                          {{ getDeviceStatus(device) }}
                        </span>
                  <button @click="$emit('done')" type="button"
                          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto">
              <div class="p-6 space-y-6">
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">System Information</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Device ID</dt>
                      <dd class="mt-1 text-sm text-gray-900 dark:text-white font-mono">{{ device.deviceId || device.shortId || 'N/A' }}
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

                <div v-if="device.gpus && device.gpus.length > 0">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">GPU Information</h3>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>
    `,
    emits: ['done'],
    props: {
        device: Object,
    },
    setup(props, {emit}) {
        const store = inject('store')
        const searchQuery = ref('')

        // Handle Esc key to close dialog
        function handleKeydown(event) {
            if (event.key === 'Escape') {
                emit('done')
            }
        }

        onMounted(() => {
            document.addEventListener('keydown', handleKeydown)
        })

        onUnmounted(() => {
            document.removeEventListener('keydown', handleKeydown)
        })

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


        // Import utility functions from DeviceInfo
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
            if (percentage >= 90) return 'bg-red-500 dark:bg-red-600'
            if (percentage >= 70) return 'bg-yellow-500 dark:bg-yellow-600'
            return 'bg-green-500 dark:bg-green-600'
        }

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
            store,
            searchQuery,
            modelCategories,
            filteredModelCategories,
            getDeviceStatus,
            getStatusBadgeClass,
            formatMemory,
            getMemoryPercentage,
            getMemoryBarClass,
            formatLastUpdate,
        }
    }
}
