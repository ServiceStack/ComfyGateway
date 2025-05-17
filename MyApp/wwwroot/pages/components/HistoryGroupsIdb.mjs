import { ref, computed, inject, nextTick, defineExpose } from "vue"

export function groupThreads(threads) {
    // Ensure all threads have a valid date property
    threads.forEach(thread => {
        if (!thread.date || isNaN(thread.date)) {
            // Try to extract date from ID if it's a string like 'comfy-1234567890'
            if (typeof thread.id === 'string' && thread.id.includes('-')) {
                const parts = thread.id.split('-');
                const timestamp = parseInt(parts[parts.length - 1]);
                if (!isNaN(timestamp)) {
                    thread.date = timestamp;
                } else {
                    thread.date = Date.now(); // Fallback to current time
                }
            } else {
                thread.date = Date.now(); // Fallback to current time
            }
        }
    });

    // Sort by date (newest first)
    const sorted = threads.sort((a, b) => b.date - a.date);

    let Today = []
    let LastWeek = []
    let Months = {}
    let Years = {}

    const groups = []

    sorted.forEach(x => {
        const created = new Date(x.date) // Use date property instead of id
        const now = new Date()
        const diff = now - created
        const days = diff / (1000 * 60 * 60 * 24)
        const startOfYear = new Date(new Date().getFullYear(), 0, 1)

        if (days < 1) {
            Today.push(x)
        } else if (days < 7) {
            LastWeek.push(x)
        } else if (created > startOfYear) {
            const month = created.toLocaleString('default', { month: 'long' })
            if (!Months[month]) Months[month] = []
            Months[month].push(x)
        } else {
            const year = `${created.getFullYear()}`
            if (!Years[year]) Years[year] = []
            Years[year].push(x)
        }
    })

    if (Today.length) groups.push({ title: 'Today', results: Today })
    if (LastWeek.length) groups.push({ title: 'Previous 7 Days', results: LastWeek })

    Object.keys(Months).forEach(month => {
        groups.push({ title: month, results: Months[month] })
    })
    const yearsDesc = Object.keys(Years).sort((a,b) => b.localeCompare(a))
    yearsDesc.forEach(year => {
        groups.push({ title: year, results: Years[year] })
    })
    return groups
}

export const HistoryTitle = {
    template:`
        <div class="sm:w-72 md:w-92 flex items-center justify-between">
            <h3 class="p-2 sm:block text-xl md:text-2xl font-semibold">History</h3>
            <button type="button" @click="clear()" title="Clear History"
                class="mr-4 bg-white dark:bg-black rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black">
                <span class="sr-only">Clear</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-width="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10ZM5 5l14 14"/>
                </svg>
            </button>
        </div>
    `,
    props: {
        prefix: String,
    },
    emits: ['clear'],
    setup(props, { emit }) {
        function clear() {
            if (confirm('Are you sure you want to clear all your History?')) {
                emit('clear')
            }
        }

        return { clear }
    }
}

export const HistoryGroups = {
    template: `
        <div v-for="group in historyGroups" class="relative">
            <h4 class="w-full pl-2 text-gray-500 uppercase pt-2 text-sm leading-6 font-semibold">{{group.title}}</h4>
            <div v-for="item in group.results">
                <div v-href="{id:item.id}" :class="['pl-4 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-between',
                    item.id == routes.id ? 'bg-gray-50 text-indigo-600 font-semibold' : 'cursor-pointer text-gray-700']" @dblclick="renameThread(item)">
                    <div class="md:w-64 overflow-hidden whitespace-nowrap text-ellipsis"
                        @contextmenu.prevent.stop="showThreadMenu=showThreadMenu==item.id ? null : item.id">
                        <div v-if="renameThreadId == item.id" class="flex items-center">
                            <input id="txtItemTitle" type="text" v-model="item.title" class="border rounded px-1 py-0.5 text-sm w-full"
                                @keyup.enter="renameItem(item)" @blur="renameItem(item)" />
                        </div>
                        <div v-else class="flex items-center">
                            <slot :item="item"></slot>
                        </div>
                    </div>
                    <div @click.stop="showThreadMenu=showThreadMenu==item.id ? null : item.id" class="cursor-pointer">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"/></svg>
                    </div>
                    <div v-if="item.id == showThreadMenu" class="absolute font-normal right-0 mt-6 mr-4 z-10 w-24 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                        <div @click.stop="renameThread(item)" class="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Rename</div>
                        <div @click.stop="deleteThread(item)" class="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Delete</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    emits:['save','remove'],
    props: {
        history: Array,
        storage: Object,
    },
    setup(props, { emit }) {
        const routes = inject('routes')
        const showThreadMenu = ref()
        const renameThreadId = ref()
        const historyGroups = computed(() => groupThreads(props.history))

        function renameThread(item) {
            renameThreadId.value = item.id
            showThreadMenu.value = null
            nextTick(() => {
                const txt = document.getElementById('txtItemTitle')
                txt?.select()
                txt?.focus()
            })
        }

        function renameItem(item) {
            renameThreadId.value = null
            emit('save', item)
        }

        function deleteThread(item) {
            if (confirm('Are you sure you want to delete this thread?')) {
                emit('remove', item)
            }
            showThreadMenu.value = null
        }

        return {
            routes,
            showThreadMenu,
            renameThreadId,
            historyGroups,
            renameThread,
            deleteThread,
            renameItem,
        }
    }
}
