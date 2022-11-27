<template>
  <!-- Header -->
  <div class='px-4 py-6 bg-gray-50 sm:px-6'>
    <div class='flex justify-between items-start space-x-3'>
      <div class='space-y-1'>
        <DialogTitle class='text-lg font-medium text-second-color-600'>
          {{ $t('Booking #') }}{{ this.$route.params.id }}
        </DialogTitle>
      </div>
      <div class='flex items-center h-7'>
        <button class='text-gray-400 hover:text-gray-500' type='button' @click='$router.push({ name: "Bookings" })'>
          <XIcon aria-hidden='true' class='w-6 h-6' />
        </button>
      </div>
    </div>
  </div>
  <!-- if done-->
  <div v-if='!this.nativePaymentLoading && this.bookingDetails.payment' class='flex flex-col flex-1 gap-4 w-full text-base text-left sm:my-8 sm:px-6 lg:px-8'>
    <div class='flex justify-center items-center mx-auto w-24 h-24 bg-green-100 rounded-full'>
      <CheckIcon aria-hidden='true' class='w-12 h-12 text-green-600' />
    </div>
    <div class='mt-3 text-center sm:mt-5'>
      <h3 class='text-lg font-bold leading-6 text-second-color-600'>
        {{ $t('Payment successful.') }}
      </h3>
      <div class='mt-2'>
        <p class='text-sm text-gray-500'>
          {{ $t('Your payment was processed successfully.') }}
        </p>
      </div>
    </div>
  </div>

  <!-- if loading -->
  <div v-if='this.nativePaymentLoading && !this.bookingDetails.payment' class='flex flex-col flex-1 gap-4 w-full text-base text-left sm:my-8 sm:px-6 lg:px-8'>
    <div v-if='this.nativePaymentLoading' class='flex justify-center items-center mx-auto w-24 h-24 bg-yellow-100 rounded-full'>
      <RefreshIcon aria-hidden='true' class='w-12 h-12 text-yellow-600' />
    </div>
    <div class='mt-3 text-center sm:mt-5'>
      <h3 class='text-lg font-bold leading-6 text-second-color-600'>
        {{ $t('Waiting for payment.') }}
      </h3>
      <div class='mt-2'>
        <p class='text-sm text-gray-500'>
          {{ $t('Please complete the payment process.') }}
        </p>
      </div>
    </div>
    <!--    if loading done-->
  </div>

  <!-- if error-->
  <div v-if='!this.nativePaymentLoading && !this.bookingDetails.payment' class='flex flex-col flex-1 gap-4 w-full text-base text-left sm:my-8 sm:px-6 lg:px-8'>
    <div class='flex justify-center items-center mx-auto w-24 h-24 bg-red-100 rounded-full'>
      <XIcon aria-hidden='true' class='w-12 h-12 text-red-600' />
    </div>
    <div class='mt-3 text-center sm:mt-5'>
      <h3 class='text-lg font-bold leading-6 text-second-color-600'>
        {{ $t('Error when processing your payment.') }}
      </h3>
      <div class='mt-2'>
        <p class='text-sm text-gray-500'>
          {{ $t('Unfortunately there was an error while processing your payment.') }}
        </p>
      </div>
    </div>
  </div>

  <!-- Action buttons -->
  <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
    <div class='flex justify-between space-x-3'>

      <button
        class='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        type='button'
        @click='$router.push({ name: "Bookings" })'>
        <ChevronLeftIcon aria-hidden='true' class='mr-2 w-5 h-5' />
        {{ $t('Close') }}
      </button>
      <button
        class='inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        type='button'
        @click='$router.push({ name: "Booking", params:{ action:"show", id: this.$route.params.id} })'>
        {{ $t('Show Booking Details') }}
      </button>
    </div>
  </div>
</template>

<script>
import { DialogTitle } from '@headlessui/vue'
import { CheckIcon, ChevronLeftIcon, XIcon, RefreshIcon } from '@heroicons/vue/outline'
import { mapState, mapActions } from 'vuex'


export default {
  name: 'Native',
  components: {
    DialogTitle,
    XIcon,
    CheckIcon,
    ChevronLeftIcon,
    RefreshIcon,
  },
  async mounted() {
    this.openNativePaymentAction(this.$route.params.id)
  },
  unmounted() {
    this.finishTimerAction()
  },
  computed: {
    ...mapState('booking', {
      selectedPaymentMethod: state => state.selectedPaymentMethod,
      nativePaymentLoading: state => state.nativePaymentLoading,
      bookingDetails: state => state.bookingDetails,
    }),
  },
  methods: {
    ...mapActions('snackbar', ['toggleSnackBarAction']),
    ...mapActions('booking', ['openNativePaymentAction', 'getBookingDetailsAction', 'finishTimerAction']),
  },
}

</script>