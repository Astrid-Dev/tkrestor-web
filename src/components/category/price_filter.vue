<template>
  <Divider :divider-label='$t("Filter By Price")' class='mb-4 mt-8' />
  <PriceFilterLoader v-if='priceFilter.length === 0' />
  <router-link v-for='(filter, filterIdx) in priceFilter' :key='filter.id'
               :class="[filter.id.toString() === $route.params.price ? 'bg-gray-100 font-semibold text-second-color-600' : 'text-gray-600 hover:bg-gray-50 hover:text-second-color-600', 'group flex items-center px-3 py-2 my-1 font-medium rounded-md cursor-pointer']"
               :to='{name:"Category", params:{id:$route.params.id, sort:$route.params.sort, price:filter.id, review:$route.params.review}}'>
      <span v-if='filterIdx > 0' class='truncate'>
        {{ this.$filters.formatPrice(filter.from) }} - {{ this.$filters.formatPrice(filter.to) }}
      </span>
    <span v-else class='truncate'>
        {{ $t('All') }}
      </span>
  </router-link>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import PriceFilterLoader from './loaders/price_filter_loader.vue'
import Divider from './partials/divider.vue'

const { mapState, mapActions } = createNamespacedHelpers('category')
export default {
  components: {
    PriceFilterLoader,
    Divider,
  },
  computed: {
    ...mapState(['priceFilter']),
  },
}
</script>