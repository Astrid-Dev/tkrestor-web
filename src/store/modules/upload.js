import { uuid } from 'vue3-uuid'

export default {
    namespaced: true,

    state: () => ({
        uuid: undefined,
        previewImage: undefined,
        progress: undefined,
    }),

    getters: {},

    mutations: {
        UPDATE_UUID(state, payload) {
            state.uuid = payload
        },

        UPDATE_PROGRESS(state, payload) {
            state.progress = payload
        },

        UPDATE_PREVIEW(state, payload) {
            state.previewImage = payload
        },
    },

    actions: {
        async uploadAction({ commit, rootGetters }, { file, field }) {
            commit('UPDATE_UUID', undefined)
            commit('UPDATE_PROGRESS', 0)
            let formData = new FormData()
            formData.append('file', file)
            formData.append('uuid', uuid.v4())
            formData.append('field', field)

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            const response = await this.$axios.post('uploads/store', formData, {
                params: queryParameters,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (e) => {
                    commit('UPDATE_PROGRESS', Math.round((100 * e.loaded) / e.total))
                },
            })
            if (response.status === 200 && response.data?.success) {
                commit('UPDATE_UUID', response.data.data)
                return { type: 'success', title: 'Uploaded Successfully', message: '' }
            }
            return { type: 'error', title: 'Upload Error', message: response.data.message }
        },

        updatePreviewAction({ commit, rootGetters }, file) {
            commit('UPDATE_PREVIEW', URL.createObjectURL(file))
        },
    },
}
