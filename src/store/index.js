import { createStore } from 'vuex'
import faq from '../store/modules/faq'
import category from '../store/modules/category'
import bookEService from '../store/modules/book_e_service'
import eService from '../store/modules/e_service'
import eProvider from '../store/modules/e_provider'
import booking from '../store/modules/booking'
import snackbar from './modules/snackbar'
import slider from './modules/slider'
import user from './modules/user'
import notification from './modules/notification'
import customPage from './modules/custom_page'
import upload from './modules/upload'

const store = createStore({
    modules: {
        faq,
        category,
        bookEService,
        booking,
        snackbar,
        slider,
        eService,
        eProvider,
        user,
        notification,
        customPage,
        upload,
    },
})

export default store
