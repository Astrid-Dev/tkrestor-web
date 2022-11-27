<template>
  <Divider class='mb-4 mt-8' divider-label='Filter By Reviews' />
  <ReviewFilterLoader v-if='reviewFilter.length === 0' />
  <router-link v-for='(filter, filterIdx) in reviewFilter' :key='filter.star'
               :class="[filter.star?.toString() === $route.params.review ? 'bg-gray-100 font-semibold text-second-color-600' : 'text-gray-600 hover:bg-gray-50 hover:text-second-color-600', 'group flex items-center px-3 py-2 font-medium rounded-md cursor-pointer']"
               :to='{name:"Category", params:{id:$route.params.id, sort:$route.params.sort, price:$route.params.price, review:filter.star}}'>
    <div class='flex-shrink-0 flex'>
      <span v-if='filter.star === "all"' class='truncate'>All</span>
      <StarIcon v-for='rating in [0, 1, 2, 3, 4]' v-else :key='rating' :class="[filter.star > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5']"
                aria-hidden='true'
                as='span' />
    </div>
  </router-link>
</template>

<script>
import { StarIcon } from '@heroicons/vue/solid'
import { createNamespacedHelpers } from 'vuex'
import ReviewFilterLoader from './loaders/review_filter_loader.vue'
import Divider from './partials/divider.vue'

const { mapState, mapActions } = createNamespacedHelpers('category')

export default {
  components: {
    ReviewFilterLoader,
    Divider,
    StarIcon,

  },
  computed: {
    ...mapState(['reviewFilter']),
  },
}
</script>