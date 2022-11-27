import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'

export async function getSupportedLocales() {
    const config = await fetch('config/global.json').then((response) => response.json())
    return config['supported_languages']
}

async function getLocale() {
    return localStorage.getItem('locale') || (await getSupportedLocales())[0]
}

function setLocale(i18n, locale) {
    localStorage.setItem('locale', locale)
    if (i18n.mode === 'legacy') {
        return i18n.global.locale = locale
    } else {
        return i18n.global.locale.value = locale
    }
}

export async function setupI18n(options = { locale: 'en' }) {
    const i18n = createI18n(options)
    // get saved local or fallback (the first supported local)
    const paramsLocale = await getLocale()
    // load locale messages
    await loadLocaleMessages(i18n, paramsLocale)
    // set i18n language
    setI18nLanguage(i18n, paramsLocale)
    return i18n
}

export function setI18nLanguage(i18n, locale) {
    setLocale(i18n, locale)
    document.querySelector('html').setAttribute('lang', locale)
    if (locale === 'ar') {
        document.querySelector('html').setAttribute('dir', 'rtl')
    } else {
        document.querySelector('html').setAttribute('dir', 'ltr')
    }
}


export async function loadLocaleMessages(i18n, locale) {
    // load locale messages
    let messages = fetch(`locales/${locale}.json`)
    messages = await messages.then((data) => data.json())
    // set locale and locale message
    i18n.global.setLocaleMessage(locale, messages)

    return nextTick()
}