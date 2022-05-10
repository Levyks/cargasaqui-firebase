import type { FirebaseModel } from "@/typings";
import type { DocumentReference } from "firebase/firestore";

export default interface Cargo extends FirebaseModel {
    route: string;
    numberOfDeliveries: number;
    weightInKg: number;
    state: DocumentReference;
    status: DocumentReference;
}

export interface CargoPrivate extends FirebaseModel {
    payment: number;
    advancePayment: number;
    driverName: string;
    driverPhone: string;
    note: string;
}