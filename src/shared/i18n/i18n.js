import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'es',
  messages: {
    en,
    es,
    fr,
  },
})

export default i18n
