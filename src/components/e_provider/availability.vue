<template>
  <section>
    <Loader v-if='eProvider?.available === undefined' height='h-96' />
    <div v-else class='overflow-hidden p-8 bg-white rounded-lg divide-y divide-gray-100 shadow-lg'>
      <div class='pb-4 sm:flex sm:items-center sm:justify-between'>
        <h2 class='text-xl font-bold text-second-color-600 truncate'> {{ $t('Availability') }} </h2>
        <span v-if='eProvider.available' class='px-4 py-0.5 rounded-md text-sm font-medium bg-green-200 text-green-800'>
          {{ $t('Available') }}
        </span>
        <span v-else class='px-4 py-0.5 rounded-md text-sm font-medium bg-gray-200 text-gray-800'>
          {{ $t('Offline') }}
        </span>
      </div>
      <div v-for='day in eProvider.availability_hours' :key='day.id' class='flex relative items-center py-3 space-x-4'>
        <div class='flex-1 min-w-0'>
          <p class='text-sm font-bold text-second-color-600'>
            {{ $t(day.day) }}
          </p>
          <p class='text-sm text-gray-500 line-clamp-2'>
            {{ this.$filters.transString(day.data) }}
          </p>
        </div>
        <div class='flex flex-col items-end space-y-2'>
          <span class='flex-shrink-0 px-4 py-0.5 rounded-md text-sm font-medium bg-gray-200 text-gray-800'>
            {{ day.start_at }} - {{ day.end_at }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Loader from '../partial/loader.vue'

export default {
  name: 'Availability',
  components: { Loader },
  props: ['eProvider'],
}
</script>