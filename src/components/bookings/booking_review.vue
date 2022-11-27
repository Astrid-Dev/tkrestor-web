<template>
  <!-- Header -->
  <div class='px-4 py-6 bg-gray-50 sm:px-6'>
    <div class='flex justify-between items-start space-x-3'>
      <div class='space-y-1'>
        <DialogTitle class='text-lg font-medium text-second-color-600'>
          {{ $t('Leave Review for Booking #') }}{{ bookingDetails.id }}

        </DialogTitle>
        <p class='text-sm text-gray-500'>{{ $t('How do you feel this service') }}</p>
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

    <div class='flex overflow-hidden flex-col rounded-lg'>
      <div class='flex-shrink-0'>
        <img :alt='this.$filters.transString(bookingDetails.e_service?.name)' :src='this.$filters.getFirstMediaUrl(bookingDetails.e_service)'
             class='object-cover w-full h-60' />
      </div>
      <div class='flex flex-col items-center text-center justify-between px-4 py-4 bg-gray-50'>

        <router-link :to='{name:"EService",params:{id:1}}' class='mt-2'>
          <p class='text-lg font-semibold text-second-color-600'>
            {{ this.$filters.transString(bookingDetails.e_service?.name) }}
          </p>
          <p class='mt-2 text-sm text-gray-500'>
            {{ this.$filters.stripHtml(bookingDetails.e_service?.description) }}
          </p>
        </router-link>
        <div class='my-4 flex items-center'>
          <StarIcon v-for='rating in 5' :key='rating'
                    :class="[this.rate >= rating ? 'text-yellow-400' : 'text-gray-300', 'h-9 w-9 flex-shrink-0 cursor-pointer']" aria-hidden='true'
                    @mouseenter='updateRateAction(rating)' />
        </div>

      </div>

    </div>
    <div class='flex flex-col items-center text-center justify-between'>
      <div class='mt-1 w-full'>
        <textarea id='comment'
                  :placeholder='$t("Tell us somethings about this service")'
                  :value='this.review'
                  class='shadow-sm focus:ring-main-color-500 focus:border-main-color-500 block  w-full sm:text-sm border-gray-300 rounded-md py-3 px-4'
                  name='comment' rows='6'
                  @input='updateReview' />
      </div>
    </div>
  </div>

  <!-- Action buttons -->
  <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
    <div class='flex justify-between space-x-3'>

      <button
        class='inline-flex justify-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        type='button'
        @click='$router.back()'>
        <ChevronLeftIcon aria-hidden='true' class='w-5 h-5 mr-2' />
        {{ $t('Back') }}
      </button>
      <button
        class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        type='button'
        @click='addReview()'>
        {{ $t('Add Your Review') }}
      </button>
    </div>
  </div>
</template>

<script>
import { DialogTitle } from '@headlessui/vue'
import { ChevronLeftIcon, XIcon } from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'
import { mapActions, mapState } from 'vuex'


export default {
  name: 'BookingReview',
  components: {
    DialogTitle,
    XIcon,
    ChevronLeftIcon,
    StarIcon,
  },
  computed: {
    ...mapState('booking', {
      bookingDetails: state => state.bookingDetails,
      rate: state => state.review.rate,
      review: state => state.review.review,
    }),
  },
  methods: {
    ...mapActions('snackbar', ['toggleSnackBarAction']),
    ...mapActions('booking', ['getBookingDetailsAction', 'updateRateAction', 'updateReviewAction', 'addReviewAction']),
    updateReview(e) {
      this.updateReviewAction(e.target.value)
    },
    addReview() {
      this.addReviewAction().then((result) => {
        if (result.type === 'success') {
          this.$router.push({ name: 'Booking', params: { action: 'show', id: this.$route.params.id } })
        }
        this.toggleSnackBarAction(result)
      })
    },
  },
}

</script>