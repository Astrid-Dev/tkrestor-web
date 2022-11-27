<template>
  <CategoriesLoader v-if='statuses.length === 0' />
  <nav v-else aria-label='Sidebar' class='space-y-1'>
    <a v-for='item in statuses' :key='item.id' :aria-current="item.current ? 'page' : undefined"
       :class="[item.current ? 'bg-gray-100 font-semibold text-second-color-600' : 'text-gray-600 hover:bg-gray-50 hover:text-second-color-600', 'group flex items-center px-3 py-2 font-medium rounded-md cursor-pointer']"
       @click='getBookings(item)'>
      <span class='truncate'>
        {{ this.$filters.transString(item.status) }}
      </span>
    </a>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import CategoriesLoader from './partial/categories_loader.vue'

const { mapState, mapActions } = createNamespacedHelpers('booking')

export default {
  name: 'BookingStatuses',
  components: {
    CategoriesLoader,
  },
  computed: {
    ...mapState(['statuses']),
  },

  async mounted() {
    await this.getStatusesAction()
    this.getBookingsAction()

  },
  methods: {
    ...mapActions(['getBookingsAction', 'getStatusesAction', 'selectStatusAction', 'resetPaginationAction']),
    getBookings(status) {
      this.resetPaginationAction()
      this.selectStatusAction(status)
      this.getBookingsAction()
    },
  },
}
</script>