import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { STORAGE_KEY } from '@/constants'

export const loadI18n = async () => {
  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: false,

      fallbackLng: 'en',
      lng: localStorage.getItem(STORAGE_KEY.I18_NEXT_LNG) || 'en',
      defaultNS: 'translation',
      ns: ['translation'],
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json'
      },
      interpolation: {
        escapeValue: false
      },
      returnObjects: true
    })
}
