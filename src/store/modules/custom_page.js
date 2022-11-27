export default {
    namespaced: true,
    state: () => ({
        customPages: [],
        customPageDetails: {},
    }),

    getters: {
        //
    },

    mutations: {
        UPDATE_CUSTOM_PAGES(state, customPages) {
            state.customPages = customPages
        },
        UPDATE_CUSTOM_PAGE(state, customPage) {
            state.customPageDetails = customPage
        },
    },

    actions: {
        getCustomPagesAction: function({ commit }) {
            let queryParameters = {
                'only': 'id;title',
                'search': 'published:1',
                'orderBy': 'created_at',
                'sortedBy': 'asc',
            }
            this.$axios.get('custom_pages', { params: queryParameters }).then(response => {
                if (response.status === 200 && response.data?.success) {
                    commit('UPDATE_CUSTOM_PAGES', response.data.data)
                }
            })
        },

        getCustomPageDetailsAction: function({ commit }, pageId) {
            let queryParameters = {}
            this.$axios.get(`custom_pages/${pageId}`, { params: queryParameters }).then(response => {
                if (response.status === 200 && response.data?.success) {
                    commit('UPDATE_CUSTOM_PAGE', response.data.data)
                }
            })
        },
    },
}
