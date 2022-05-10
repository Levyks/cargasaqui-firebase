import { db } from "@/services/firebase/db";
import type { FirebaseModel } from "@/typings";
import { getDocs } from "firebase/firestore";
import type Company from "./company";

export default interface Status extends FirebaseModel {
    name: string;
    rowClass?: string;
}

export function fetchStatuses(company: Company): Promise<Status[]> {
    return getDocs(db.companyStatuses(company)).then(r => r.docs.map(doc => doc.data()));
}