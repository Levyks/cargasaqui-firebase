import { register, init, getLocaleFromNavigator, dictionary, locale } from 'svelte-i18n';
import { get_store_value } from "svelte/internal";
import type { LocaleDictionary } from '@/typings';

register('pt-BR', () => import('@/locales/pt-BR.yaml'));

init({
    fallbackLocale: 'pt-BR',
    initialLocale: getLocaleFromNavigator(),
});

export function getCurrentDictionary(): LocaleDictionary | null {

    const dictsObj = get_store_value(dictionary);
    if(!dictsObj) return null;

    const localeObj = get_store_value(locale);
    if(!localeObj) return null;

    return (dictsObj[localeObj] as LocaleDictionary) || null;
}


export function getFirebaseErrorTranslationKey(error: { code: string }): string {

    const defaultKey = 'errors.unknown';

    const dict = getCurrentDictionary();
  
    const firebaseErrorsDict = (dict?.errors as LocaleDictionary)?.firebase as LocaleDictionary;
    if(!firebaseErrorsDict) return defaultKey;

    if(firebaseErrorsDict[error.code]) {
        return `errors.firebase.${error.code}`;
    }

    console.warn(`Missing translation key for Firebase error: ${error.code}`);
    
    return defaultKey;
    
  }