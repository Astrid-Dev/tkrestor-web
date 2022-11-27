import { prepareReadNotification } from '../../utils/helper'

export default {
    namespaced: true,
    state: () => ({
        page: 1,
        notifications: [],
    }),

    getters: {},

    mutations: {
        UPDATE_NOTIFICATIONS(state, payload) {
            state.notifications = payload
        },

        PUSH_NOTIFICATIONS(state, payload) {
            state.notifications.push(...payload)
        },
        UPDATE_PAGE(state, page) {
            state.page = page
        },
    },

    actions: {
        getNotificationsAction({ state, commit, rootGetters }) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }
            if (state.page === 1)
                commit('UPDATE_NOTIFICATIONS', [])
            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
                'search': `notifiable_id:${rootGetters['user/getUser'].id}`,
                'searchFields': 'notifiable_id:=',
                'searchJoin': 'and',
                'orderBy': 'created_at',
                'sortedBy': 'desc',
                'limit': '4',
                'offset': ((state.page - 1) * 4).toString(),
                'only': 'id;type;data;read_at;created_at',
            }
            this.$axios.get('notifications', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    let notifications = response.data?.data || []
                    notifications = notifications.map((element) => {
                        element.data = JSON.parse(element.data)
                        return element
                    })
                    commit('PUSH_NOTIFICATIONS', notifications)
                }
            })
        },

        markAsReadNotification({ state, commit, rootGetters }, notification) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }
            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            this.$axios.put(`notifications/${notification.id}`, prepareReadNotification(notification), { params: queryParameters }).then(response => {
                console.log(response.data)
                if (response.status === 200 && response.data?.success) {
                    notification.read_at = true
                }
            })
        },

        incrementPageAction({ state, commit }) {
            commit('UPDATE_PAGE', ++state.page)
        },

        resetPaginationAction({ commit }) {
            commit('UPDATE_PAGE', 1)
        },
    },
}
