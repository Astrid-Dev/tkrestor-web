<template>
  <Heading :title='this.$filters.transString(this.page.title)' />
  <div id='custom-pages' class='bg-white'>
    <div class='my-14 max-w-3xl mx-auto lg:max-w-7xl' v-html='this.$filters.transString(this.page.content)'>
    </div>
  </div>
</template>
<style>
#custom-pages h1,
#custom-pages h2,
#custom-pages h3,
#custom-pages h4,
#custom-pages h5,
#custom-pages h6 {
  font-size: revert !important;
  font-weight: revert !important;
}

#custom-pages ol,
#custom-pages ul {
  list-style: revert !important;
  margin: revert !important;
  padding: revert !important;
}
</style>
<script>
import Heading from '../components/custom_page/heading.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CustomPage',
  components: {
    Heading,
  },
  watch: {
    $route() {
      this.getCustomPageDetailsAction(this.$route.params.id)
    },
  },
  mounted() {
    this.getCustomPageDetailsAction(this.$route.params.id)
  },
  computed: {
    ...mapState('customPage', {
      page: state => state.customPageDetails,
    }),
  },
  methods: {
    ...mapActions('customPage', ['getCustomPageDetailsAction']),
  },
}
</script>
