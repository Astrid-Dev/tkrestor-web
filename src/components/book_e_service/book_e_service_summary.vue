<template>
  <div class='flex flex-col flex-1 gap-8 w-full text-base text-left sm:my-8 sm:px-6 lg:px-8'>
    <section aria-labelledby='summary-heading'>
      <div class='p-6 bg-gray-50 sm:p-8 sm:rounded-lg'>
        <div class='flow-root'>
          <dl class='-my-4 text-sm divide-y divide-gray-200'>
            <div class='flex justify-between items-center py-4'>
              <dt class='text-second-color-600'>
                {{ $t('Booking At') }}
              </dt>
              <dd class='font-medium text-second-color-600'>
                {{ this.$filters.formatDate(this.booking.booking_at) }}
              </dd>
            </div>
            <div class='flex justify-between items-center py-4 gap-10'>
              <dt class='flex-shrink-0 text-second-color-600'>
                {{ $t('Your Address') }}
              </dt>
              <dd class='font-medium text-right text-second-color-600'>
                {{ this.booking.address.description }}
                <div class='text-xs text-second-color-400'>{{ this.booking.address.address }}</div>
              </dd>
            </div>
            <div v-if='this.booking.hint !== undefined' class='flex justify-between items-center py-4'>
              <dt class='flex-shrink-0 text-second-color-600'>
                {{ $t('A Hint for the Provider') }}
              </dt>
              <dd class='font-medium text-right text-second-color-600'>
                {{ this.booking.hint }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <section aria-labelledby='service-summary'>
      <div class='flex text-sm sm:items-center'>
        <img :alt='this.booking.e_service?.name' :src='this.$filters.getFirstMediaThumb(this.booking.e_service)'
             class='flex-none w-24 h-24 rounded-lg border border-gray-200 sm:w-24 sm:h-24' />
        <div class='flex flex-col flex-grow items-stretch px-6 sm:px-8'>
          <div class='flex justify-between'>
            <dt class='text-second-color-600 font-bold'>
              {{ this.$filters.transString(this.booking.e_service?.name) }}
            </dt>
            <dd class='text-base font-bold text-second-color-600'>
              {{ this.$filters.formatPrice(this.booking.e_service?.price) }}
            </dd>
          </div>
          <div v-for='option in this.booking.options' class='flex justify-between'>
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
              x{{ this.booking.quantity }}
            </dd>
          </div>
        </div>
      </div>

    </section>
    <section aria-labelledby='summary-heading' class='mt-auto'>
      <div class='p-6 bg-gray-50 sm:p-8 sm:rounded-lg'>
        <div class='flow-root'>
          <dl class='-my-4 text-sm divide-y divide-gray-200'>
            <div v-if='this.booking.taxes.length > 0' class='flex flex-col py-4'>
              <div v-for='tax in this.booking.taxes' class='flex justify-between items-center py-0.5'>
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
            <div v-if='this.booking.taxes.length > 0' class='flex justify-between items-center py-4'>
              <dt class='text-second-color-600'>
                {{ $t('Tax Amount') }}
              </dt>
              <dd class='font-medium text-second-color-600'>
                {{ this.$filters.formatPrice(this.$filters.getTaxesValue(booking)) }}
              </dd>
            </div>
            <div class='flex justify-between items-center py-4'>
              <dt class='text-second-color-600'>
                {{ $t('Subtotal') }}
              </dt>
              <dd class='font-medium text-second-color-600'>
                {{ this.$filters.formatPrice(this.$filters.getSubtotal(booking)) }}
              </dd>
            </div>
            <div v-if='booking.coupon.id' class='flex justify-between items-center py-4'>
              <dt class='text-second-color-600'>
                {{ $t('Coupon Discount') }}
              </dt>
              <dd v-if='booking.coupon.discount_type === "percent" ' class='font-medium text-second-color-600'>
                -{{ booking.coupon.discount }}%
              </dd>
              <dd v-else class='font-medium text-second-color-600'>
                -{{ this.$filters.formatPrice(booking.coupon.discount) }}
              </dd>
            </div>
            <div class='flex justify-between items-center py-4'>
              <dt class='text-base font-bold text-second-color-600'>
                {{ $t('Total Amount') }}
              </dt>
              <dd class='text-base font-bold text-second-color-600'>
                {{ this.$filters.formatPrice(this.$filters.getTotal(booking)) }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>

  <!-- Action buttons -->
  <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
    <div class='flex justify-end space-x-3 rtl:space-x-reverse'>
      <button
        class='px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        type='button'
        @click='$router.push({name:"EService"})'>
        {{ $t('Cancel') }}
      </button>
      <button
        class='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-main-color-600 rounded-md border border-transparent shadow-sm hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        dir='ltr'
        type='button'
        @click='addBooking(booking)'>
        {{ $t('Confirm & Booking Now') }}
        <ChevronRightIcon aria-hidden='true' class='-mr-1 ml-3 w-5 h-5' />
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from '@heroicons/vue/outline'
import { mapActions, mapState, mapGetters } from 'vuex'


export default {
  name: 'BookingSummary',
  components: {
    ChevronRightIcon,
  },
  computed: {
    ...mapState('bookEService', {
      booking: state => state.booking,
    }),
    ...mapGetters('bookEService', [
      'canMakeBooking',
    ]),

  },
  methods: {
    ...mapActions('bookEService', ['updateEServiceAction', 'addBookingAction']),
    ...mapActions('snackbar', ['toggleSnackBarAction']),
    addBooking(booking) {
      this.addBookingAction(booking).then(result => {
        if (result.type === 'success') {
          this.$router.push({ name: 'BookEService', params: { action: 'success', id: this.$route.params.id } })
        }
        this.toggleSnackBarAction(result)

      })
    },
  },
}

</script>