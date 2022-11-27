import { FILTER_ALL, FILTER_AVAILABILITY, FILTER_FEATURED, FILTER_POPULAR, FILTER_RATING } from '../../utils/const'

export default {
    namespaced: true,
    state: () => ({
        category: {},
        featuredCategories: [],
        allCategoriesWithSubcategories: [],
        generalFilter: [
            { id: FILTER_ALL, name: 'All' },
            { id: FILTER_AVAILABILITY, name: 'Availability' },
            { id: FILTER_RATING, name: 'Rating' },
            { id: FILTER_FEATURED, name: 'Featured' },
            { id: FILTER_POPULAR, name: 'Popular' },
        ],
        reviewFilter: [
            { star: 'all' }, // all
            { star: 1 },
            { star: 2 },
            { star: 3 },
            { star: 4 },
            { star: 5 },
        ],
        priceFilter: [
            { id: 'all' }, // all
            { id: '1_20', from: 1, to: 20 },
            { id: '20_50', from: 20, to: 50 },
            { id: '50_100', from: 50, to: 100 },
            { id: '100_200', from: 100, to: 200 },
            { id: '200_500', from: 200, to: 500 },
        ],
    }),
    mutations: {
        UPDATE_CATEGORY(state, category) {
            state.category = category
        },
        UPDATE_FEATURED_CATEGORIES(state, categories) {
            state.featuredCategories = categories
        },
        UPDATE_ALL_WITH_SUBCATEGORIES(state, categories) {
            state.allCategoriesWithSubcategories = categories
        },
    },
    actions: {
        getCategoryAction({ commit }, categoryId) {
            commit('UPDATE_CATEGORY', {})
            let queryParameters = {
                'filter': 'id;name',
            }
            this.$axios.get(`categories/${categoryId}`, { params: queryParameters }).then(response => {
                commit('UPDATE_CATEGORY', response.data.data)
            })
        },

        getFeaturedCategoriesAction({ commit }) {
            let queryParameters = {
                'with': 'featuredEServices',
                'parent': 'true',
                'search': 'featured:1',
                'searchFields': 'featured:=',
                'orderBy': 'order',
                'sortedBy': 'asc',
                'limit': '6',
            }
            this.$axios.get('categories', { params: queryParameters }).then(response => {
                console.log(response.data)
                commit('UPDATE_FEATURED_CATEGORIES', response.data.data)
            })
        },

        getAllWithSubCategoriesAction({ commit }) {
            let queryParameters = {
                'with': 'subCategories',
                'parent': 'true',
                'orderBy': 'order',
                'sortBy': 'asc',
            }
            this.$axios.get('categories', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                commit('UPDATE_ALL_WITH_SUBCATEGORIES', response.data.data)
            })
        },
    },
}
