<template>
  <section>
    <Loader v-if='eProviderAwards.length === 0' height='h-96' />
    <div v-else class='overflow-hidden p-8 bg-white rounded-lg divide-y divide-gray-100 shadow-lg'>
      <h2 class='pb-4 text-xl font-bold text-second-color-600 truncate'>{{ $t('Awards') }}</h2>
      <div v-for='award in eProviderAwards' :key='award.id' class='relative items-center py-3'>
        <p class='text-sm font-bold text-second-color-600'>
          {{ this.$filters.transString(award.title) }}
        </p>
        <p class='text-sm text-gray-500 line-clamp-2'>
          {{ this.$filters.stripHtml(award.description) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Loader from '../partial/loader.vue'

const { mapState, mapActions } = createNamespacedHelpers('eProvider')
export default {
  name: 'Awards',
  components: {
    Loader,
  },
  mounted() {
    this.getEProviderAwards(this.$route.params.id)
  },
  computed: {
    ...mapState(['eProviderAwards']),
  },
  methods: {
    ...mapActions(['getEProviderAwards']),
  },
}
</script>