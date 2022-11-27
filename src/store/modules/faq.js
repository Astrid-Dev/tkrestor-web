export default {
    namespaced: true,
    state: () => ({
        faqs: [],
        categories: [],
    }),

    getters: {
        //
    },

    mutations: {
        UPDATE_FAQS(state, faqs) {
            state.faqs = faqs
        },
        UPDATE_CATEGORIES(state, categories) {
            state.categories = categories
        },
    },

    actions: {
        getCategoriesAction({ commit }) {
            commit('UPDATE_CATEGORIES', [])
            let queryParameters = {
                'filter': 'id;name',
                'orderBy': 'created_at',
                'sortedBy': 'asc',
            }
            this.$axios.get(`faq_categories`, { params: queryParameters }).then(response => {
                commit('UPDATE_CATEGORIES', response.data.data)
            })
        },
        getFaqsAction({ commit }, categoryId) {
            commit('UPDATE_FAQS', [])
            let queryParameters = {
                'search': `faq_category_id:${categoryId}`,
                'searchFields': 'faq_category_id:=',
                'searchJoin': 'and',
                'orderBy': 'updated_at',
                'sortedBy': 'desc',
            }
            this.$axios.get('faqs', { params: queryParameters }).then(response => {
                commit('UPDATE_FAQS', response.data.data)
            })
        },
    },
}
