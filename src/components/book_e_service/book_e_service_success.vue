<template>
  <div class='flex flex-col flex-1 gap-4 w-full text-base text-left sm:my-8 sm:px-6 lg:px-8'>

    <div class='mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100'>
      <CheckIcon aria-hidden='true' class='h-12 w-12 text-green-600' />
    </div>
    <div class='mt-3 text-center sm:mt-5'>
      <h3 class='text-lg leading-6 font-bold text-green-600'>
        {{ $t('Booking successful') }}
      </h3>
      <div class='mt-10'>
        <p class='font-bold text-second-color-400'>
          {{ $t('Your Booking ID #') }}{{ booking.id }}
        </p>
        <p class='text-sm text-second-color-400'>
          {{ $t('We have received your request, your service provider will get in touch soon') }}
        </p>
      </div>
    </div>

  </div>

  <!-- Action buttons -->
  <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
    <div class='flex justify-end space-x-3 rtl:space-x-reverse'>
      <button
        class='px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        type='button'
        @click='$router.push({name:"EService"})'>
        {{ $t('Close') }}
      </button>
      <button
        class='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-main-color-600 rounded-md border border-transparent shadow-sm hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
        dir='ltr'
        type='button'
        @click='$router.push({name:"Booking",params:{action:"show",id: booking.id}})'>
        {{ $t('Go to Booking Details') }}
        <ChevronRightIcon aria-hidden='true' class='-mr-1 ml-3 w-5 h-5' />
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon, CheckIcon } from '@heroicons/vue/outline'
import { mapActions, mapState } from 'vuex'


export default {
  name: 'BookingSuccess',
  components: {
    ChevronRightIcon,
    CheckIcon,
  },
  setup() {
  },
  computed: {
    ...mapState('bookEService', {
      booking: state => state.booking,
    }),
  },
  methods: {
    ...mapActions('bookEService', []),
  },
}

</script>