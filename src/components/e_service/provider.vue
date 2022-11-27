<template>
  <section>
    <ProviderLoader v-if='eProvider === undefined' />
    <div v-else class='overflow-hidden p-8 bg-white rounded-lg divide-y divide-gray-100 shadow-lg'>
      <div class='pb-4 sm:flex sm:items-center sm:justify-between'>
        <h2 class='text-xl font-bold text-second-color-600 truncate'>{{ $t('Service Provider') }}</h2>
        <router-link :to='{name:"EProvider",params:{id:eProvider?.id }}'
                     class='hidden text-sm font-semibold text-center text-main-color-600 hover:text-main-color-800 sm:block'>{{ $t('View More') }}
        </router-link>
      </div>
      <div class='flex relative items-center pt-4 space-x-4 rtl:space-x-reverse'>
        <div class='flex-shrink-0'>
          <img :src='this.$filters.getFirstMediaThumb(eProvider)' alt='' class='w-16 h-16 rounded' />
        </div>
        <div class='flex-1 min-w-0'>
          <router-link :to='{name:"EProvider",params:{id:eProvider?.id}}' class='focus:outline-none'>
            <span aria-hidden='true' class='absolute inset-0' />
            <p class='text-sm font-bold text-second-color-600'>
              {{ this.$filters.transString(eProvider?.name) }}
            </p>
            <p class='text-sm text-gray-500 line-clamp-3'>
              {{ this.$filters.stripHtml(eProvider?.description) }}
            </p>
          </router-link>
        </div>
      </div>


    </div>
  </section>
</template>

<script>
import ProviderLoader from './partial/provider_loader.vue'

export default {
  components: {
    ProviderLoader,
  },
  name: 'Provider',
  props: ['eProvider'],
}
</script>