<template>
  <Heading />
  <div class='bg-white'>
    <div class='my-14 max-w-3xl mx-auto grid grid-cols-1 gap-20 px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
      <div class='sm:pt-6 space-y-6 lg:col-start-1 lg:col-span-1'>
        <BookingStatuses />
      </div>
      <div class='lg:col-start-2 lg:col-span-2 divide-y-2 divide-gray-200'>
        <BookingsList />
      </div>
    </div>
    <Booking />
  </div>
</template>

<script>
import Heading from '../components/bookings/heading.vue'
import BookingStatuses from '../components/bookings/statuses.vue'
import BookingsList from '../components/bookings/bookings_list.vue'
import Booking from '../components/bookings/booking.vue'

export default {
  name: 'Bookings',
  components: {
    Booking,
    BookingsList,
    Heading,
    BookingStatuses,
  },
}
</script>
