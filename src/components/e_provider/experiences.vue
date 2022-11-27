<template>
  <section>
    <Loader v-if='eProviderExperiences.length === 0' height='h-96' />
    <div v-else class='overflow-hidden p-8 bg-white rounded-lg divide-y divide-gray-100 shadow-lg'>
      <h2 class='pb-4 text-xl font-bold text-second-color-600 truncate'>{{ $t('Experiences') }}</h2>
      <div v-for='experience in eProviderExperiences' :key='experience.id' class='relative items-center py-3'>
        <p class='text-sm font-bold text-second-color-600'>
          {{ this.$filters.transString(experience.title) }}
        </p>
        <p class='text-sm text-gray-500 line-clamp-2'>
          {{ this.$filters.stripHtml(experience.description) }}
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
  name: 'Experiences',
  components: {
    Loader,
  },
  mounted() {
    this.getEProviderExperiences(this.$route.params.id)
  },
  computed: {
    ...mapState(['eProviderExperiences']),
  },
  methods: {
    ...mapActions(['getEProviderExperiences']),
  },
}
</script>