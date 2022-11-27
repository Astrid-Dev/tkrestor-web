<template>
  <Divider :divider-label='$t("Sort Services By")' class='mb-4' />
  <GeneralFilterLoader v-if='generalFilter.length === 0' />
  <router-link v-for='filter in generalFilter' :key='filter.id'
               :class="[filter.id === $route.params.sort ? 'bg-gray-100 font-semibold text-second-color-600' : 'text-gray-600 hover:bg-gray-50 hover:text-second-color-600', 'group flex items-center px-3 py-2 my-1 font-medium rounded-md cursor-pointer']"
               :to='{name:"Category", params:{id:$route.params.id, sort:filter.id, price:$route.params.price, review:$route.params.review}}'>
      <span class='truncate'>
        {{ $t(filter.name) }}
      </span>
  </router-link>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import GeneralFilterLoader from './loaders/general_filter_loader.vue'
import Divider from './partials/divider.vue'

const { mapState } = createNamespacedHelpers('category')
export default {
  components: {
    GeneralFilterLoader,
    Divider,
  },
  computed: {
    ...mapState(['generalFilter']),
  },
}
</script>