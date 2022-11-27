<template>
  <section>
    <ReviewsLoader v-if='eServiceReviews.length === 0' />
    <div v-else class='overflow-hidden p-8 bg-white rounded-lg shadow-lg'>
      <h2 class='text-xl font-bold text-second-color-600'>{{ $t('Customer Reviews') }}</h2>
      <div class='divide-y divide-gray-100'>
        <div v-for='review in eServiceReviews' :key='review.id' class='py-8'>
          <div class='flex items-center space-x-4 rtl:space-x-reverse'>
            <img :alt='review.user?.name' :src='this.$filters.getFirstMediaThumb(review.user)' class='w-12 h-12 rounded-full' />
            <div class='flex-1'>
              <h4 class='text-sm font-bold text-second-color-600'>{{ review.user?.name }}</h4>
              <p class='text-sm text-gray-500'>
                <time :datetime='review.created_at'>{{ this.$filters.formatDate(review.created_at) }}</time>
              </p>
            </div>
            <div class='flex items-center mt-1'>
              <StarIcon v-for='rating in [0, 1, 2, 3, 4]' :key='rating'
                        :class="[review.rate > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden='true' />
            </div>
            <p class='sr-only'>{{ review.rate }} {{ $t('out of 5 stars') }}</p>
          </div>

          <div class='mt-4 space-y-6 text-sm text-gray-600' v-html='review.review' />
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import { StarIcon } from '@heroicons/vue/solid'
import { createNamespacedHelpers } from 'vuex'
import ReviewsLoader from './partial/reviews_loader.vue'

const { mapState, mapActions } = createNamespacedHelpers('eService')


export default {
  name: 'Reviews',
  components: {
    ReviewsLoader,
    StarIcon,
  },
  mounted() {
    this.getEServiceReviews(this.$route.params.id)
  },
  computed: {
    ...mapState(['eServiceReviews']),
  },
  methods: {
    ...mapActions(['getEServiceReviews']),
  },

}
</script>
