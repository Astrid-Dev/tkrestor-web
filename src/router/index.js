import Home from '/src/views/Home.vue'
import Categories from '/src/views/Categories.vue'
import Help from '/src/views/Help.vue'
import Category from '/src/views/Category.vue'
import Login from '/src/views/Login.vue'
import Register from '/src/views/Register.vue'
import EService from '/src/views/EService.vue'
import EProvider from '../views/EProvider.vue'
import Bookings from '../views/Bookings.vue'
import Favorites from '../views/Favorites.vue'
import Search from '../views/Search.vue'
import CustomPage from '../views/CustomPage.vue'
import EProviderRegistration from '../views/EProviderRegistration.vue'
import { createRouter as createVueRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login, meta: { requiresNotAuth: true } },
    { path: '/register', name: 'Register', component: Register, meta: { requiresNotAuth: true } },
    { path: '/complete_your_profile', name: 'EProviderRegistration', component: EProviderRegistration},
    { path: '/categories', name: 'Categories', component: Categories },
    { path: '/category/:id/:sort?/:price?/:review?', name: 'Category', component: Category },
    { path: '/favorites/:price?', name: 'Favorites', component: Favorites, meta: { requiresAuth: true } },
    { path: '/search/:keywords?', name: 'Search', component: Search },
    { path: '/e_service/:id', name: 'EService', component: EService },
    { path: '/e_service/:action/:id', name: 'BookEService', component: EService, meta: { requiresAuth: true } },
    { path: '/e_provider/:id', name: 'EProvider', component: EProvider },
    { path: '/bookings', name: 'Bookings', component: Bookings, meta: { requiresAuth: true } },
    { path: '/bookings/:action/:id', name: 'Booking', component: Bookings, meta: { requiresAuth: true } },
    { path: '/bookings/:action/cash/:id', name: '/Cash', component: Bookings, meta: { requiresAuth: true } },
    { path: '/bookings/:action/wallet/:id', name: '/Wallet', component: Bookings, meta: { requiresAuth: true } },
    { path: '/bookings/:action/native/:id', name: 'Native', component: Bookings, meta: { requiresAuth: true } },
    { path: '/help/:id?', name: 'Help', component: Help },
    { path: '/pages/:id', name: 'CustomPage', component: CustomPage },

]

export const createRouter = (app) => {
    let router = createVueRouter({
        history: createWebHistory(),
        routes: routes,
        scrollBehavior(to, from, savedPosition) {
            return { left: 0, top: 0 }
        },
    })
    router.beforeEach(guard => {
        let props = app.config.globalProperties
        window.document.title = props.i18n.global.t(props.$settings['app_name']) + ' | ' + props.i18n.global.t(guard.name) // && toRoute.meta.title ? toRoute.meta.title : 'Home';
        if (guard.meta.requiresAuth && !props.$store.getters['user/isAuth']) {
            return {
                name: 'Login',
                // save the location we were at to come back later
                query: { redirect: guard.fullPath },
            }
        }
        if (guard.meta.requiresNotAuth && props.$store.getters['user/isAuth']) {
            return {
                name: 'Home',
            }
        }
    })
    return router
}
