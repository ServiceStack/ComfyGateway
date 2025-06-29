import GettingStarted from "./components/GettingStarted.mjs"

export default {
    components: {
        GettingStarted,
    },
    template:`
<div class="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
    <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Welcome to</span>
            <span class="block text-indigo-600 dark:text-indigo-500 xl:inline"> Blazor Vue</span>
        </h1>
        <p class="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Welcome to your new Blazor Vue App, checkout links below to get started:
        </p>
        <div class="mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
                <a href="/admin" class="flex w-full items-center justify-center rounded-md border border-transparent bg-white dark:bg-gray-800 dark:border-gray-600 px-8 py-3 text-base font-medium text-indigo-600 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:px-10 md:text-lg">
                    Admin UI
                </a>
            </div>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="https://blazor-gallery.servicestack.net/" class="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 md:py-4 md:px-10 md:text-lg">
                    Blazor Gallery
                </a>
            </div>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="https://docs.servicestack.net/vue/" class="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 md:py-4 md:px-10 md:text-lg">
                    Vue Gallery
                </a>
            </div>
            
        </div>
    </div>
</div>

<section class="py-8 flex">
    <div class="mt-8 mx-auto">
        <h2 class="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl text-center">
            Getting Started
        </h2>
        <div>
            <GettingStarted :template="template" />
        </div>
    </div>
</section>

<div class="flex justify-center my-20 py-20 bg-slate-100 dark:bg-slate-800">
    <div class="text-center">
        <svg class="text-indigo-600 w-36 h-36 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18 16l-4-3.2V16H6V8h8v3.2L18 8m2-4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" /></svg>
        <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
            Videos
        </h1>
    </div>
</div>
    `,
    props: { template:String }
}
