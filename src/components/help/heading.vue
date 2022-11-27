<template>
  <div class='relative bg-accent-color-50 overflow-hidden'>
    <HeadingBackground />
    <div class='relative pt-6 pb-16 sm:pb-24'>
      <main class='mt-16 mx-auto max-w-7xl px-4 sm:mt-24'>
        <div class='text-center space-y-8'>
          <h1 class='text-2xl h-8 font-bold text-second-color-600 sm:text-3xl md:text-4xl'>{{ $t('Frequently Asked Questions') }}</h1>
          <div class='w-full sm:w-3/4 md:w-1/2 shadow-xl mx-auto inline-flex items-center justify-center bg-white rounded-full'>
            <input :value='keywords || this.$route.params.keywords' class='h-12 px-6 bg-white rounded-full border-none w-full focus:outline-none focus:ring-0'
                   :placeholder='$t("Search For Painter Near to You")' type='text' @input='search' />
            <router-link :to='{name:"Search",params:{keywords:keywords}}'
                         class='px-6 py-4 w-32 text-sm text-center text-white rounded-full w-42 bg-main-color-600'>
              {{ $t('Search') }}
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import HeadingBackground from './partials/heading_background.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    HeadingBackground,
  },
  computed: {
    ...mapState('eService', {
      keywords: state => state.keywords,
    }),
  },
  mounted() {
    this.updateKeywordsAction(undefined)
  },
  methods: {
    ...mapActions('eService', [
      'updateKeywordsAction',
    ]),
    search(e) {
      this.updateKeywordsAction(e.target.value)
    },
  },
}
</script>
