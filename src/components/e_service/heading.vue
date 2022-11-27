<template>
  <div class='relative pb-12'>
    <div class='absolute inset-x-0 bottom-0 h-1/2 bg-accent-color-50' />
    <HeadingBackground />
    <div class='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div class='relative h-60 shadow-xl sm:rounded-2xl sm:overflow-hidden md:h-96 sm:h-72'>
        <div class='absolute inset-0'>
          <img :alt='this.$filters.transString(eService.name)'
               :src='this.$filters.getFirstMediaUrl(eService)'
               class='object-cover w-full h-full' />
        </div>
      </div>
    </div>
  </div>
  <div class='relative px-4 bg-accent-color-50 sm:px-0'>
    <div class='flex justify-between pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div class='flex-1 min-w-0'>
        <h2 class='flex items-center gap-5 text-xl text-second-color-600 font-bold lg:text-4xl'>
          {{ this.$filters.transString(eService.name) }}
        </h2>
        <div class='inline-flex items-center'>
          <div class='flex flex-shrink-0'>
            <StarIcon v-for='i in Math.ceil(eService?.rate || 0)' :key='i' aria-hidden='true' class='w-5 h-5 text-yellow-400' />
            <StarIcon v-for='i in Math.floor(5 - (eService?.rate || 0))' :key='i' aria-hidden='true' class='w-5 h-5 text-gray-400' />
          </div>
          <div class='flex-1 py-1 min-w-0 text-sm text-right text-gray-500 sm:py-3'>
            <span class='mx-2 font-medium text-gray-500'>{{ $t('Reviews') }} ({{ eService.total_reviews }})</span>
          </div>
        </div>
      </div>
      <div class='flex flex-col items-end justify-center gap-y-2'>
        <span v-if='eService.e_provider?.available' class='px-4 py-0.5 rounded-md text-sm font-medium bg-green-200 text-green-800'>
          {{ $t('Available') }}
        </span>
        <span v-if='!eService.e_provider?.available' class='px-4 py-0.5 rounded-md text-sm font-medium bg-gray-200 text-gray-800'>
          {{ $t('Offline') }}
        </span>
        <div class='flex flex-grow justify-end gap-2'>
          <div v-if='eService.discount_price' class='flex items-center justify-end min-w-0 text-sm text-gray-400'>
            <span class='text-2xl font-bold line-through'>{{ this.$filters.formatPrice(eService.discount_price) }} </span>
          </div>
          <div class='flex items-center text-sm'>
            <span class='text-2xl font-bold text-main-color-600'>{{ this.$filters.formatPrice(eService.price) }} </span>
            <span class='text-sm text-main-color-600'> /{{ $t(eService['price_unit'] || '') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import HeadingBackground from './partial/heading_background.vue'
import { StarIcon, HeartIcon } from '@heroicons/vue/solid'
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/outline'

export default {
  name: 'Heading',
  components: { HeadingBackground, StarIcon, OutlineHeartIcon, HeartIcon },
  props: ['eService'],
}

</script>