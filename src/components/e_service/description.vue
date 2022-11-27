<template>
  <section>
    <div class='rounded-lg bg-white overflow-hidden shadow-lg p-8'>
      <h2 class='text-xl font-bold text-second-color-600 mb-4'>{{ $t('Description') }}</h2>
      <p class='mt-1 text-sm text-gray-600' v-html='this.$filters.transString(eService.description)'>
      </p>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Description',
  props: ['eService'],
}
</script>