export type LocaleDictionary = {
    [key: string]: string | LocaleDictionary;
}

export type SvelteModuleType = typeof import('*.svelte');

export interface FirebaseModel {
    id?: string;
}