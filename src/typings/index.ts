import type { QueryDocumentSnapshot, Unsubscribe } from 'firebase/firestore';

export type LocaleDictionary = {
    [key: string]: string | LocaleDictionary;
}

export type SvelteModuleType = typeof import('*.svelte');

export interface FirebaseModel {
    id?: string;
    snap?: QueryDocumentSnapshot<this>;
}

export interface Page<T> {
    number: number,
    items?: T[],
    snaps?: QueryDocumentSnapshot<T>[],
    unsub: Unsubscribe
}