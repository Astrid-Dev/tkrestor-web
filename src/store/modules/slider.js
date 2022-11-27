import { getCurrentInstance as instance } from 'vue'

export default {
    namespaced: true,
    state: () => ({
        slides: [],
    }),

    getters: {
        //
    },

    mutations: {
        UPDATE_SLIDES(state, slides) {
            state.slides = slides
        },
    },

    actions: {
        getSlidesAction: function({ commit }) {
            this.$axios.get('slides')
                .then(response => {
                    commit('UPDATE_SLIDES', response.data.data)
                })
        },
    },
}
