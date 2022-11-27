import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import store from './store'
import LitepieDatepicker from 'litepie-datepicker'
import VueGeolocation from 'vue3-geolocation'
import GMaps from 'vuejs3-google-maps'

import './index.css'
import http from './plugins/http'
import filters from './plugins/filters'
import { setupI18n } from './utils/i18n'
import UUID from 'vue3-uuid'
import tinycolor from 'tinycolor2'


let app = createApp(App);

(async () => {
    const config = await fetch('config/global.json').then((response) => response.json())
    const settings = await fetch(config['admin_url'] + config['api_path'] + 'settings').then((response) => response.json())
    if (settings.success) {
        setMainColor(settings.data)
        setAccentColor(settings.data)
        setSecondColor(settings.data)
    }
    const i18n = await setupI18n()

    app.config.globalProperties.$settings = settings.data
    app.config.globalProperties.$global = config
    app.config.globalProperties.i18n = i18n

    app.config.performance = true
    app.use(LitepieDatepicker)
    app.use(store)
    app.use(http)
    app.use(filters)
    app.use(i18n)
    app.use(UUID)
    app.use(VueGeolocation)
    app.use(GMaps, {
        load: {
            apiKey: settings.data['google_maps_key'],
            libraries: ['places'],
        },
    })
    app.use(createRouter(app)).mount('#app')
})()

function setMainColor(settings) {
    document.documentElement.style.setProperty('--vc-clr-primary', settings['main_color'])
    document.documentElement.style.setProperty('--vc-clr-secondary', tinycolor(settings['main_color']).brighten(40))
    document.documentElement.style.setProperty('--main-color-50', tinycolor(settings['main_color']).setAlpha(0.05))
    document.documentElement.style.setProperty('--main-color-100', tinycolor(settings['main_color']).setAlpha(0.2))
    document.documentElement.style.setProperty('--main-color-200', tinycolor(settings['main_color']).setAlpha(0.3))
    document.documentElement.style.setProperty('--main-color-300', tinycolor(settings['main_color']).setAlpha(0.5))
    document.documentElement.style.setProperty('--main-color-400', tinycolor(settings['main_color']).setAlpha(0.7))
    document.documentElement.style.setProperty('--main-color-500', tinycolor(settings['main_color']).setAlpha(0.8))
    document.documentElement.style.setProperty('--main-color-600', settings['main_color'])
    document.documentElement.style.setProperty('--main-color-700', tinycolor(settings['main_color']).darken(10))
    document.documentElement.style.setProperty('--main-color-800', tinycolor(settings['main_color']).darken(20))
    document.documentElement.style.setProperty('--main-color-900', tinycolor(settings['main_color']).darken(30))
}

function setAccentColor(settings) {
    document.documentElement.style.setProperty('--accent-color-50', tinycolor(settings['accent_color']).setAlpha(0.05))
    document.documentElement.style.setProperty('--accent-color-100', tinycolor(settings['accent_color']).setAlpha(0.2))
    document.documentElement.style.setProperty('--accent-color-200', tinycolor(settings['accent_color']).setAlpha(0.3))
    document.documentElement.style.setProperty('--accent-color-300', tinycolor(settings['accent_color']).setAlpha(0.5))
    document.documentElement.style.setProperty('--accent-color-400', tinycolor(settings['accent_color']).setAlpha(0.7))
    document.documentElement.style.setProperty('--accent-color-500', tinycolor(settings['accent_color']).setAlpha(0.8))
    document.documentElement.style.setProperty('--accent-color-600', settings['accent_color'])
    document.documentElement.style.setProperty('--accent-color-700', tinycolor(settings['accent_color']).darken(10))
    document.documentElement.style.setProperty('--accent-color-800', tinycolor(settings['accent_color']).darken(20))
    document.documentElement.style.setProperty('--accent-color-900', tinycolor(settings['accent_color']).darken(30))
}

function setSecondColor(settings) {
    document.documentElement.style.setProperty('--second-color-50', tinycolor(settings['second_color']).setAlpha(0.05))
    document.documentElement.style.setProperty('--second-color-100', tinycolor(settings['second_color']).setAlpha(0.2))
    document.documentElement.style.setProperty('--second-color-200', tinycolor(settings['second_color']).setAlpha(0.3))
    document.documentElement.style.setProperty('--second-color-300', tinycolor(settings['second_color']).setAlpha(0.5))
    document.documentElement.style.setProperty('--second-color-400', tinycolor(settings['second_color']).setAlpha(0.7))
    document.documentElement.style.setProperty('--second-color-500', tinycolor(settings['second_color']).setAlpha(0.8))
    document.documentElement.style.setProperty('--second-color-600', settings['second_color'])
    document.documentElement.style.setProperty('--second-color-700', tinycolor(settings['second_color']).darken(10))
    document.documentElement.style.setProperty('--second-color-800', tinycolor(settings['second_color']).darken(20))
    document.documentElement.style.setProperty('--second-color-900', tinycolor(settings['second_color']).darken(30))
}

