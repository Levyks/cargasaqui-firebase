import { getFirestore, collection, QueryDocumentSnapshot, QuerySnapshot, onSnapshot, doc, Unsubscribe } from "firebase/firestore";
import type { CollectionReference } from "firebase/firestore";
import type { Writable } from "svelte/store";

import type { Company, Cargo } from "@/models";
import type { FirebaseModel } from "@/typings";

const firestore = getFirestore();

const converter = <T extends FirebaseModel>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
        ({
            ...(snap.data()),
            id: snap.id
        }) as T
});

const dataPoint = <T extends FirebaseModel>(collectionPath: string) =>
    collection(firestore, collectionPath).withConverter(converter<T>());

export const db = {
    companies: dataPoint<Company>("companies"),
    companyCargoes: (company: Company) => dataPoint<Cargo>(`companies/${company.id}/cargoes`),
}

/* ------------------------ */

export function subDocumentToStore<T extends FirebaseModel>(
    collectionRef: CollectionReference<T>,
    id: string,
    store: Writable<T>,
    notFoundCallback: () => void
): Unsubscribe {
    return onSnapshot(doc(collectionRef, id), snap => {
        if(snap.exists()) {
            store.update(v => ({
                ...v,
                ...snap.data()
            }))
        } else {
            notFoundCallback();
        }
    });
}

export function getKeyedObjFromSnapshot<T extends FirebaseModel>(
    snap: QuerySnapshot<T>, 
    obj: { [id: string]: T }
): { [id: string]: T } {

    return snap.docs.reduce((acc, doc) => {
        if(obj?.[doc.id]) {
            acc[doc.id] = {
                ...obj[doc.id],
                ...doc.data()
            }
        } else {
            acc[doc.id] = doc.data();
        }
        return acc;
    }, {});

}

