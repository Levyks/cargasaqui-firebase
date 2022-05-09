import { getStorage, ref, getDownloadURL } from "firebase/storage";
import type { DocumentReference } from "firebase/firestore";
import type { FirebaseModel } from "@/typings";

export default interface Company extends FirebaseModel {
    name: string;
    public_statuses: DocumentReference[];
    logoSrc?: string;
}

function fetchLogoSrc(company: Company): Promise<string> {
    const storage = getStorage();
    const logoRef = ref(storage, `companies/${company.id}/logo.png`);
    return getDownloadURL(logoRef);
}

export async function includeLogoSrc(company: Company, force: boolean = false): Promise<Company> {
    if(!force && company.logoSrc) return company;
    company.logoSrc = await fetchLogoSrc(company);
    return company;
}

export async function getLogoSrc(company: Company, force: boolean = false): Promise<string> {
    if(company.logoSrc) return company.logoSrc;
    await includeLogoSrc(company, force);
    return company.logoSrc;
}