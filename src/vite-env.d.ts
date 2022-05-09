/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
    export { SvelteComponentDev as default } from 'svelte/internal';
}

declare module "@/locales/*.yaml" {
    import type { LocaleDictionary } from '@/typings';

    const locale: LocaleDictionary;
    export default locale;
}