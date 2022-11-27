<template>
  <section>
    <div class='overflow-hidden p-8 bg-white rounded-lg divide-y divide-gray-100 shadow-lg'>
      <div class='sm:flex sm:items-center sm:justify-between'>
        <div>
          <h2 class='text-xl font-bold text-second-color-600'>{{ $t('Favorite') }}</h2>
          <p class='text-sm text-gray-500 line-clamp-3'>
            {{ $t(eService.is_favorite ? 'Remove this service from favorites' : 'Add this service to your favorites list') }}
          </p>
        </div>
        <button v-if='eService.is_favorite' @click='removeEServiceFromFavorites()'>
          <HeartIcon class='w-8 h-8 text-red-600 hover:text-second-color-600'></HeartIcon>
        </button>
        <button v-else @click='addEServiceToFavorites()'>
          <OutlineHeartIcon class='w-8 h-8 text-second-color-600 hover:text-red-600'></OutlineHeartIcon>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { HeartIcon } from '@heroicons/vue/solid'
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/outline'
import { mapActions } from 'vuex'

export default {
  name: 'Favorite',
  components: {
    HeartIcon,
    OutlineHeartIcon,
  },
  props: ['eService'],
  computed: {},
  methods: {
    ...mapActions('eService', ['addEServiceToFavoritesAction', 'removeEServiceFromFavoritesAction']),
    ...mapActions('snackbar', ['toggleSnackBarAction']),
    addEServiceToFavorites() {
      this.addEServiceToFavoritesAction(this.eService).then((result) => {
        this.toggleSnackBarAction(result)
      })
    },

    removeEServiceFromFavorites() {
      this.removeEServiceFromFavoritesAction(this.eService).then((result) => {
        this.toggleSnackBarAction(result)
      })
    },
  },
}
</script>