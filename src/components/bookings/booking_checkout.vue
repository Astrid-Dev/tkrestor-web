<template>
  <!-- Header -->
  <div class='px-4 py-6 bg-gray-50 sm:px-6'>
    <div class='flex justify-between items-start space-x-3'>
      <div class='space-y-1'>
        <DialogTitle class='text-lg font-medium text-second-color-600'>
          {{ $t('Checkout Booking #') }}{{ bookingDetails.id }}
        </DialogTitle>
        <p class='text-sm text-gray-500'>
          {{ $t('Select your preferred payment mode') }}
        </p>
      </div>
      <div class='flex items-center h-7'>
        <button class='text-gray-400 hover:text-gray-500' type='button' @click='$router.push({ name: "Bookings" })'>
          <XIcon aria-hidden='true' class='w-6 h-6' />
        </button>
      </div>
    </div>
  </div>
  <!-- Details -->
  <div class='flex flex-col flex-1 gap-8 w-full text-base text-left sm:py-8 sm:px-6 lg:px-8 min-h-0 overflow-y-scroll'>
    <PaymentMethodsLoader v-if='paymentMethods.length === 0' />
    <RadioGroup v-else>
      <div class='relative bg-white'>
        <RadioGroupOption v-for='paymentMethod in paymentMethods' :key='paymentMethod.id' as='template'
                          @click='this.selectPaymentMethodAction(paymentMethod)'>
          <div
            :class="[ paymentMethod.id === this.selectedPaymentMethod.id ? 'bg-main-color-100' : ' ', 'relative bg-gray-50 p-4 flex justify-between rounded-lg cursor-pointer mb-2 md:pl-4 md:pr-6 focus:outline-none']">
            <div class='flex items-center text-sm'>
              <span
                :class="[paymentMethod.id === this.selectedPaymentMethod.id ? 'bg-main-color-600 border-transparent' : 'bg-white border-gray-300', 'h-6 w-6 rounded-full border flex items-center justify-center']"
                aria-hidden='true'>
                <span class='rounded-full bg-white w-2 h-2' />
              </span>
              <div class='mx-4'>
                <RadioGroupLabel :class="[paymentMethod.id === this.selectedPaymentMethod.id ? 'text-main-color-600' : 'text-second-color-600', 'font-bold']"
                                 as='span'>
                  {{ this.$filters.transString(paymentMethod.name) }}
                </RadioGroupLabel>
                <RadioGroupDescription as='div'>
                <span
                  :class="[paymentMethod.id === this.selectedPaymentMethod.id ? 'text-main-color-600' : 'text-second-color-600']">{{ this.$filters.transString(paymentMethod.description)
                  }} </span>
                </RadioGroupDescription>
              </div>
            </div>
            <img :alt='this.$filters.transString(paymentMethod.name)' :src='this.$filters.getFirstMediaThumb(paymentMethod)' class='w-16 h-16 rounded-xl'>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>

  <!-- Action buttons -->
  <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
    <div class='flex justify-between space-x-3'>

      <button
        class='inline-flex justify-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        type='button'
        @click='$router.push({ name: "Booking",params:{id : bookingDetails.id, action:"show"} })'>
        <ChevronLeftIcon aria-hidden='true' class='w-5 h-5 mr-2' />
        {{ $t('Back') }}
      </button>
      <router-link v-if='["/Cash","/Wallet"].indexOf(selectedPaymentMethod.route) >= 0'
                   :disabled='selectedPaymentMethod.id === undefined'
                   :to='{ name: selectedPaymentMethod.route ,params:{id : bookingDetails.id || 0, action: "payment"} }'
                   class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500 disabled:opacity-60'
                   type='button'>
        {{ $t('Confirm & Pay Now') }}
      </router-link>
      <router-link v-if='["/Cash","/Wallet"].indexOf(selectedPaymentMethod.route) === -1'
                   :disabled='selectedPaymentMethod.id === undefined'
                   :to='{ name: "Native" ,params:{id : bookingDetails.id || 0, action: "payment"} }'
                   class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500 disabled:opacity-60'
                   type='button'>
        {{ $t('Confirm & Pay Now') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { DialogTitle, RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { XIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import PaymentMethodsLoader from './partial/payment_methods_loader.vue'
import { mapActions, mapState } from 'vuex'


export default {
  name: 'BookingCheckout',
  components: {
    PaymentMethodsLoader,
    DialogTitle,
    XIcon,
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
    ChevronLeftIcon,
  },
  async mounted() {
    await this.getBookingDetailsAction(this.$route.params.id)
    this.getPaymentMethodsAction()
    this.getWalletsAction()
  },
  computed: {
    ...mapState('booking', {
      bookingDetails: state => state.bookingDetails,
      paymentMethods: state => state.paymentMethods,
      selectedPaymentMethod: state => state.selectedPaymentMethod,
    }),
  },
  methods: {
    ...mapActions('snackbar', ['toggleSnackBarAction']),
    ...mapActions('booking', ['getPaymentMethodsAction', 'selectPaymentMethodAction', 'getBookingDetailsAction', 'getWalletsAction']),
  },
}

</script>