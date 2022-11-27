<template>
  <section>
    <Loader v-if='eProvider?.description === undefined' height='h-32' />
    <div v-else class='rounded-lg bg-white overflow-hidden shadow-lg p-8'>
      <h2 class='text-xl font-bold text-second-color-600 mb-4'>{{ $t('Description') }}</h2>
      <p class='mt-1 text-sm text-gray-600' v-html='this.$filters.transString(eProvider.description)'>
      </p>
    </div>
  </section>
</template>

<script>
import Loader from '../partial/loader.vue'

export default {
  name: 'Description',
  components: {
    Loader,
  },
  props: ['eProvider'],
}
</script>