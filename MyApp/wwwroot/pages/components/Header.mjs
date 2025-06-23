import { ref, onMounted, inject } from "vue"
import { useConfig } from "@servicestack/vue"
import VisibilityIcon from "./VisibilityIcon.mjs"

const AntiforgeryToken = {
    template:`
        <input type="hidden" name="__RequestVerificationToken" :value="store.csrfToken" />
    `,
    setup() {
        const store = inject('store')
        return {
            store,
        }
    }
}

export default {
    components: {
        AntiforgeryToken,
        VisibilityIcon,
    },
    template:`
<header class="pr-3 bg-slate-50 dark:bg-slate-900">
    <div class="flex flex-wrap items-center">
        <div class="absolute z-10 top-2 left-2 sm:static flex-shrink flex-grow-0">
            <div class="cursor-pointer">
                <RouterLink :to="{ path:'/' }" class="navbar-brand flex items-center">
                    <img class="inline-block dark:hidden w-6 h-6 sm:ml-2 sm:w-8 sm:h-8" :src="store.appConfig.appIcon.replace('currentColor','%23000')" alt="Logo">
                    <img class="hidden dark:inline-block w-6 h-6 sm:ml-2 sm:w-8 sm:h-8" :src="store.appConfig.appIcon.replace('currentColor','%23fff')" alt="Logo">
                    <span class="hidden ml-2 sm:block text-2xl font-semibold">{{store.appConfig.appName}}</span>
                </RouterLink>
            </div>
        </div>
        <div class="flex flex-grow flex-shrink flex-nowrap justify-end items-center">
            <nav class="relative flex flex-grow leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <ul class="flex flex-wrap items-center justify-end w-full m-0">
                    <li class="relative flex flex-wrap just-fu-start m-0">
                        <RouterLink :to="{ path:'/images' }" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" :class="$route.path.startsWith('/images') ? 'text-blue-700 dark:text-blue-300' : ''">
                            Images
                        </RouterLink>
                    </li>
                    <li class="relative flex flex-wrap just-fu-start m-0">
                        <RouterLink :to="{ path:'/generate' }" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" :class="$route.path.startsWith('/generate') ? 'text-blue-700 dark:text-blue-300' : ''">
                            Generate
                        </RouterLink>
                    </li>
                    <li class="relative flex flex-wrap just-fu-start m-0">
                        <a href="/blog" class="p-4 flex items-center justify-start mw-full hover:text-sky-500 dark:hover:text-sky-400" :class="$route.path.startsWith('/blog') ? 'text-blue-700 dark:text-blue-300' : ''">
                            Blog
                        </a>
                    </li>
                    <template v-if="user">
                        <li>
                            <div class="mx-3 relative">
                                <div>
                                    <a href="/Account/Manage"
                                        class="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50 dark:lg:hover:bg-gray-800 dark:ring-offset-black" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <img class="h-8 w-8 rounded-full" :src="user.profileUrl" alt="">
                                        <span class="hidden ml-3 text-gray-700 dark:text-gray-300 text-sm font-medium lg:block">
                                            <span class="sr-only">Open user menu for </span>
                                            {{user.displayName || user.userName}}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </template>
                    <template v-else>
                        <li class="relative flex flex-wrap just-fu-start m-0">
                            <a href="/Account/Login" class="m-2 mr-4">
                                <SecondaryButton>
                                    Sign In
                                </SecondaryButton>
                            </a>
                        </li>
                    </template>
                    <li class="relative flex flex-wrap just-fu-start mx-4 w-8">
                        <div title="Ratings Visibility">
                            <VisibilityIcon />
                        </div>
                    </li>
                    <li class="relative flex flex-wrap just-fu-start m-0">
                        <DarkModeToggle />
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>
    `,
    // Header.mjs can't access providers with inject
    props: {
        store: Object,
        user: Object,
    },
    setup(props) {
        
        const config = useConfig()
        config.inputValue = (type,value) => typeof value == 'number'
            ? value 
            : value
        
        const refForm = ref()
        async function preSignOut() {
            console.log('preSignOut')
            await props.store.clearUserDb()
        }
        
        onMounted(() => {
            console.log('Header.onMounted')
        })
        
        return {
            refForm,
            preSignOut,
        }
    }
}