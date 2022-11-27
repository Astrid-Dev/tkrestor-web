import axios from 'axios'
import store from '../store'

function createInstance(baseURL) {
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        },
    })
}

export default {
    install: app => {
        store.$axios = createInstance(app.config.globalProperties.$global.admin_url + app.config.globalProperties.$global.api_path)
        store.$global = app.config.globalProperties.$global
    },
} // Check debug/build mode