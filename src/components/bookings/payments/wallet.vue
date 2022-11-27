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
  <!-- Details -->
  <div class='flex flex-col flex-1 gap-4 w-full text-base text-left sm:my-8 sm:px-6 lg:px-8'>

    <div class='mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100'>
      <CheckIcon aria-hidden='true' class='h-12 w-12 text-green-600' />
    </div>
    <div class='mt-3 text-center sm:mt-5'>
      <h3 class='text-lg leading-6 font-bold text-second-color-600'>
        {{ $t('Payment is pending confirmation') }}
      </h3>
      <div class='mt-2'>
        <p class='text-sm text-gray-500'>
          {{ $t('Your payment is pending confirmation from the Service Provider') }}
        </p>
      </div>
    </div>

  </div>

  <!-- Action buttons -->
  <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
    <div class='flex justify-between space-x-3'>
      <button
        class='inline-flex justify-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        type='button'
        @click='$router.push({ name: "Bookings" })'>
        <ChevronLeftIcon aria-hidden='true' class='w-5 h-5 mr-2' />
        {{ $t('Close') }}
      </button>
      <button
        class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        type='button'
        @click='$router.push({ name: "Booking", params:{ action:"show", id: this.$route.params.id} })'>
        {{ $t('Show Booking Details') }}
      </button>
    </div>
  </div>
</template>

<script>
import { DialogTitle } from '@headlessui/vue'
import { CheckIcon, ChevronLeftIcon, XIcon } from '@heroicons/vue/outline'
import { mapState, mapActions } from 'vuex'


export default {
  name: 'Wallet',
  components: {
    DialogTitle,
    XIcon,
    CheckIcon,
    ChevronLeftIcon,
  },
  async mounted() {
    await this.addWalletPaymentAction(this.bookingDetails)
  },
  computed: {
    ...mapState('booking', {
      bookingDetails: state => state.bookingDetails,
    }),
  },
  methods: {
    ...mapActions('snackbar', ['toggleSnackBarAction']),
    ...mapActions('booking', ['addWalletPaymentAction', 'getBookingDetailsAction']),
  },
}

</script>