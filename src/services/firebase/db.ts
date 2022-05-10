import { getFirestore, collection, QueryDocumentSnapshot, QuerySnapshot, onSnapshot, doc, Unsubscribe } from "firebase/firestore";
import { app } from ".";

import type { CollectionReference } from "firebase/firestore";
import type { Writable } from "svelte/store";

import type { Company, Cargo, CargoPrivate, Status } from "@/models";
import type { FirebaseModel } from "@/typings";

const firestore = getFirestore(app);

export const db = {
    companies: dataPoint<Company>("companies"),
    companyCargoes: (company: Company) => dataPoint<Cargo>(`companies/${company.id}/cargoes`),
    cargoPrivate: (cargo: Cargo) => dataPoint<CargoPrivate>(`${cargo.snap.ref.path}/private`),
    companyStatuses: (company: Company) => dataPoint<Status>(`companies/${company.id}/statuses`),
    companyIdStatuses: (companyId: string) => dataPoint<Status>(`companies/${companyId}/statuses`),
}

function converter<T extends FirebaseModel>() {
    return {
        toFirestore: (data: T) => data,
        fromFirestore: (snap: QueryDocumentSnapshot) =>
            ({
                ...(snap.data()),
                id: snap.id,
                snap
            }) as T
    };     
}

function dataPoint<T extends FirebaseModel>(collectionPath: string) {
    return collection(firestore, collectionPath).withConverter(converter<T>());
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

