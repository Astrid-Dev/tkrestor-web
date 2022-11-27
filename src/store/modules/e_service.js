import { filterOptionsByEService, swipePrices } from '../../utils/helper'

export default {
    namespaced: true,
    state: () => ({
        page: 1,
        keywords: undefined,
        eService: {},
        recommendedEServices: [],
        eServiceReviews: [],
        optionGroups: [],
        eServicesOfCategory: [],
    }),
    mutations: {
        UPDATE_KEYWORDS(state, keywords) {
            state.keywords = keywords
        },
        UPDATE_RECOMMENDED_E_SERVICES(state, eServices) {
            state.recommendedEServices = eServices
        },
        UPDATE_E_SERVICES_OF_CATEGORY(state, eServices) {
            state.eServicesOfCategory = eServices
        },

        PUSH_E_SERVICES_OF_CATEGORY(state, eServices) {
            state.eServicesOfCategory.push(...eServices)
        },
        UPDATE_E_SERVICE(state, eService) {
            state.eService = eService
        },
        UPDATE_E_SERVICE_REVIEWS(state, reviews) {
            state.eServiceReviews.push(...reviews)
        },

        UPDATE_E_SERVICE_OPTION_GROUPS(state, optionGroups) {
            state.optionGroups = optionGroups
        },
        UPDATE_PAGE(state, page) {
            state.page = page
        },
    },
    actions: {
        getRecommendedEServicesAction({ commit }) {
            let queryParameters = {
                'only': 'id;name;price;discount_price;price_unit;has_media;media;total_reviews;rate;description',
                'limit': '6',
            }
            this.$axios.get('e_services', { params: queryParameters }).then(response => {
                if (response.status === 200 && response.data?.success) {
                    const eServices = response.data.data?.map(element => swipePrices(element))
                    commit('UPDATE_RECOMMENDED_E_SERVICES', eServices)
                }
            })
        },

        getEServicesOfCategoryAction({ commit }, { categoryId = '', priceFilter }) {
            if (this.state.eService.page === 1)
                commit('UPDATE_E_SERVICES_OF_CATEGORY', [])
            let queryParameters = {
                'with': 'eProvider;eProvider.addresses;categories',
                'search': `categories.id:${categoryId}`,
                'searchFields': 'categories.id:=',
                'searchJoin': 'and',
                'limit': '4',
                'offset': ((this.state.eService.page - 1) * 4).toString(),
            }
            if (priceFilter !== undefined && priceFilter !== 'all') {
                queryParameters['search'] += `;price:${priceFilter.replace('_', ',')}`
                queryParameters['searchFields'] += ';price:between'
            }
            this.$axios.get('e_services', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    const eServices = response.data.data?.map(element => swipePrices(element))
                    commit('PUSH_E_SERVICES_OF_CATEGORY', eServices)
                }
            })
        },

        getAvailableEServicesOfCategoryAction({ commit }, { categoryId = '', priceFilter }) {
            if (this.state.eService.page === 1)
                commit('UPDATE_E_SERVICES_OF_CATEGORY', [])
            let queryParameters = {
                'with': 'eProvider;eProvider.addresses;categories',
                'search': `categories.id:${categoryId}`,
                'searchFields': 'categories.id:=',
                'available_e_provider': 'true',
                'limit': '4',
                'offset': ((this.state.eService.page - 1) * 4).toString(),
            }
            if (priceFilter !== undefined && priceFilter !== 'all') {
                queryParameters['search'] += `;price:${priceFilter.replace('_', ',')}`
                queryParameters['searchFields'] += ';price:between'
            }
            this.$axios.get('e_services', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    const eServices = response.data.data?.map(element => swipePrices(element))
                    commit('PUSH_E_SERVICES_OF_CATEGORY', eServices)
                }

            })
        },

        getMostRatedEServicesOfCategoryAction({ commit }, { categoryId = '', priceFilter }) {
            if (this.state.eService.page === 1)
                commit('UPDATE_E_SERVICES_OF_CATEGORY', [])
            console.log(this.state.eService.page)
            let queryParameters = {
                'with': 'eProvider;eProvider.addresses;categories',
                'search': `categories.id:${categoryId}`,
                'searchFields': 'categories.id:=',
                'rating': 'true',
                'limit': '4',
                'offset': ((this.state.eService.page - 1) * 4).toString(),
            }
            if (priceFilter !== undefined && priceFilter !== 'all') {
                queryParameters['search'] += `;price:${priceFilter.replace('_', ',')}`
                queryParameters['searchFields'] += ';price:between'
            }
            this.$axios.get('e_services', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    const eServices = response.data.data?.map(element => swipePrices(element))
                    commit('PUSH_E_SERVICES_OF_CATEGORY', eServices)
                }
            })
        },

        getFeaturedEServicesOfCategoryAction({ commit }, { categoryId = '', priceFilter }) {
            if (this.state.eService.page === 1)
                commit('UPDATE_E_SERVICES_OF_CATEGORY', [])
            let queryParameters = {
                'with': 'eProvider;eProvider.addresses;categories',
                'search': `categories.id:${categoryId};featured:1`,
                'searchFields': 'categories.id:=;featured:=',
                'rating': 'true',
                'searchJoin': 'and',
                'limit': '4',
                'offset': ((this.state.eService.page - 1) * 4).toString(),
            }
            if (priceFilter !== undefined && priceFilter !== 'all') {
                queryParameters['search'] += `;price:${priceFilter.replace('_', ',')}`
                queryParameters['searchFields'] += ';price:between'
            }
            this.$axios.get('e_services', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    const eServices = response.data.data?.map(element => swipePrices(element))
                    commit('PUSH_E_SERVICES_OF_CATEGORY', eServices)
                }
            })
        },

        getFavoriteEServicesAction({ state, commit, rootGetters }, { priceFilter }) {
            if (state.page === 1)
                commit('UPDATE_E_SERVICES_OF_CATEGORY', [])
            let queryParameters = {
                'with': 'eService;options;eService.eProvider',
                'search': `user_id:${rootGetters['user/getUser'].id}`,
                'searchFields': 'user_id:=',
                'orderBy': 'created_at',
                'sortBy': 'desc',
                'limit': '4',
                'api_token': rootGetters['user/getUser'].api_token,
                'offset': ((state.page - 1) * 4).toString(),
            }
            if (priceFilter !== undefined && priceFilter !== 'all') {
                queryParameters['search'] += `;eService.price:${priceFilter.replace('_', ',')}`
                queryParameters['searchFields'] += ';eService.price:between'
            }
            this.$axios.get('favorites', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    const eServices = response.data.data?.map((element) => {
                        element.e_service = swipePrices(element.e_service)
                        return element.e_service
                    })
                    commit('PUSH_E_SERVICES_OF_CATEGORY', eServices)
                }
            })
        },

        getSearchEServicesAction({ commit }, { keywords = '' }) {
            if (this.state.eService.page === 1)
                commit('UPDATE_E_SERVICES_OF_CATEGORY', [])
            let queryParameters = {
                'with': 'eProvider;eProvider.addresses;categories',
                'search': `name:${keywords}`,
                'searchFields': 'name:like',
                'searchJoin': 'and',
                'limit': '4',
                'offset': ((this.state.eService.page - 1) * 4).toString(),
            }
            this.$axios.get('e_services', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    const eServices = response.data.data?.map(element => swipePrices(element))
                    commit('PUSH_E_SERVICES_OF_CATEGORY', eServices)
                }
            })
        },

        getEService({ commit, rootGetters }, id = '') {
            commit('UPDATE_E_SERVICE', {})
            let queryParameters = {
                'with': 'eProvider;eProvider.taxes;categories;favorites',
                'api_token': rootGetters['user/getUser']?.api_token,
            }
            this.$axios.get(`e_services/${id}`, { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200) {
                    if (response.data.data['discount_price'] > 0) {
                        const price = response.data.data['price']
                        response.data.data['price'] = response.data.data['discount_price']
                        response.data.data['discount_price'] = price
                    }
                    commit('UPDATE_E_SERVICE', response.data.data)
                }
            })
        },

        getEServiceReviews({ commit }, eServiceId = '') {
            commit('UPDATE_E_SERVICE_REVIEWS', [])
            let queryParameters = {
                'with': 'user',
                'only': 'created_at;review;rate;user',
                'search': `e_service_id:${eServiceId}`,
                'orderBy': 'created_at',
                'sortBy': 'desc',
                'limit': '10',
            }
            this.$axios.get(`e_service_reviews`, { params: queryParameters }).then(response => {
                console.log(response.data.data)
                commit('UPDATE_E_SERVICE_REVIEWS', response.data.data)
            })
        },

        getEServiceOptionGroups({ commit }, eServiceId = '') {
            commit('UPDATE_E_SERVICE_OPTION_GROUPS', [])
            let queryParameters = {
                'with': 'options;options.media',
                'only': 'id;name;allow_multiple;options.id;options.name;options.description;options.price;options.option_group_id;options.e_service_id;options.media',
                'search': `options.e_service_id:${eServiceId}`,
                'searchFields': 'options.e_service_id:=',
                'orderBy': 'name',
                'sortBy': 'desc',
            }
            this.$axios.get(`option_groups`, { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    let optionGroups = filterOptionsByEService(response.data.data, eServiceId)
                    commit('UPDATE_E_SERVICE_OPTION_GROUPS', optionGroups)
                }
            })
        },

        async addEServiceToFavoritesAction({ commit, rootGetters }, eService) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            let favorite = {
                user_id: rootGetters['user/getUser'].id,
                e_service_id: eService.id,
                options: this.state.bookEService.booking.options.map(function(element) {
                    return element.id
                }),
            }
            const response = await this.$axios.post('favorites', favorite, { params: queryParameters })
            if (response.status === 200 && response.data?.success) {
                eService.is_favorite = true
                commit('UPDATE_E_SERVICE', eService)
                return { type: 'success', title: 'Added successfully', message: 'This service has been added to favorites' }
            }
            return { type: 'error', title: 'Error', message: response.data?.message }

        },

        async removeEServiceFromFavoritesAction({ commit, rootGetters }, eService) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            let favorite = {
                user_id: rootGetters['user/getUser'].id,
                e_service_id: eService.id,
            }
            const response = await this.$axios.delete('favorites/1', { params: queryParameters, data: favorite })
            if (response.status === 200 && response.data?.success) {
                eService.is_favorite = false
                commit('UPDATE_E_SERVICE', eService)
                return { type: 'success', title: 'Removed successfully', message: 'This service has been removed from favorites' }
            }
            return { type: 'error', title: 'Error', message: response.data?.message }

        },

        incrementPage({ commit }) {
            commit('UPDATE_PAGE', ++this.state.eService.page)
        },

        resetPagination({ commit }) {
            commit('UPDATE_PAGE', 1)
        },

        updateKeywordsAction({ commit }, keywords) {
            commit('UPDATE_KEYWORDS', keywords)
        },
    },
}
