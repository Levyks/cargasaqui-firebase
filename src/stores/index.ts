import { derived, writable } from "svelte/store";

import type { Readable } from "svelte/store";
import type { User, IdTokenResult } from "firebase/auth";
import type { Company, Status } from "@/models";
import { onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "@/services/firebase/db";

export const user = writable<User | null>();
export const company = writable<Company | null>();
export const statuses = writable<{ [id: string]: Status }>();
export const userIdTokenResult = writable<IdTokenResult | null>();

/* Derived was beeing called way too much for some reason, using user.subscribe solves it */
user.subscribe(async u => {
    if(!u) return userIdTokenResult.set(null);
    const token = await u.getIdTokenResult().catch(() => null);
    userIdTokenResult.set(token);
});

export const userRoleInCompany: Readable<string> = derived([userIdTokenResult, company], ([$token, $company], set) => {
    if(!$token || !$company) return set(null);
    set($token.claims.roles?.[$company.id]);
});
export const userIsMasterAdmin: Readable<boolean> = derived(userIdTokenResult, ($token, set) => {
    if(!$token) return set(false);
    set($token.claims.master_admin as unknown as boolean);
});

let statusesUnsub: Unsubscribe;
let lastCompanyIdSubscribed: string;
company.subscribe(c => {

    if(!c) return statuses.set(null);

    if(c.id === lastCompanyIdSubscribed) return;

    if(statusesUnsub) {
        statusesUnsub();
        statusesUnsub = null;
    }

    lastCompanyIdSubscribed = c.id;
    statusesUnsub = onSnapshot(db.companyStatuses(c), snapshot => {
        statuses.set(
            snapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = doc.data();
                return acc;
            }, {})
        )
    });

});