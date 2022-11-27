import * as api from '../../utils/api'
import { swipePrices } from '../../utils/helper'
import dayjs from 'dayjs'

export default {
    namespaced: true,
    state: () => ({
        page: 1,
        review: {
            rate: 1,
            review: '',
        },
        bookingDetails: {},
        statuses: [],
        bookings: [],
        selectedPaymentMethod: {},
        paymentMethods: [],
        timer: {},
        nativePaymentLoading: true,
    }),

    getters: {
        getCurrentStatus(state) {
            let statuses = state.statuses.filter(element => element.current)
            if (statuses.length === 0) {
                return state.statuses[0]
            } else {
                return statuses[0]
            }
        },
    },

    mutations: {
        UPDATE_BOOKING(state, booking) {
            state.bookingDetails = booking
        },

        UPDATE_BOOKINGS(state, bookings) {
            state.bookings = bookings
        },

        PUSH_BOOKINGS(state, bookings) {
            state.bookings.push(...bookings)
        },
        SELECT_STATUS(state, status) {
            state.statuses.forEach(element => {
                element.current = status.id === element.id
            })
        },
        SELECT_PAYMENT_METHOD(state, paymentMethod) {
            state.selectedPaymentMethod = paymentMethod
        },
        UPDATE_STATUSES(state, statuses) {
            state.statuses = statuses
        },
        UPDATE_PAYMENT_METHODS(state, paymentMethods) {
            state.paymentMethods = paymentMethods
        },

        PUSH_WALLET_PAYMENT_METHODS(state, wallets) {
            let pm = []
            state.paymentMethods.forEach(paymentMethod => {
                if (paymentMethod.route === '/Wallet') {
                    wallets = wallets.map((wallet) => {
                        wallet.wallet = { ...wallet }
                        wallet.id = paymentMethod.id
                        wallet.description = wallet.balance.toString()
                        wallet.route = '/Wallet'
                        return wallet
                    })
                    pm.push(...wallets)
                } else {
                    pm.push(paymentMethod)
                }
            })
            state.paymentMethods = pm
        },
        UPDATE_PAGE(state, page) {
            state.page = page
        },
        UPDATE_REVIEW(state, review) {
            state.review = review
        },
        UPDATE_PAYMENT_LOADING(state, loading) {
            state.nativePaymentLoading = loading
        },
    },

    actions: {
        async getStatusesAction({ commit }) {
            let queryParameters = {
                'only': 'id;status;order',
                'orderBy': 'order',
                'sortedBy': 'asc',
            }
            const response = await this.$axios.get('booking_statuses', { params: queryParameters })
            console.log(response.data.data)
            if (response.status === 200 && response.data?.success) {
                commit('UPDATE_STATUSES', response.data.data)
                commit('SELECT_STATUS', response.data.data[0])
            }
        },

        selectStatusAction({ commit }, status) {
            commit('SELECT_STATUS', status)
        },

        getBookingsAction({ state, commit, getters, rootGetters }) {
            if (!rootGetters['user/isAuth']) return { success: false, message: 'Not authorized' }
            const status = getters.getCurrentStatus
            if (state.page === 1) commit('UPDATE_BOOKINGS', [])
            let queryParameters = {
                'with': 'bookingStatus;payment;payment.paymentStatus',
                'api_token': rootGetters['user/getUser'].api_token,
                'search': `booking_status_id:${status.id}`,
                'orderBy': 'created_at',
                'sortedBy': 'desc',
                'limit': '4',
                'offset': ((state.page - 1) * 4).toString(),
            }
            this.$axios.get('bookings', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    const bookings = response.data.data.map(function(element) {
                        element.e_service = swipePrices(element.e_service)
                        return element
                    })
                    commit('PUSH_BOOKINGS', bookings)
                }
            })
        },

        async getBookingDetailsAction({ dispatch, state, commit, getters, rootGetters }, bookingId) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }
            commit('UPDATE_BOOKING', {})
            let queryParameters = {
                'with': 'bookingStatus;user;payment;payment.paymentMethod;payment.paymentStatus',
                'api_token': rootGetters['user/getUser'].api_token,
            }
            const response = await this.$axios.get(`bookings/${bookingId}`, { params: queryParameters })
            if (response.status === 200 && response.data?.success) {
                let booking = response.data.data
                booking.e_service = swipePrices(booking.e_service)
                dispatch('startTimerAction', booking)
                commit('UPDATE_BOOKING', booking)
                commit('UPDATE_PAYMENT_LOADING', false)
            }
        },

        getPaymentMethodsAction({ commit, rootGetters }) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }
            commit('UPDATE_PAYMENT_METHODS', [])
            commit('SELECT_PAYMENT_METHOD', {})
            let queryParameters = {
                'with': 'media',
                'search': 'enabled:1',
                'searchFields': 'enabled:=',
                'orderBy': 'order',
                'sortBy': 'asc',
                'api_token': rootGetters['user/getUser'].api_token,
            }
            this.$axios.get('payment_methods', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    commit('UPDATE_PAYMENT_METHODS', response.data?.data)
                }
            })
        },

        getWalletsAction({ commit, rootGetters }) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }
            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            this.$axios.get('wallets', { params: queryParameters }).then(response => {
                console.log(response.data.data)
                if (response.status === 200 && response.data?.success) {
                    commit('PUSH_WALLET_PAYMENT_METHODS', response.data.data)
                }
            })
        },

        selectPaymentMethodAction({ commit }, paymentMethod) {
            commit('SELECT_PAYMENT_METHOD', paymentMethod)
        },

        async addCashPaymentAction({ state, commit, rootGetters }, booking) {
            if (!rootGetters['user/isAuth']) return { type: 'warning', title: 'Permission denied', message: 'Not authorized' }

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            booking.payment = { payment_method_id: state.selectedPaymentMethod.id }
            const response = await this.$axios.post('payments/cash', booking, { params: queryParameters })
            if (response.status === 200 && response.data?.success) {
                return { type: 'success', title: 'Saved Successfully', message: 'Your payments has been created' }
            }
            return { type: 'error', title: 'Error', message: response.data?.message }

        },

        async addWalletPaymentAction({ state, commit, rootGetters }, booking) {
            if (!rootGetters['user/isAuth']) return { type: 'warning', title: 'Permission denied', message: 'Not authorized' }

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            booking.payment = { payment_method_id: state.selectedPaymentMethod.id }
            const response = await this.$axios.post(`payments/wallets/${state.selectedPaymentMethod.wallet?.id}`, booking, { params: queryParameters })
            if (response.status === 200 && response.data?.success) {
                return { type: 'success', title: 'Saved Successfully', message: 'Your payments has been created' }
            }
            return { type: 'error', title: 'Error', message: response.data?.message }

        },

        updateRateAction({ state, commit }, rate) {
            state.review.rate = rate
            commit('UPDATE_REVIEW', state.review)
        },

        updateReviewAction({ state, commit }, text) {
            state.review.review = text
            commit('UPDATE_REVIEW', state.review)
        },

        async addReviewAction({ state, commit, rootGetters }) {
            if (!rootGetters['user/isAuth']) return { type: 'warning', title: 'Permission denied', message: 'Not authorized' }

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            let review = {
                rate: state.review.rate,
                review: state.review.review,
                user_id: rootGetters['user/getUser'].id,
                e_service_id: state.bookingDetails.e_service?.id,
            }
            const response = await this.$axios.post('e_service_reviews', review, { params: queryParameters })
            if (response.status === 200 && response.data?.success) {
                return { type: 'success', title: 'Saved Successfully', message: 'Your review has been saved' }
            }
            return { type: 'error', title: 'Error', message: response.data?.message }

        },

        async startBookingAction({ dispatch, state, commit, rootGetters }, booking) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            let newBooking = {
                'id': booking.id,
                'start_at': dayjs().toString(),
                'booking_status_id': state.statuses.filter((element) => element.order === this.$global.in_progress)[0]?.id, // in_progress
            }
            const response = await this.$axios.put(`bookings/${booking.id}`, newBooking, { params: queryParameters })
            if (response.status === 200 && response.data?.success) {
                booking.start_at = response.data.data?.start_at
                booking.booking_status = response.data.data?.booking_status
                dispatch('startTimerAction', booking)
                commit('UPDATE_BOOKING', booking)

                return { type: 'success', title: 'Started successfully', message: 'Your booking has been started successfully' }
            }
            return { type: 'error', title: 'Error', message: response.data?.message }
        },

        startTimerAction({ state, commit }, booking) {
            if (booking.booking_status?.order === this.$global.in_progress) {
                state.timer = setInterval(() => {
                    state.bookingDetails.duration += (1 / 3600)
                    commit('UPDATE_BOOKING', state.bookingDetails)
                }, 1000)
            }
        },

        finishTimerAction({ state }) {
            clearInterval(state.timer)
        },

        async finishBookingAction({ dispatch, state, commit, rootGetters }, booking) {
            if (!rootGetters['user/isAuth']) return { type: 'error', title: 'Permission denied', message: 'Not authorized' }

            let queryParameters = {
                'api_token': rootGetters['user/getUser'].api_token,
            }
            let newBooking = {
                'id': booking.id,
                'ends_at': dayjs().toString(),
                'booking_status_id': state.statuses.filter((element) => element.order === this.$global.done)[0]?.id, // in_progress
            }
            const response = await this.$axios.put(`bookings/${booking.id}`, newBooking, { params: queryParameters })
            if (response.status === 200 && response.data?.success) {
                booking.ends_at = response.data.data?.ends_at
                booking.booking_status = response.data.data?.booking_status
                commit('UPDATE_BOOKING', booking)
                dispatch('finishTimerAction')
                return { type: 'success', title: 'Finished successfully', message: 'Your booking has been finished successfully' }
            }
            return { type: 'error', title: 'Error', message: response.data?.message }
        },

        resetPaginationAction({ commit }) {
            commit('UPDATE_PAGE', 1)
        },

        incrementPage({ state, commit }) {
            commit('UPDATE_PAGE', ++state.page)
        },

        openNativePaymentAction({ dispatch, state, commit }, bookingId) {
            commit('UPDATE_PAYMENT_LOADING', true)
            state.timer = setInterval(async () => {
                if (document.hasFocus() && state.nativePaymentLoading) {
                    dispatch('getBookingDetailsAction', bookingId)
                }
            }, 1000)
            let adminUrl = this.$global.admin_url.endsWith('/') ? this.$global.admin_url : this.$global.admin_url + '/'
            let features = 'width=600,height=900'
            if (state.selectedPaymentMethod.route === '/PayPal') {
                window.open(`${adminUrl}payments/paypal/express-checkout?booking_id=${bookingId}`, '', features)
            } else if (state.selectedPaymentMethod.route === '/RazorPay') {
                window.open(`${adminUrl}payments/razorpay/checkout?booking_id=${bookingId}`, '', features)
            } else if (state.selectedPaymentMethod.route === '/Stripe') {
                window.open(`${adminUrl}payments/stripe/checkout?booking_id=${bookingId}`, '', features)
            } else if (state.selectedPaymentMethod.route === '/PayStack') {
                window.open(`${adminUrl}payments/paystack/checkout?booking_id=${bookingId}`, '', features)
            } else if (state.selectedPaymentMethod.route === '/PayMongo') {
                window.open(`${adminUrl}payments/paymongo/checkout?booking_id=${bookingId}`, '', features)
            } else if (state.selectedPaymentMethod.route === '/FlutterWave') {
                window.open(`${adminUrl}payments/flutterwave/checkout?booking_id=${bookingId}`, '', features)
            } else if (state.selectedPaymentMethod.route === '/StripeFPX') {
                window.open(`${adminUrl}payments/stripe-fpx/checkout?booking_id=${bookingId}`, '', features)
            }
        },
    },
}
