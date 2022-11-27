<template>
  <section>
    <GalleriesLoader v-if='media === undefined' />
    <div v-else class='rounded-lg bg-white overflow-hidden shadow-lg p-8'>

      <h2 class='text-xl font-bold text-second-color-600 mb-4 '>{{ $t('Galleries') }}</h2>

      <ul class='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8' role='list'>
        <li v-for='image in media' :key='image.id' class='relative'>
          <div
            class='group block w-full aspect-w-10 aspect-h-8 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-main-color-500 overflow-hidden'>
            <img :src='image.thumb' alt='' class='object-cover pointer-events-none group-hover:opacity-75' />
            <button class='absolute inset-0 focus:outline-none' type='button'>
              <span class='sr-only'>{{ $t('View details for') }} {{ image.name }}</span>
            </button>
          </div>
          <p class='mt-2 block text-sm font-medium text-second-color-600 truncate pointer-events-none'>{{ image.name }}</p>
        </li>
      </ul>

    </div>
  </section>
</template>

<script>

import GalleriesLoader from './partial/galleries_loader.vue'

export default {
  name: 'Galleries',
  components: { GalleriesLoader },
  props: ['media'],

}
</script>