import { createApp, reactive, ref, computed, nextTick, defineAsyncComponent } from "vue"
import { JsonServiceClient, EventBus, $1, $$ } from "@servicestack/client"
import ServiceStackVue, { useAuth } from "@servicestack/vue"
import Header from "../pages/components/Header.mjs"
import store from "../pages/lib/store.mjs"
import { createWebHistory, createRouter } from "vue-router"

const routes = [
    { path: '/', component: () => import('../pages/Home.mjs') },
    { path: '/generate/:tab?/:id?', component: () => import('../pages/Generate.mjs') },
    { path: '/images/:path?', component: () => import('../pages/Images.mjs') },
    { path: '/gallery/:path?', component: () => import('../pages/Images.mjs') },
    { path: '/generations/:id?', component: () => import('../pages/Generation.mjs') },
    { path: '/test/:path?', component: () => import('../pages/Test.mjs') },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

let client = null, Apps = [], events = new EventBus()
let AppData = {
    init:false
}
export { client, store, Apps, events }

// const Header = defineAsyncComponent(() =>
//     import('../pages/components/Header.mjs')
// )
export const App = {
    components: {
        Header,
    },
    template: `
<div>
    <Header :store="store" :user="user" />
    <div>
        <main role="main">
            <RouterView />
        </main>
    </div>
</div>
`,
    setup(props) {
        const { user } = useAuth()
        return {
            store,
            user,
        }
    }
}

/** Shared Global Components */
const Components = {
    App,
}
const CustomElements = [
    'lite-youtube'
]

const alreadyMounted = el => el.__vue_app__ 

const mockArgs = { attrs:{}, slots:{}, emit:() => {}, expose: () => {} }
function hasTemplate(el,component) {
    return !!(el.firstElementChild
        || component.template
        || (component.setup && typeof component.setup({}, mockArgs) == 'function'))
}

/** Mount Vue3 Component
 * @param sel {string|Element} - Element or Selector where component should be mounted
 * @param component 
 * @param [props] {any} */
export function mount(sel, component, props) {
    console.log('mount', sel, component, props)
    if (!AppData.init) {
        init(globalThis)
    }
    const el = $1(sel)
    if (alreadyMounted(el)) return

    if (!hasTemplate(el, component)) {
        // Fallback for enhanced navigation clearing HTML DOM template of Vue App, requiring a force reload
        // Avoid by disabling enhanced navigation to page, e.g. by adding data-enhance-nav="false" to element
        console.warn('Vue Compontent template is missing, force reloading...', el, component)
        blazorRefresh()
        return
    }

    const app = createApp(component, props)
    app.provide('client', client)
    app.provide('store', store)
    app.provide('server', globalThis.Server)
    app.provide('routes', routes)
    app.provide('events', events)
    Object.keys(Components).forEach(name => {
        app.component(name, Components[name])
    })
    app.use(router)
    app.use(ServiceStackVue)
    //app.component('RouterLink', ServiceStackVue.component('RouterLink'))
    app.directive('hash', (el, binding) => {
        /** @param {Event} e */
        el.onclick = (e) => {
            e.preventDefault()
            location.hash = binding.value
        }
    })
    if (component.install) {
        component.install(app)
    }
    if (client && !app._context.provides.client) {
        app.provide('client', client)
    }
    app.config.errorHandler = error => { console.log(error) }
    app.config.compilerOptions.isCustomElement = tag => CustomElements.includes(tag)
    app.mount(el)
    Apps.push(app)
    return app
}

async function mountApp(el, props) {
    let appPath = el.getAttribute('data-component')
    if (!appPath.startsWith('/') && !appPath.startsWith('.')) {
        appPath = `../${appPath}`
    }

    const module = await import(appPath)
    unmount(el)
    mount(el, module.default, props)
}

export async function configure() {
    client ??= new JsonServiceClient()
    await store.init(client)
    return { 
        client,
        store,
    }
}

export async function remount() {
    if (!AppData.init) {
        await configure()
        init({ force: true })
    } else {
        mountAll({ force: true })
    }
}

//Default Vue App that gets created with [data-component] is empty, e.g. Blog Posts without Vue components
const DefaultApp = {
    setup() {
        function nav(url) {
            window.open(url)
        }
        return { nav }
    }
}

function blazorRefresh() {
    if (globalThis.Blazor)
        globalThis.Blazor.navigateTo(location.pathname.substring(1), true)
    else
        globalThis.location.reload()
}

export function mountAll(opt) {
    $$('[data-component]').forEach(el => {

        if (opt && opt.force) {
            unmount(el)
        } else {
            if (alreadyMounted(el)) return
        }

        let componentName = el.getAttribute('data-component')
        let propsStr = el.getAttribute('data-props')
        let props = propsStr && new Function(`return (${propsStr})`)() || {}

        if (!componentName) {
            mount(el, DefaultApp, props)
            return
        }

        if (componentName.includes('.')) {
            mountApp(el, props)
            return
        }

        let component = Components[componentName] || ServiceStackVue.component(componentName)
        if (!component) {
            console.error(`Component ${componentName} does not exist`)
            return
        }

        mount(el, component, props)
    })
    $$('[data-module]').forEach(async el => {
        let modulePath = el.getAttribute('data-module')
        if (!modulePath) return
        if (!modulePath.startsWith('/') && !modulePath.startsWith('.')) {
            modulePath = `../${modulePath}`
        }
        try {
            const module = await import(modulePath)
            if (typeof module.default?.load == 'function') {
                module.default.load()
            }
        } catch(e) {
            console.error(`Couldn't load module ${el.getAttribute('data-module')}`, e)
        }
    })
    $$('[v-href]').forEach(el => {
        el.onclick = e => {
            e.preventDefault()
            let href = el.getAttribute('v-href')
            if (href.startsWith('/')) {
                router.push(href)
            } else {
                location.href = href
            }
        }
    })
}

/** @param {any} [exports] */
export function init(opt) {
    if (AppData.init) return
    AppData = reactive(AppData)
    AppData.init = true
    mountAll(opt)

    if (opt && opt.exports) {
        opt.exports.client = client
        opt.exports.Apps = Apps
    }
}

function unmount(el) {
    if (!el) return

    try {
        if (el.__vue_app__) {
            el.__vue_app__.unmount(el)
        }
    } catch (e) {
        console.log('force unmount', el.id)
        el._vnode = el.__vue_app__ = undefined
    }
}


/* used in :::sh and :::nuget CopyContainerRenderer */
globalThis.copyText = function (e) {
    e.classList.add('copying')
    let $el = document.createElement("textarea")
    let text = (e.querySelector('code') || e.querySelector('p')).innerHTML
    $el.innerHTML = text
    document.body.appendChild($el)
    $el.select()
    document.execCommand("copy")
    document.body.removeChild($el)
    setTimeout(() => e.classList.remove('copying'), 3000)
}

document.addEventListener('DOMContentLoaded', () =>
    Blazor.addEventListener('enhancedload', () => {
        remount()
        globalThis.hljs?.highlightAll()
        // if (router.currentRoute.value?.path !== location.pathname) {
        //     router.replace({ path: location.pathname })
        // }
    }))
