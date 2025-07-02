import {inject, computed, ref, onMounted, onUnmounted} from "vue"
import {
    FindAssets,
    FindCustomNodes,
    GetDeviceStatus,
    InstallCustomNode,
    InstallModel,
    RebootAgent
} from "../../mjs/dtos.mjs"
import { pluralize, validUrl, delay } from "../lib/utils.mjs"
import {PrimaryButton, SecondaryButton, useClient} from "@servicestack/vue"
import {lastLeftPart, leftPart, ResponseStatus, rightPart, toKebabCase} from "@servicestack/client";

const LoadingIcon = {
    template:`
        <svg class="animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    `
}

export default {
    components: {
        PrimaryButton,
        SecondaryButton,
        LoadingIcon,
    },
    template: `
      <div class="fixed cursor-zoom-out inset-0 z-10 overflow-y-auto" @click.stop="$emit('done')">
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
        <div class="absolute z-10 inset-x-0 flex justify-center px-4" :style="dialogPositionStyle">
          <div
              class="relative cursor-default transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all w-full max-w-6xl max-h-[90vh] flex flex-col"
              @click.stop>
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Device Installer</h3>
                <button @click="$emit('done')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
                <div class="space-y-4">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Install resources to run <b>{{ version.name }}</b> on <b>{{ store.deviceLabel(device) }}</b>
                  </p>
                  <div class="flex justify-between">
                      <div class="flex items-center gap-4 text-sm">
                        <div class="flex items-center gap-2">
                          <div class="w-3 h-3 rounded-full bg-red-500"></div>
                          <span class="text-gray-600 dark:text-gray-400">{{ missingNodes.length }} missing nodes</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span class="text-gray-600 dark:text-gray-400">{{ missingAssets.length }} missing assets</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <div class="w-3 h-3 rounded-full bg-green-500"></div>
                          <span class="text-gray-600 dark:text-gray-400">{{ installedNodes.length + installedAssets.length }}
                            already installed</span>
                        </div>
                      </div>
                    <div class="flex items-center">
                      <span class="mr-2 text-sm text-gray-600 dark:text-gray-400">after install</span> 
                      <PrimaryButton @click="reboot" :diabled="status.startsWith('Reboot')" 
                                     :color="status.startsWith('Reboot') ? 'red' : 'indigo'">
                        {{ status.startsWith('Reboot') ? 'Restarting Comfy...' : 'Restart Comfy' }}
                      </PrimaryButton>
                    </div>
                  </div>
              </div>
            </div>

            <ErrorSummary :status="error"/>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto px-6 py-4">
              <div class="space-y-8">

                <!-- Required Assets Section -->
                <div class="space-y-4">
                  <h4 class="text-md font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"/>
                    </svg>
                    Required Assets ({{ requiredAssets.length }})
                  </h4>

                  <div v-if="requiredAssets.length === 0" class="text-sm text-gray-500 dark:text-gray-400 italic">
                    No assets required
                  </div>

                  <div v-else class="space-y-2 max-h-64 overflow-y-auto">
                    <div v-for="asset in requiredAssets" :key="asset"
                         class="flex items-center justify-between p-3 rounded-lg border gap-x-2"
                         :class="installedAssets.includes(asset)
                           ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                           : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'">
                      <div class="flex items-center gap-3">
                        <div class="w-2 h-2 rounded-full"
                             :class="installedAssets.includes(asset) ? 'bg-green-500' : 'bg-orange-500'"></div>
                        <div class="flex flex-col">
                          <div>
                            <span class="text-xs text-gray-500 dark:text-gray-400">{{ getAssetCategory(asset) }}</span>
                            <span class="ml-1 text-sm font-mono text-gray-900 dark:text-gray-100"
                                  :title="getAssetName(asset)">{{ getAssetName(asset) }}</span>
                          </div>
                          <span v-if="matchingAssets[asset]"
                                class="text-xs text-gray-500 dark:text-gray-400">{{ formatUrl(matchingAssets[asset]) }}</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <span v-if="installedAssets.includes(asset) || installed[asset]"
                              class="text-xs text-green-600 dark:text-green-400 font-medium">Downloaded</span>
                        <span v-else-if="failed[asset]"
                              class="text-xs text-red-600 dark:text-red-400 font-medium">Failed</span>
                        <button v-else-if="matchingAssets[asset]" type="button"
                                @click="installAsset(asset)"
                                :disabled="installing[asset] || queued[asset]"
                                class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
                                :class="installing[asset]
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                  : queued[asset]
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-not-allowed'
                                    : 'bg-orange-600 hover:bg-orange-700 text-white'">
                          <span v-if="installing[asset]" class="flex items-center gap-1">
                            <LoadingIcon class="size-3" />
                            Downloading...
                          </span>
                          <span v-else-if="queued[asset]" class="flex items-center gap-1">
                            <LoadingIcon class="size-3" />
                            Queued
                          </span>
                          <span v-else>Download</span>
                        </button>
                        <button v-else-if="showAssetInstall !== asset" type="button"
                                @click="manualInstallAsset(asset)"
                                :disabled="installing[asset]"
                                class="px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap"
                                :class="installing[asset]
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-orange-600 hover:bg-orange-700 text-white'">
                          Manual Download
                        </button>
                      </div>
                      <div v-if="!installedAssets.includes(asset) && showAssetInstall === asset"
                           class="flex flex-grow gap-x-2 items-center justify-end">
                        <div v-if="!installing[asset] && !queued[asset]" class="w-full max-w-sm">
                          <TextInput id="assetUrl" type="text" v-model="assetUrl" label=""
                                     placeholder="Enter URL to download model" @focus="$event.target.select()"/>
                        </div>
                        <div>
                          <button type="button"
                                  @click="installAssetUrl(asset, assetUrl)"
                                  :disabled="installing[asset] || queued[asset] || !validUrl(assetUrl)"
                                  class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
                                  :class="installing[asset]
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                  : queued[asset]
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-not-allowed'
                                    : 'bg-orange-600 hover:bg-orange-700 text-white'">
                            <span v-if="installing[asset]" class="flex items-center gap-1">
                                <LoadingIcon class="size-3" />
                                Downloading...
                            </span>
                            <span v-else-if="queued[asset]" class="flex items-center gap-1">
                                <LoadingIcon class="size-3" />
                                Queued
                            </span>
                            <span v-else>Download</span>
                          </button>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>

                <!-- Required Nodes Section -->
                <div class="space-y-4">
                  <h4 class="text-md font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                          d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                    </svg>
                    Required Nodes ({{ requiredNodes.length }})
                  </h4>

                  <div v-if="requiredNodes.length === 0" class="text-sm text-gray-500 dark:text-gray-400 italic">
                    No custom nodes required
                  </div>

                  <div v-else class="space-y-2 max-h-64 overflow-y-auto">
                    <div v-for="node in requiredNodes" :key="node"
                         class="flex items-center justify-between p-3 rounded-lg border gap-x-2"
                         :class="installedNodes.includes(node)
                           ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                           : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'">
                      <div class="flex items-center gap-3">
                        <div class="w-2 h-2 rounded-full"
                             :class="installedNodes.includes(node) ? 'bg-green-500' : 'bg-red-500'"></div>
                        <div class="flex flex-col">
                          <span class="text-sm font-mono text-gray-900 dark:text-gray-100">{{ node }}</span>
                          <span v-if="matchingNodes[node]"
                                class="text-xs text-gray-500 dark:text-gray-400">{{ matchingNodes[node] }}</span>
                        </div>
                      </div>

                      <div class="flex items-center gap-2">
                        <span v-if="installedNodes.includes(node) || installed[node]"
                              class="text-xs text-green-600 dark:text-green-400 font-medium">Installed</span>
                        <span v-else-if="failed[node]"
                              class="text-xs text-red-600 dark:text-red-400 font-medium">Failed</span>
                        <button v-else-if="matchingNodes[node]" type="button"
                                @click="installNode(node)"
                                :disabled="installing[node] || queued[node]"
                                class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
                                :class="installing[node]
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                  : queued[node]
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700 text-white'">
                          <span v-if="installing[node]" class="flex items-center gap-1">
                            <LoadingIcon class="size-3" />
                            Installing...
                          </span>
                          <span v-else-if="queued[node]" class="flex items-center gap-1">
                            <LoadingIcon class="size-3" />
                            Queued
                          </span>
                          <span v-else>Install</span>
                        </button>
                        <button v-else-if="showNodeInstall !== node" type="button"
                                @click="manualInstallNode(node)"
                                :disabled="installing[node]"
                                class="px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap"
                                :class="installing[node]
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-red-600 hover:bg-red-700 text-white'">
                          Manual Install
                        </button>
                      </div>
                      <div v-if="!installedNodes.includes(node) && showNodeInstall === node"
                           class="flex flex-grow gap-x-2 items-center justify-end">
                        <div v-if="!installing[node] && !queued[node]" class="w-full max-w-sm">
                          <TextInput id="nodeUrl" type="text" v-model="nodeUrl" label=""
                                     placeholder="Enter URL to install custom node" @focus="$event.target.select()"/>
                        </div>
                        <div>
                          <button type="button"
                                  @click="installNodeUrl(node, nodeUrl)"
                                  :disabled="installing[node] || queued[node] || !validUrl(nodeUrl)"
                                  class="px-3 py-1 text-xs font-medium rounded-md transition-colors"
                                  :class="installing[node]
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                  : queued[node]
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700 text-white'">
                            <span v-if="installing[node]" class="flex items-center gap-1">
                                <LoadingIcon class="size-3" />
                                Installing...
                            </span>
                            <span v-else-if="queued[node]" class="flex items-center gap-1">
                                <LoadingIcon class="size-3" />
                                Queued
                            </span>
                            <span v-else>Install</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  <span v-if="totalMissing === 0" class="text-green-600 dark:text-green-400 font-medium">
                    ✓ All requirements satisfied
                  </span>
                  <span v-else>
                    {{ status }}
                  </span>
                </div>
                <div class="flex gap-3">
                  <div>
                    <button @click="$emit('done')"
                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
                      Close
                    </button>
                  </div>
                  <div>
                    <button v-if="totalMissing > 0"
                            @click="installAll"
                            :disabled="isInstalling"
                            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden text-ellipsis">
                        <span v-if="isInstalling" class="flex items-center gap-2">
                          <LoadingIcon class="size-4" />
                          Installing All...
                        </span>
                      <span v-else>Install All Missing</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
        /** @type {DeviceInfo} */
        device: Object,
        /** @type {WorkflowVersion} */
        version: Object,
    },
    emits: ['done'],
    setup(props, {emit}) {
        const store = inject('store')
        const client = useClient()
        const installing = ref({})
        const installed = ref({})
        const queued = ref({})
        const failed = ref({})
        const scrollTop = ref(0)
        const status = ref('')
        const error = ref()
        const assetUrl = ref('')
        const nodeUrl = ref('')
        const showAssetInstall = ref()
        const showNodeInstall = ref()

        const matchingAssets = ref({})
        const matchingNodes = ref({})

        // Handle Esc key to close dialog
        function handleKeydown(event) {
            if (event.key === 'Escape') {
                emit('done')
            }
        }

        // Computed style for dialog positioning
        const dialogPositionStyle = computed(() => ({
            top: `${scrollTop.value + 32}px`, // Position 32px from top of current viewport
            paddingBottom: '2rem'
        }))

        const requiredNodes = computed(() => props.version?.nodes || [])
        const requiredAssets = computed(() => props.version?.assets || [])

        const installedNodes = computed(() => {
            const deviceNodes = props.device?.nodes || []
            return requiredNodes.value.filter(node => deviceNodes.includes(node))
        })

        const missingNodes = computed(() => {
            const deviceNodes = props.device?.nodes || []
            return requiredNodes.value.filter(node => 
                !deviceNodes.includes(node) && !installed.value[node])
        })

        const installedAssets = computed(() => {
            const device = props.device
            if (!device) return []

            const deviceAssets = store.combineAssets(device)
            return requiredAssets.value.filter(asset =>
                deviceAssets.some(deviceAsset =>
                    deviceAsset.includes(asset) || asset.includes(deviceAsset.split('/').pop())
                )
            )
        })

        const missingAssets = computed(() => {
            return requiredAssets.value.filter(asset => 
                !installedAssets.value.includes(asset) && !installed.value[asset])
        })

        const totalMissing = computed(() => missingNodes.value.length + missingAssets.value.length)
        const isInstalling = computed(() => Object.values(installing.value).some(Boolean))

        function getAssetName(asset) {
            return asset.split('/').pop() || asset
        }

        function getAssetCategory(asset) {
            const category = asset.split('/')[0]
            const ret = category.charAt(0) + category.slice(1).replace('_', ' ')
            return ret.endsWith('s') ? ret.slice(0, -1) : ret
        }

        function formatUrl(url) {
            return leftPart(rightPart(url, '@'), '?')
        }
        async function installNode(node) {
            // Try to find matching asset to install
            const url = matchingNodes.value[node]
            if (url) {
                return await installNodeUrl(node, url)
            } else {
                error.value = new ResponseStatus({
                    errorCode: 'NotFound',
                    message: `Unknown node ${node}. Please install manually.`
                })
            }
        }

        async function installNodeUrl(node, url) {
            if (!url) return

            try {
                console.log('Installing node:', node, url)
                installing.value[node] = true
                const api = await store._client.api(new InstallCustomNode({
                    deviceId: props.device.deviceId,
                    url
                }))
                error.value = api.error
                if (!api.error) {
                    console.log('Node installation queued:', api.response?.result)
                    queued.value[node] = true
                    setTimeout(updateStatus, 1)
                }
            } catch (error) {
                console.error(`Failed to install node: ${node}`, error)
                e.value = new ResponseStatus({
                    errorCode: 'Exception',
                    message: `Failed to install node: ${e.message || e}`
                })
            } finally {
                installing.value[node] = false
            }
        }

        async function manualInstallAsset(asset) {
            showAssetInstall.value = asset
        }

        async function manualInstallNode(node) {
            showNodeInstall.value = node
        }

        async function installAsset(asset) {
            // Try to find matching asset to install
            const url = matchingAssets.value[asset]
            if (url) {
                return await installAssetUrl(asset, url)
            } else {
                error.value = new ResponseStatus({
                    errorCode: 'NotFound',
                    message: `Unknown asset ${asset}. Please install manually.`
                })
            }
        }

        async function installAssetUrl(asset, url) {
            if (!url) return
            try {
                installing.value[asset] = true
                console.log('Installing asset:', asset, url)
                const api = await client.api(new InstallModel({
                    deviceId: props.device.deviceId,
                    saveTo: asset,
                    url,
                }))
                error.value = api.error
                if (!api.error) {
                    console.log('Asset installation queued:', api.response?.result)
                    queued.value[asset] = true
                    setTimeout(updateStatus, 1)
                }
            } catch (e) {
                console.error(`Failed to install asset ${asset}: `, e)
                e.value = new ResponseStatus({
                    errorCode: 'Exception',
                    message: `'Failed to install asset: ${e.message || e}`
                })
            } finally {
                installing.value[asset] = false
            }
        }

        async function installAll() {
            const delayMs = 1000
            for (const asset of missingAssets.value) {
                await installAsset(asset)
                await delay(delayMs)
            }
            for (const node of missingNodes.value) {
                await installNode(node)
                await delay(delayMs)
            }
        }

        function getStatus() {
            return `${totalMissing.value} ${pluralize('item', totalMissing)} need to be installed`
        }

        let running = null
        
        function setDownloadStatus(asset, args) {
            // console.log('setDownloadStatus', asset, args)
            function setStatus(statusMap, asset, status) {
                if (!status) {
                    // Only unset status if it's previously set
                    if (status in statusMap) {
                        statusMap[asset] = false
                    }
                } else {
                    statusMap[asset] = true
                }
            }
            setStatus(queued.value, asset, 'queued' in args)
            setStatus(installing.value, asset, 'installing' in args)
            setStatus(installed.value, asset, 'installed' in args)
            setStatus(failed.value, asset, 'failed' in args)
        }

        async function updateStatus() {
            // console.log('updateStatus', running, Object.keys(queued.value).length)
            if (running) return
            running = true
            try {
                error.value = null
                const request = new GetDeviceStatus({
                    deviceId: props.device.deviceId,
                })
                
                const minWaitMs = 5000 //5s
                do {
                    let started = Date.now()
                    const api = await client.api(request)
                    if (api.error) {
                        error.value = api.error
                        return
                    }

                    Object.assign(props.device, api.response)
                    request.poll = true

                    if (api.response.status) {
                        request.statusChanged = api.response.status
                        status.value = !api.response.status || api.response.status.startsWith('Registered')
                            ? getStatus()
                            : api.response.status
                    }
                    
                    const assetKeys = new Set()
                    Object.keys(queued.value).forEach(x => assetKeys.add(x))
                    Object.keys(installing.value).forEach(x => assetKeys.add(x))
                    Object.keys(installed.value).forEach(x => assetKeys.add(x))
                    Object.keys(failed.value).forEach(x => assetKeys.add(x))

                    const downloaded = api.response.downloaded?.toLowerCase()
                    const downloading = api.response.downloading?.toLowerCase()
                    const downloadFailed = api.response.downloadFailed?.toLowerCase()
                    console.log('updateStatus', { downloaded, downloading, downloadFailed })
                    
                    assetKeys.forEach(asset => {
                        const assetLower = asset.toLowerCase()
                        if (downloaded && assetLower.includes(downloaded)) {
                            setDownloadStatus(asset, { installed: true })
                        }
                        else if (downloadFailed && assetLower.includes(downloadFailed)) {
                            setDownloadStatus(asset, { failed: true })
                        }
                        else if (downloading && assetLower.includes(downloading)) {
                            setDownloadStatus(asset, { installing: true })
                        }
                    })
                    ;[...Object.entries(matchingNodes.value), ...Object.entries(matchingAssets.value)]
                        .forEach(([asset,url]) => {
                            const urlLower = url.toLowerCase()
                            if (downloaded && urlLower.includes(downloaded)) {
                                setDownloadStatus(asset, { installed: true })
                            } else if (downloadFailed && urlLower.includes(downloadFailed)) {
                                setDownloadStatus(asset, { failed: true })
                            } else if (downloading && urlLower.includes(downloading)) {
                                setDownloadStatus(asset, { installing: true })
                            }
                        })

                    const deviceAssets = store.combineAssets(api.response)
                    deviceAssets.forEach(asset => {
                        setDownloadStatus(asset, { installed: true })
                    })
                    
                    const timeRemaining = minWaitMs - (Date.now() - started)
                    if (timeRemaining > 0) {
                        await delay(timeRemaining)
                    }
                } while (Object.keys(queued.value).length || status.value.startsWith('Reboot'))
            } finally {
                running = false
            }
        }
        
        async function reboot() {
            const api = await client.api(new RebootAgent({
                deviceId: props.device.deviceId
            }))
            error.value = api.error
            if (api.response) {
                status.value = api.response?.result || 'Reboot queued...'
                running = false
                updateStatus()
            }
        }

        // Load asset and node databases on component mount
        onMounted(async () => {
            // Capture current scroll position when dialog opens
            scrollTop.value = window.scrollY || document.documentElement.scrollTop

            // Add keyboard event listener
            document.addEventListener('keydown', handleKeydown)

            const [
                apiAssets,
                apiNodes,
            ] = await Promise.all([
                client.api(new FindAssets({assets: props.version.assets})),
                client.api(new FindCustomNodes({types: props.version.nodes})),
            ])

            if (apiAssets.succeeded) {
                matchingAssets.value = apiAssets.response.results
            }
            if (apiNodes.succeeded) {
                matchingNodes.value = apiNodes.response.results
            }

            status.value = getStatus()
        })

        // Clean up event listener on component unmount
        onUnmounted(() => {
            queued.value = {}
            document.removeEventListener('keydown', handleKeydown)
        })

        return {
            store,
            status,
            error,
            installing,
            installed,
            queued,
            failed,
            requiredNodes,
            requiredAssets,
            installedNodes,
            missingNodes,
            installedAssets,
            missingAssets,
            totalMissing,
            isInstalling,
            dialogPositionStyle,
            matchingAssets,
            matchingNodes,
            assetUrl,
            nodeUrl,
            showAssetInstall,
            showNodeInstall,
            installNode,
            installNodeUrl,
            installAsset,
            installAssetUrl,
            getAssetName,
            getAssetCategory,
            manualInstallAsset,
            manualInstallNode,
            installAll,
            pluralize,
            formatUrl,
            validUrl,
            reboot,
        }
    }
}