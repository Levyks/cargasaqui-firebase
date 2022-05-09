import type { FirebaseModel } from "@/typings";
import type { DocumentReference } from "firebase/firestore";

export default interface Cargo extends FirebaseModel {
    route: string;
    numberOfDeliveries: number;
    weightInKg: number;
    state: DocumentReference;
    status: DocumentReference;
}