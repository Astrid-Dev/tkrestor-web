<template>
  <Popover v-slot='{ open }' class='relative w-6 h-6'>
    <PopoverButton :class="[open ? 'text-second-color-900' : 'text-second-color-500', 'group text-sm hover:text-second-color-600 focus:outline-none']">
      <BellIcon :class="[open ? 'text-second-color-900' : 'text-second-color-500', 'h-6 w-6 group-hover:text-second-color-900']" aria-hidden='true' />
    </PopoverButton>

    <transition enter-active-class='transition duration-200 ease-out' enter-from-class='opacity-0 translate-y-1' enter-to-class='opacity-100 translate-y-0'
                leave-active-class='transition duration-150 ease-in' leave-from-class='opacity-100 translate-y-0' leave-to-class='opacity-0 translate-y-1'>
      <PopoverPanel v-slot='{ close }'
                    class='absolute rtl:left-auto rtl:right-full left-full z-10 px-2 mt-3 w-screen max-w-xs transform rtl:translate-x-full -translate-x-full sm:px-0'>
        <div class='bg-white rounded-lg ring-1 ring-black ring-opacity-5 shadow-lg'>
          <ul
            class='overflow-y-scroll h-96 divide-y divide-accent-color-50 scrollbar scrollbar-thumb-accent-color-400 scrollbar-thin scrollbar-track-accent-color-50 overflow-y-scroll scrollbar-thumb-rounded-full'
            role='list'>
            <li v-for='notification in this.notifications' :key='notification.id' class='py-5 px-6 hover:bg-gray-50 cursor-pointer'
                @click='markAsReadNotification(notification)'>
              <div class='flex justify-between items-center space-x-3'>
                <div class='min-w-0 flex-1'>
                  <BellIcon aria-hidden='true' class='text-second-color-50 h-5 w-5 group-hover:text-second-color-900' />
                </div>
                <time :datetime='notification.created_at' class='flex-shrink-0 whitespace-nowrap text-xs text-second-color-400'>
                  {{ this.$filters.formatDate(notification.created_at) }}
                </time>
              </div>

              <p :class='[notification.read_at ? "text-second-color-500":"font-bold text-second-color-600","mt-2 line-clamp-2 text-sm "]'
                 v-html='$t(notification.type, { booking_id: notification.data?.booking_id, from: notification.data?.from } )'>
              </p>

            </li>
            <li class='py-5 flex items-center px-6 cursor-pointer'>
              <button
                class='mx-auto px-6 py-1 border text-base font-medium rounded-md text-second-color-400 bg-white hover:bg-accent-color-50 focus:outline-none'
                type='button'
                @click='this.loadMoreNotifications()'>
                {{ $t('Load More...') }}
              </button>
            </li>
          </ul>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/outline'
import { mapState, mapActions, mapGetters } from 'vuex'


export default {
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    BellIcon,
  },

  mounted() {
    this.getNotificationsAction()
  },
  computed: {
    ...mapState('notification', {
      notifications: state => state.notifications,
    }),
  },
  methods: {
    ...mapActions('notification', ['getNotificationsAction', 'incrementPageAction', 'markAsReadNotification']),
    loadMoreNotifications() {
      this.incrementPageAction()
      this.getNotificationsAction()
    },
  },
}
</script>