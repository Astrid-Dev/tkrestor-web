<template>
  <div class='max-w-7xl mx-auto space-y-8'>
    <BookingsLoader v-if='bookings.length === 0' />
    <div v-for='booking in bookings' :key='booking.id' class='bg-white border-t border-gray-50 shadow-lg sm:rounded-lg'>
      <div class='flex items-center p-4 border-b border-gray-100 sm:p-6 justify-between gap-x-2'>
        <div class='flex-1 text-sm font-medium text-gray-500'>
          <span>{{ $t('Booking ID : #') }}</span>
          <span class='font-bold text-second-color-600'>{{ booking.id }}</span>
        </div>

        <span
          class='inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-200 text-gray-800'>{{ this.$filters.transString(booking.booking_status?.status)
          }}</span>
        <span
          :class='[booking.payment ? "bg-green-200 text-green-800":"bg-gray-200 text-gray-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-200 text-gray-800"]'>{{ booking.payment ? $t('Paid') : $t('Not Paid')
          }}</span>

        <Menu as='div' class='relative flex justify-end lg:hidden'>
          <div class='flex items-center'>
            <MenuButton class='-m-2 p-2 flex items-center text-gray-400 hover:text-gray-500'>
              <DotsVerticalIcon aria-hidden='true' class='w-6 h-6' />
            </MenuButton>
          </div>

          <transition enter-active-class='transition ease-out duration-100' enter-from-class='transform opacity-0 scale-95'
                      enter-to-class='transform opacity-100 scale-100' leave-active-class='transition ease-in duration-75'
                      leave-from-class='transform opacity-100 scale-100' leave-to-class='transform opacity-0 scale-95'>
            <MenuItems class='origin-bottom-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div class='py-1'>
                <MenuItem v-slot='{ active }'>
                  <router-link :class="[active ? 'bg-gray-100 text-second-color-600' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                               :to="{ name: 'Booking', params: { action:'show', id: booking.id }}"
                               as='a'>
                    {{ $t('View Details') }}
                  </router-link>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <div class='hidden lg:flex lg:items-center lg:justify-end lg:space-x-4'>
          <router-link :to="{ name: 'Booking', params: { action:'show', id: booking.id }}"
                       as='a'
                       class='cursor-pointer flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'>
            {{ $t('View Details') }}
          </router-link>
        </div>
      </div>

      <div class='p-4 sm:p-6 flex items-center sm:items-start space-x-4 rtl:space-x-reverse'>
        <div class='flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-20 sm:h-20'>
          <img :alt='booking.e_service?.name' :src='this.$filters.getFirstMediaThumb(booking.e_service)' class='w-full h-full object-center object-cover' />
        </div>
        <div class='flex-1 text-sm'>
          <h5 class='text-base font-bold text-second-color-600'>
            {{ this.$filters.transString(booking.e_service?.name) }}
          </h5>
          <p class='text-gray-500 sm:mt-2'>
            {{ this.$filters.transString(booking.e_provider?.name) }}
          </p>
          <p class='hidden text-gray-500 sm:block sm:mt-2'>
            {{ booking.address?.address }}
          </p>
        </div>
      </div>

      <div class='px-4 sm:px-6 pb-4 sm:pb-6 sm:flex sm:justify-between'>
        <p class='text-sm font-medium text-gray-500'>
          {{ $t('Booking At') }}
          <time :datetime='this.$filters.formatDate(booking.booking_at)'>{{ this.$filters.formatDate(booking.booking_at) }}</time>
        </p>

        <div
          class='mt-6 border-gray-200 flex items-center space-x-4 rtl:space-x-reverse text-sm font-medium sm:mt-0 sm:border-none'>
          <div class='flex-1 flex justify-center'>
            <span class='whitespace-nowrap'>{{ $t('Total') }}</span>
          </div>
          <div class='flex-1 flex justify-center'>
            <span class='font-bold text-sm sm:text-lg text-main-color-600 whitespace-nowrap'>
              {{ this.$filters.formatPrice(this.$filters.getTotal(booking)) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if='bookings.length > 0' class='flex w-full py-8'>
      <button
        class='relative mx-auto px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none'
        type='button'
        @click='this.loadMoreBookings()'>
        {{ $t('Load More...') }}
      </button>
    </div>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { DotsVerticalIcon } from '@heroicons/vue/outline'
import { createNamespacedHelpers } from 'vuex'
import BookingsLoader from './partial/bookings_loader.vue'

const { mapState, mapActions } = createNamespacedHelpers('booking')

export default {
  name: 'BookingsList',
  components: {
    BookingsLoader,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
  },
  computed: {
    ...mapState(['bookings']),
  },

  methods: {
    ...mapActions(['getBookingsAction', 'incrementPage']),

    loadMoreBookings() {
      this.incrementPage()
      this.getBookingsAction()
    },
  },
}
</script>