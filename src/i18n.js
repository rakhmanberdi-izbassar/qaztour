import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEN from './locales/en/translation.json'
import translationKK from './locales/kk/translation.json'

const resources = {
    en: {
        translation: translationEN,
    },
    kk: {
        translation: translationKK,
    },

}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('i18nextLng') || 'kk', // Әдепкі тіл қазақша
        fallbackLng: 'en', // Егер аударма табылмаса, ағылшыншаны қолдану
        debug: false,

        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: [
                'queryString',
                'cookie',
                'localStorage',
                'sessionStorage',
                'navigator',
                'htmlTag',
            ],
            caches: ['localStorage', 'cookie'],
        },
    })

export default i18n