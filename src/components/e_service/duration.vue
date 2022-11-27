<template>
  <section>
    <div class='overflow-hidden p-8 bg-white rounded-lg divide-y divide-gray-100 shadow-lg'>
      <div class='sm:flex sm:items-end sm:justify-between'>
        <div>
          <h2 class='text-xl font-bold text-second-color-600'>{{ $t('Duration') }}</h2>
          <p class='text-sm text-gray-500 line-clamp-3'>
            {{ $t('This service may takes up to') }}
          </p>
        </div>
        <span class='font-bold text-center text-main-color-600'>{{ duration }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Duration',
  props: ['duration'],
}
</script>