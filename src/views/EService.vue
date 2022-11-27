<template>
  <BookEService />
  <Heading :eService='eService' />
  <Categories :categories='eService?.categories || []' />
  <div class='grid grid-cols-1 gap-4 items-start mx-auto my-8 max-w-7xl sm:px-6 lg:px-8 lg:grid-cols-3 lg:gap-8'>
    <div class='grid grid-cols-1 gap-8 lg:col-span-2'>
      <Description :eService='eService' />
      <Galleries :media='eService?.media' />
      <Reviews />
    </div>
    <div class='grid grid-cols-1 gap-8'>
      <Favorite :eService='eService' />
      <Options />
      <Provider :eProvider='eService?.e_provider' />
      <Duration :duration='eService?.duration' />
    </div>
  </div>
  <BookingBanner />
</template>

<script>

import { mapState, mapActions } from 'vuex'
import Heading from '../components/e_service/heading.vue'
import Categories from '../components/e_service/categories.vue'
import Description from '../components/e_service/description.vue'
import Galleries from '../components/e_service/galleries.vue'
import Reviews from '../components/e_service/reviews.vue'
import Provider from '../components/e_service/provider.vue'
import Duration from '../components/e_service/duration.vue'
import BookingBanner from '../components/e_service/booking_banner.vue'
import BookEService from '../components/book_e_service/book_e_service.vue'
import Options from '../components/e_service/options.vue'
import Favorite from '../components/e_service/favorite.vue'

export default {
  name: 'EService',
  components: {
    Options,
    BookEService,
    BookingBanner,
    Duration,
    Provider,
    Reviews,
    Galleries,
    Categories,
    Heading,
    Description,
    Favorite,
  },
  mounted() {
    this.getEService(this.$route.params.id)
  },
  computed: {
    ...mapState('bookEService', {
      booking: state => state.booking,
    }),
    ...mapState('eService', {
      eService: state => state.eService,
    }),
  },
  methods: {
    ...mapActions('eService', ['getEService']),
  },
}
</script>
