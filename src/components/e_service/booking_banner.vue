<template>
  <div class='fixed inset-x-0 bottom-0 pb-2 sm:pb-5'>
    <div class='px-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div class='px-4 py-3 bg-main-color-600 rounded-lg shadow-lg'>
        <div class='flex flex-wrap gap-3 justify-between items-center'>
          <p class='w-full font-medium text-center text-white truncate md:w-auto'>
            {{ $t('Select options and book it') }}
          </p>
          <div class='flex md:flex-row flex-col gap-3 w-full md:w-auto'>
            <Quantity v-if='eService.price_unit === "fixed" ' class='w-full md:w-48' />
            <button
              class='flex truncate justify-center items-center px-4 py-2 h-10 text-sm font-medium text-main-color-600 bg-white rounded-md border border-transparent shadow-sm hover:bg-gray-50'
              @click='$router.push({name:"BookEService",params:{action:"form",id:this.$route.params.id}})'>
              {{ $t('Book this Service') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quantity from './partial/quantity.vue'
import { mapActions, mapState } from 'vuex'


export default {
  name: 'BookingBanner',
  components: {
    Quantity,
  },
  mounted() {

  },
  computed: {
    ...mapState('eService', {
      eService: state => state.eService,
    }),
  },
  methods: {
    ...mapActions('eService', []),
  },
}
</script>