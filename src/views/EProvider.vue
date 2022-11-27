<template>
  <Heading :eProvider='eProvider' />
  <div class='grid grid-cols-1 gap-4 items-start mx-auto my-8 max-w-7xl sm:px-6 lg:px-8 lg:grid-cols-3 lg:gap-8'>
    <div class='grid grid-cols-1 gap-8 lg:col-span-2'>
      <Description :eProvider='eProvider' />
      <Galleries />
      <FeaturedServices />
      <Reviews />
    </div>
    <div class='grid grid-cols-1 gap-8'>
      <Availability :eProvider='eProvider' />
      <Contact :eProvider='eProvider' />
      <Awards />
      <Experiences />
    </div>
  </div>
</template>

<script>

import Heading from '../components/e_provider/heading.vue'
import Description from '../components/e_provider/description.vue'
import Galleries from '../components/e_provider/galleries.vue'
import Reviews from '../components/e_provider/reviews.vue'
import Contact from '../components/e_provider/contact.vue'
import Availability from '../components/e_provider/availability.vue'
import Awards from '../components/e_provider/awards.vue'
import Experiences from '../components/e_provider/experiences.vue'
import FeaturedServices from '../components/e_provider/featured_services.vue'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('eProvider')

export default {
  name: 'EProvider',
  components: {
    FeaturedServices,
    Experiences,
    Awards,
    Availability,
    Contact,
    Reviews,
    Galleries,
    Heading,
    Description,
  },
  mounted() {
    this.getEProvider(this.$route.params.id)
  },
  computed: {
    ...mapState(['eProvider']),
  },
  methods: {
    ...mapActions(['getEProvider']),
  },
}
</script>
