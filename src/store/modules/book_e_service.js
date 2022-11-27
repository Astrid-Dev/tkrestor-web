import { prepareBooking } from '../../utils/helper'

export default {
    namespaced: true,
    state: () => ({
        booking: {
            status: {},
            e_provider: {},
            options: [], // option object to calculate total
            taxes: [],
            quantity: 1,
            address: {},
            e_service: {},
            coupon: {},
            duration: 1,
        },
    }),

    getters: {
        canMakeBooking(state) {
            return (state.booking.user_id !== undefined) && (state.booking.e_service !== undefined) && (state.booking.booking_at !== undefined)
        },
    },

    mutations: {
        UPDATE_BOOKING(state, payload) {
            state.booking = payload
            console.log(state.booking)
        },
    },

    actions: {

        async addBookingAction({ commit, rootGetters }, booking) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            const response = await this.$axios.post('bookings', prepareBooking(booking), { params: queryParameters })
            if (response.status === 200 && response.data?.success) {
                booking.id = response.data.data?.id
                commit('UPDATE_BOOKING', booking)
                return { type: 'success', title: 'Saved successfully', message: 'Your booking has been saved successfully' }
            }
            return { type: 'error', title: 'Error', message: response.data?.message }

        },

        async validateCouponAction({ commit, rootGetters }, booking) {
            if (booking.coupon?.code === '' || booking.coupon?.code === undefined) return {
                type: 'error',
                title: 'Coupon code is required',
                message: 'Coupon code is required',
            }
            if (!rootGetters['user/isAuth']) return { type: 'warning', title: 'Not authorized', message: 'Not authorized' }

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
                'code': booking.coupon?.code || '',
                'e_service_id': booking.e_service?.id || '',
                'e_provider_id': booking.e_service?.e_provider?.id || '',
                'categories_id': booking.e_service?.categories?.map((e) => e.id)?.join(',') ?? '',
            }
            const response = await this.$axios.get('coupons', { params: queryParameters })
            if (response.status === 200 && response.data?.success && response.data.data !== null) {
                booking.coupon_id = response.data.data?.id
                booking.coupon = response.data.data
                commit('UPDATE_BOOKING', booking)
                return { type: 'success', title: 'Coupon code is valid', message: 'Thank you for using our coupon code' }
            }
            return { type: 'error', title: 'Coupon code not valid', message: 'Coupon code not valid' }

        },

        updateQuantityAction({ state, commit }, quantity) {
            if (quantity > 0 && quantity < 100) {
                state.booking.quantity = quantity
                commit('UPDATE_BOOKING', state.booking)
            }
        },

        updateAddressAction({ state, commit }, address) {
            state.booking.address = address
            commit('UPDATE_BOOKING', state.booking)
        },

        updateHintAction({ state, commit }, hint) {
            state.booking.hint = hint
            commit('UPDATE_BOOKING', state.booking)
        },

        updateCouponAction({ state, commit }, coupon) {
            state.booking.coupon = { code: coupon }
            commit('UPDATE_BOOKING', state.booking)
        },

        updateUserAction({ state, commit }, userId) {
            state.booking.user_id = userId
            commit('UPDATE_BOOKING', state.booking)
        },

        updateEServiceAction({ state, commit, rootState, rootGetters }) {
            state.booking.e_service = rootState.eService.eService
            state.booking.e_provider = rootState.eService.eService?.e_provider
            state.booking.taxes = rootState.eService.eService?.e_provider?.taxes
            state.booking.user_id = rootGetters['user/getUser'].id
            state.booking.address = rootGetters['user/getAddress']
            state.booking.address.user_id = state.booking.user_id
            commit('UPDATE_BOOKING', state.booking)
        },

        toggleOptionAction({ state, commit }, option) {
            if (state.booking.options.includes(option)) {
                state.booking.options = state.booking.options.filter(function(value) {
                    return value.id !== option.id
                })
            } else {
                state.booking.options.push(option)
            }
            commit('UPDATE_BOOKING', state.booking)
        },

        resetOptionAction({ state, commit }) {
            state.booking.options = []
            commit('UPDATE_BOOKING', state.booking)
        },

        updateBookingAtAction({ state, commit }, bookingAt) {
            state.booking.booking_at = bookingAt
            commit('UPDATE_BOOKING', state.booking)
        },

        decrementQuantityAction({ state, commit }) {
            if (state.booking.quantity > 1) {
                --state.booking.quantity
                commit('UPDATE_BOOKING', state.booking)
            }
        },

        incrementQuantityAction({ state, commit }) {
            if (state.booking.quantity < 100) {
                ++state.booking.quantity
                commit('UPDATE_BOOKING', state.booking)
            }
        },
    },
}
