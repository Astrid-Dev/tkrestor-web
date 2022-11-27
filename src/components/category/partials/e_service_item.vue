<template>
  <div class='flex overflow-hidden flex-col rounded-lg shadow-lg'>
    <div class='flex-shrink-0'>
      <img :src='this.$filters.getFirstMediaThumb(eService)' alt='' class='object-cover w-full h-48' />
    </div>
    <router-link :to='{name:"EService",params:{id: eService.id}}' class='flex block flex-col p-5 bg-white h-full'>
      <p class='text-base font-semibold text-second-color-600'>
        {{ this.$filters.transString(eService.name) }}
      </p>
      <div class='flex'>
        <StarIcon v-for='i in Math.ceil(eService.rate)' :key='i' aria-hidden='true' class='w-5 h-5 text-yellow-400' />
        <StarIcon v-for='i in Math.floor(5 - eService.rate)' :key='i' aria-hidden='true' class='w-5 h-5 text-gray-300' />
      </div>
      <p class='mt-2 text-sm text-gray-500 line-clamp-3'>
        {{ this.$filters.stripHtml(eService?.description) }}
      </p>
      <div class='flex flex-grow flex-col justify-end pt-1 sm:pt-3'>
        <div v-if='eService.discount_price' class='flex items-center justify-end min-w-0 text-sm text-gray-400'>
          <span class='text-lg font-bold line-through'>{{ this.$filters.formatPrice(eService.discount_price) }} </span>
          <span class='text-xs '> /{{ $t(eService['price_unit'] || '') }}</span>
        </div>
        <div class='flex items-center text-sm'>
          <span class='flex-grow text-xs text-second-color-400'>{{ $t('Starts From') }}</span>
          <span class='text-lg font-bold text-main-color-600'>{{ this.$filters.formatPrice(eService.price) }} </span>
          <span class='text-xs text-main-color-600'> /{{ $t(eService['price_unit'] || '') }}</span>
        </div>
      </div>

    </router-link>
  </div>
</template>

<script>
import { StarIcon } from '@heroicons/vue/solid'

export default {
  components: {
    StarIcon,
  },
  props: ['eService'],
}
</script>
