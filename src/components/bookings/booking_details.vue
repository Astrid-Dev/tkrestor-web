<template>
  <!-- Header -->
  <div class='px-4 py-6 bg-gray-50 sm:px-6'>
    <div class='flex justify-between items-start space-x-3'>
      <div class='space-y-1'>
        <DialogTitle class='text-lg font-medium text-second-color-600'>
          {{ $t('Booking ID #') }}{{ bookingDetails.id }}
        </DialogTitle>
        <p class='text-sm text-gray-500'>
          {{ $t('Status') }} <span
          class='inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-200 text-gray-800'>{{ this.$filters.transString(bookingDetails.booking_status?.status)
          }}</span>
        </p>
        <p class='text-sm text-gray-500'>
          <span class='font-bold'>{{ bookingDetails.address?.description }}</span>
          {{ bookingDetails.address?.address }}
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
    <section aria-labelledby='service-summary'>
      <div class='flex text-sm sm:items-center'>
        <img :alt='this.bookingDetails.e_service?.name' :src='this.$filters.getFirstMediaThumb(this.bookingDetails.e_service)'
             class='flex-none w-24 h-24 rounded-lg border border-gray-200 sm:w-24 sm:h-24' />
        <div class='flex flex-col flex-grow items-stretch px-6 sm:px-8'>
          <div class='flex justify-between'>
            <dt class='text-second-color-600 font-bold'>
              {{ this.$filters.transString(this.bookingDetails.e_service?.name) }}
            </dt>
            <dd class='text-base font-bold text-second-color-600'>
              {{ this.$filters.formatPrice(this.bookingDetails.e_service?.price) }}
            </dd>
          </div>
          <div v-for='option in this.bookingDetails.options' class='flex justify-between'>
            <dt class='text-second-color-600 font-bold'>
              {{ this.$filters.transString(option.name) }}
            </dt>
            <dd class='text-second-color-600'>
              {{ this.$filters.formatPrice(option.price) }}
            </dd>
          </div>
          <div class='flex justify-between'>
            <dt class='text-second-color-600'>
              {{ $t('Quantity') }}
            </dt>
            <dd class='text-base font-bold text-second-color-600'>
              x{{ this.bookingDetails.quantity }}
            </dd>
          </div>
        </div>
      </div>

    </section>
    <section aria-labelledby='summary-heading'>
      <div class='p-6 bg-gray-50 sm:p-8 sm:rounded-lg'>
        <div class='flow-root'>
          <dl class='-my-4 text-sm divide-y divide-gray-200'>
            <div class='flex justify-between items-center py-4'>
              <dt class='text-gray-600'>
                {{ $t('Booking At') }}
              </dt>
              <dd class='font-medium text-second-color-600'>
                {{ this.$filters.formatDate(this.bookingDetails.booking_at) }}
              </dd>
            </div>
            <div class='flex justify-between items-center py-4'>
              <dt class='flex-shrink-0 text-gray-600'>
                {{ $t('Booking Duration') }}
              </dt>
              <dd class='font-bold text-right text-second-color-600'>
                {{ this.$filters.formatDuration(this.bookingDetails.duration) }}
              </dd>
            </div>
            <div class='flex flex-col py-4'>
              <div class='flex justify-between items-center py-0.5'>
                <dt class='text-gray-600'>
                  {{ $t('Start at') }}
                </dt>
                <dd class='font-medium text-second-color-600'>
                  {{ this.$filters.formatDate(this.bookingDetails.start_at) }}
                </dd>
              </div>
              <div class='flex justify-between items-center py-0.5'>
                <dt class='text-gray-600'>
                  {{ $t('End At') }}
                </dt>
                <dd class='font-medium text-second-color-600'>
                  {{ this.$filters.formatDate(this.bookingDetails.ends_at) }}
                </dd>
              </div>
            </div>
            <div class='flex justify-between items-center py-4'>
              <dt class='text-gray-600'>
                {{ $t('Payment') }}
              </dt>
              <dd class='flex font-medium text-second-color-600 gap-2'>
                <span class='px-2.5 py-0.5 rounded-full text-sm bg-gray-200'>
                  {{ bookingDetails.payment ? $t('Paid') : $t('Not Paid') }}</span>
                <span v-if='bookingDetails.payment'
                      class='px-2.5 py-0.5 rounded-full text-sm bg-gray-200'>{{ this.$filters.transString(bookingDetails.payment?.payment_method?.name)
                  }}</span>
              </dd>
            </div>
            <div v-if='this.bookingDetails.hint' class='flex justify-between items-center py-4'>
              <dt class='flex-shrink-0 text-gray-600'>
                {{ $t('A Hint for the Provider') }}
              </dt>
              <dd class='font-medium text-right text-second-color-600'>
                {{ this.bookingDetails.hint }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <section aria-labelledby='summary-heading' class='mt-auto'>
      <div class='p-6 bg-gray-50 sm:p-8 sm:rounded-lg'>
        <div class='flow-root'>
          <dl class='-my-4 text-sm divide-y divide-gray-200'>
            <div v-if='bookingDetails.taxes?.length > 0' class='flex flex-col py-4'>
              <div v-for='tax in this.bookingDetails.taxes' class='flex justify-between items-center py-0.5'>
                <dt class='text-second-color-600'>
                  {{ this.$filters.transString(tax.name) }}
                </dt>
                <dd v-if='tax.type === "percent"' class='font-medium text-second-color-600'>
                  {{ tax.value + '%' }}
                </dd>
                <dd v-else class='font-medium text-second-color-600'>
                  {{ this.$filters.formatPrice(tax.value) }}
                </dd>
              </div>
            </div>
            <div v-if='bookingDetails.taxes?.length > 0' class='flex justify-between items-center py-4'>
              <dt class='text-second-color-600'>
                {{ $t('Tax Amount') }}
              </dt>
              <dd class='font-medium text-second-color-600'>
                {{ this.$filters.formatPrice(this.$filters.getTaxesValue(bookingDetails)) }}
              </dd>
            </div>
            <div class='flex justify-between items-center py-4'>
              <dt class='text-second-color-600'>
                {{ $t('Subtotal') }}
              </dt>
              <dd class='font-medium text-second-color-600'>
                {{ this.$filters.formatPrice(this.$filters.getSubtotal(bookingDetails)) }}
              </dd>
            </div>
            <div v-if='bookingDetails.coupon?.id' class='flex justify-between items-center py-4'>
              <dt class='text-second-color-600'>
                {{ $t('Coupon Discount') }}
              </dt>
              <dd v-if='bookingDetails.coupon?.discount_type === "percent" ' class='font-medium text-second-color-600'>
                -{{ bookingDetails.coupon?.discount }}%
              </dd>
              <dd v-else class='font-medium text-second-color-600'>
                -{{ this.$filters.formatPrice(bookingDetails.coupon?.discount) }}
              </dd>
            </div>
            <div class='flex justify-between items-center py-4'>
              <dt class='text-base font-bold text-second-color-600'>
                {{ $t('Total Amount') }}
              </dt>
              <dd class='text-base font-bold text-second-color-600'>
                {{ this.$filters.formatPrice(this.$filters.getTotal(bookingDetails)) }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
  <!-- Action buttons -->
  <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
    <div class='flex flex-row-reverse justify-between space-x-3'>
      <button v-if='(!bookingDetails["cancel"]) && (bookingDetails.booking_status?.order < this.$global.on_the_way)'
              class=' ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              type='button'
              @click='$router.back()'>
        {{ $t('Cancel') }}
      </button>

      <button v-if='(bookingDetails.booking_status?.order === this.$global.ready)'
              class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
              type='button'
              @click='startBooking(bookingDetails)'>
        {{ $t('Start') }}
      </button>

      <button v-if='(bookingDetails.booking_status?.order === this.$global.in_progress)'
              class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
              type='button'
              @click='finishBooking(bookingDetails)'>
        {{ $t('Finish') }}
      </button>

      <button v-if='(bookingDetails.booking_status?.order === this.$global.done) && (bookingDetails.payment == null)'
              class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
              type='button'
              @click='$router.push({ name: "Booking",params:{id : bookingDetails.id, action:"checkout"} })'>
        {{ $t('Go to checkout') }}
      </button>

      <button v-if='(bookingDetails.booking_status?.order >= this.$global.done) && (bookingDetails.payment != null)'
              class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
              type='button'
              @click='$router.push({ name: "Booking",params:{id : bookingDetails.id, action:"review"} })'>
        {{ $t('Leave Review') }}
      </button>
    </div>
  </div>
</template>

<script>
import { DialogTitle } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import { mapState, mapActions } from 'vuex'


export default {
  name: 'BookingDetails',
  components: {
    DialogTitle,
    XIcon,
  },
  async mounted() {
    await this.getBookingDetailsAction(this.$route.params.id)
  },
  unmounted() {
    this.finishTimerAction()
  },
  computed: {
    ...mapState('booking', {
      bookingDetails: state => state.bookingDetails,
    }),
  },
  methods: {
    ...mapActions('snackbar', ['toggleSnackBarAction']),
    ...mapActions('booking', ['getBookingDetailsAction', 'startBookingAction', 'finishBookingAction', 'finishTimerAction']),
    startBooking(booking) {
      this.startBookingAction(booking).then((result) => {
        this.toggleSnackBarAction(result)
      })
    },
    finishBooking(booking) {
      this.finishBookingAction(booking).then((result) => {
        this.toggleSnackBarAction(result)
      })
    },
  },
}

</script>