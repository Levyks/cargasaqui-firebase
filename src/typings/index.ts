export type LocaleDictionary = {
    [key: string]: string | LocaleDictionary;
}

export type SvelteModuleType = typeof import('*.svelte');