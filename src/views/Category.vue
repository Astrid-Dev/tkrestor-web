<template>
  <Heading :category='this.$filters.transString(category.name)' />
  <div class='bg-white'>
    <div
      class='my-14 max-w-3xl mx-auto grid grid-cols-1 gap-10 px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4'>
      <nav class='sm:pt-6 lg:col-start-1 lg:col-span-1'>
        <GeneralFilter />
        <PriceFilter />
      </nav>
      <div class='lg:col-start-2 lg:col-span-3'>
        <EServicesGrid :eServices='eServicesOfCategory' />
        <div v-if='eServicesOfCategory.length > 0' class='flex w-full py-12'>
          <button
            class='relative mx-auto px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none'
            type='button'
            @click='this.loadMoreEService()'>
            {{ $t('Load More...') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '../components/category/heading.vue'
import GeneralFilter from '../components/category/general_filter.vue'
import EServicesGrid from '../components/category/e_services_grid.vue'
import PriceFilter from '../components/category/price_filter.vue'
import { mapState, mapActions } from 'vuex'
import { FILTER_AVAILABILITY, FILTER_FEATURED, FILTER_POPULAR, FILTER_RATING } from '../utils/const'

export default {
  components: {
    Heading,
    EServicesGrid,
    GeneralFilter,
    PriceFilter,
  },

  watch: {
    $route() {
      this.resetPagination()
      this.loadEServices()
    },
  },
  mounted() {
    this.resetPagination()
    this.loadEServices()
    this.getCategoryAction(this.$route.params.id)
  },

  computed: {
    ...mapState('eService', {
      eServicesOfCategory: state => state.eServicesOfCategory,
    }),
    ...mapState('category', {
      category: state => state.category,
    }),

  },
  methods: {
    ...mapActions('eService', ['resetPagination', 'incrementPage', 'getEServicesOfCategoryAction', 'getAvailableEServicesOfCategoryAction', 'getMostRatedEServicesOfCategoryAction', 'getFeaturedEServicesOfCategoryAction']),
    ...mapActions('category', ['getCategoryAction']),
    loadEServices() {
      if (this.$route.params.sort === FILTER_AVAILABILITY)
        this.getAvailableEServicesOfCategoryAction({ categoryId: this.$route.params.id, priceFilter: this.$route.params.price })
      else if (this.$route.params.sort === FILTER_RATING)
        this.getMostRatedEServicesOfCategoryAction({ categoryId: this.$route.params.id, priceFilter: this.$route.params.price })
      else if (this.$route.params.sort === FILTER_FEATURED)
        this.getFeaturedEServicesOfCategoryAction({ categoryId: this.$route.params.id, priceFilter: this.$route.params.price })
      else if (this.$route.params.sort === FILTER_POPULAR)
        this.getMostRatedEServicesOfCategoryAction({ categoryId: this.$route.params.id, priceFilter: this.$route.params.price })
      else {
        this.getEServicesOfCategoryAction({ categoryId: this.$route.params.id, priceFilter: this.$route.params.price })
      }
    },
    loadMoreEService() {
      this.incrementPage()
      this.loadEServices()
    },
  },
}
</script>
