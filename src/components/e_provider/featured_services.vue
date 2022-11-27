<template>
  <Loader v-if='eProviderFeaturedEServices.length === 0' height='h-96' />
  <div v-else class='px-8 sm:px-0 flex items-center justify-between'>
    <div class='flex-1 min-w-0'>
      <h2 class='py-3 text-xl font-bold tracking-tight'>{{ $t('Featured Services') }}</h2>
    </div>
    <button
      class='inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-main-color-600 rounded-md border border-transparent shadow-sm hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
      type='button'>
      {{ $t('View All') }}
    </button>
  </div>
  <div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-8 gap-y-12'>
    <EServiceItem v-for='eService in eProviderFeaturedEServices' :key='eService.id' :eService='eService' />
  </div>
</template>

<script>
import EServiceItem from './partial/e_service_item.vue'
import { createNamespacedHelpers } from 'vuex'
import Loader from '../partial/loader.vue'

const { mapState, mapActions } = createNamespacedHelpers('eProvider')

export default {
  name: 'FeaturedServices',
  components: {
    EServiceItem,
    Loader,
  },
  mounted() {
    this.getEProviderFeaturedEServices(this.$route.params.id)
  },
  computed: {
    ...mapState(['eProviderFeaturedEServices']),
  },
  methods: {
    ...mapActions(['getEProviderFeaturedEServices']),
  },
}
</script>