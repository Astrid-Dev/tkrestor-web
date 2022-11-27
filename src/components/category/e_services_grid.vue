<template>
  <EmptyEServicesGrid v-if='eServices.length === 0' height='h-96' />
  <div class='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
    <EServiceItemLoader v-for='eService in 6' v-if='eServices.length === 0' :key='eService' />
    <EServiceItem v-for='eService in eServices' v-else :key='eService.id' :eService='eService' />
  </div>
</template>
<script>
import EServiceItem from './partials/e_service_item.vue'
import EServiceItemLoader from './loaders/e_service_item_loader.vue'
import EmptyEServicesGrid from './partials/empty_e_services_grid.vue'

export default {
  components: {
    EmptyEServicesGrid,
    EServiceItemLoader,
    EServiceItem,
  },
  props: ['eServices'],
}
</script>