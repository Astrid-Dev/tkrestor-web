import { getCurrentInstance as instance } from 'vue'
import {mapHtmlForm} from "../../utils/helper";

export default {
    namespaced: true,
    state: () => ({
        eProvider: {},
        eProviderReviews: [],
        eProviderGalleries: [],
        eProviderAwards: [],
        eProviderExperiences: [],
        eProviderFeaturedEServices: [],
        eProviderTypes: []
    }),
    mutations: {
        UPDATE_E_PROVIDER(state, eProvider) {
            state.eProvider = eProvider
            localStorage.setItem('provider', JSON.stringify(payload))
        },
        UPDATE_E_PROVIDER_TYPES(state, eProviderTypes) {
            state.eProviderTypes = eProviderTypes
        },
        UPDATE_E_PROVIDER_REVIEWS(state, reviews) {
            state.eProviderReviews.push(...reviews)
        },

        UPDATE_E_PROVIDER_GALLERIES(state, galleries) {
            state.eProviderGalleries.push(...galleries)
        },

        UPDATE_E_PROVIDER_AWARDS(state, awards) {
            state.eProviderAwards = awards
        },

        UPDATE_E_PROVIDER_EXPERIENCES(state, experiences) {
            state.eProviderExperiences = experiences
        },

        UPDATE_E_PROVIDER_FEATURED_E_SERVICES(state, eServices) {
            state.eProviderFeaturedEServices.push(...eServices)
        },
    },
    actions: {
        async registerEProviderAction({ dispatch, commit }, event) {
            let data = mapHtmlForm(event);
            const response = await this.$axios.post(('e_providers'), data)
            if (response.status === 200 && response.data?.success) {
                commit('UPDATE_E_PROVIDER', response.data.data)
                return { type: 'success', title: 'Profile updated successfully', message: 'Thank you for updating your profile' }
            }
            return { type: 'error', title: 'Profile\'s completion Error', message: response.data?.message }
        },

        getEProviderTypes({ commit }) {
            this.$axios.get(`provider/e_provider_types`).then(response => {
                commit('UPDATE_E_PROVIDER_TYPES', response.data.data)
            })
        },

        getEProvider({ commit }, id = '') {
            commit('UPDATE_E_PROVIDER', {})
            let queryParameters = {
                'with': 'eProviderType;availabilityHours;users',
            }
            this.$axios.get(`e_providers/${id}`, { params: queryParameters }).then(response => {
                console.log(response.data.data)
                commit('UPDATE_E_PROVIDER', response.data.data)
            })
        },

        getEProviderReviews({ commit }, eProviderId = '') {
            commit('UPDATE_E_PROVIDER_REVIEWS', [])
            let queryParameters = {
                'with': 'eProviderReviews;eProviderReviews.user',
                'only': 'eProviderReviews.id;eProviderReviews.review;eProviderReviews.rate;eProviderReviews.created_at;eProviderReviews.user;',
            }

            this.$axios.get(`e_providers/${eProviderId}`, { params: queryParameters }).then(response => {
                console.log(response.data.data?.e_provider_reviews)
                commit('UPDATE_E_PROVIDER_REVIEWS', response.data.data?.e_provider_reviews || [])
            })
        },

        getEProviderGalleries({ commit }, eProviderId = '') {
            commit('UPDATE_E_PROVIDER_GALLERIES', [])
            let queryParameters = {
                'with': 'media',
                'search': `e_provider_id:${eProviderId}`,
                'searchFields': 'e_provider_id:=',
                'orderBy': 'updated_at',
                'sortedBy': 'desc',
            }

            this.$axios.get(`galleries`, { params: queryParameters }).then(response => {
                console.log(response.data.data)
                commit('UPDATE_E_PROVIDER_GALLERIES', response.data.data || [])
            })
        },

        getEProviderAwards({ commit }, eProviderId = '') {
            commit('UPDATE_E_PROVIDER_AWARDS', [])
            let queryParameters = {
                'search': `e_provider_id:${eProviderId}`,
                'searchFields': 'e_provider_id:=',
                'orderBy': 'updated_at',
                'sortedBy': 'desc',
            }

            this.$axios.get(`awards`, { params: queryParameters }).then(response => {
                console.log(response.data.data)
                commit('UPDATE_E_PROVIDER_AWARDS', response.data.data)
            })
        },

        getEProviderExperiences({ commit }, eProviderId = '') {
            commit('UPDATE_E_PROVIDER_EXPERIENCES', [])
            let queryParameters = {
                'search': `e_provider_id:${eProviderId}`,
                'searchFields': 'e_provider_id:=',
                'orderBy': 'updated_at',
                'sortedBy': 'desc',
            }

            this.$axios.get(`experiences`, { params: queryParameters }).then(response => {
                console.log(response.data.data)
                commit('UPDATE_E_PROVIDER_EXPERIENCES', response.data.data)
            })
        },

        getEProviderFeaturedEServices({ commit }, eProviderId = '', limit = 6, page = 1) {
            if (page === 1) {
                commit('UPDATE_E_PROVIDER_FEATURED_E_SERVICES', [])
            }
            let queryParameters = {
                'with': 'eProvider;eProvider.addresses;categories',
                'search': `e_provider_id:${eProviderId};featured:1`,
                'searchFields': 'e_provider_id:=;featured:=',
                'searchJoin': 'and',
                'limit': limit.toString(),
                'offset': ((page - 1) * 5).toString(),
            }

            this.$axios.get(`e_services`, { params: queryParameters }).then(response => {
                console.log(response.data.data)
                commit('UPDATE_E_PROVIDER_FEATURED_E_SERVICES', response.data.data || [])
            })
        },
    },
}
