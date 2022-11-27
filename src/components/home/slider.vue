<template>
  <div class='relative'>

    <div class='absolute inset-x-0 bottom-0 h-1/2 bg-accent-color-50' />
    <SliderBackground />
    <Loader v-if='slides.length === 0' height='h-48 sm:h-96' />
    <div v-else class='mx-auto max-w-7xl h-48 sm:h-96 sm:px-6 lg:px-8'>
      <carousel dir='ltr' :autoplay='5000' :items-to-show='1' :wrap-around='true'>
        <slide v-for='slide in slides' :key='slide' class='relative w-full shadow-xl sm:overflow-hidden'>
          <div class='absolute inset-0'>
            <img :src='this.$filters.getFirstMediaUrl(slide)'
                 alt='People working on laptops'
                 class='object-cover w-full h-full' />
            <div class='absolute inset-0' />
          </div>
          <div class='flex relative items-center px-6 w-full h-48 sm:px-10 sm:h-96'>
            <div class='w-1/3'>
              <p :style="'color:'+slide.text_color" class='text-sm font-bold sm:text-xl lg:text-3xl'>
                {{ this.$filters.transString(slide.text) }}
              </p>
              <router-link v-if='slide.e_service_id !== null' :to='{name:"EService",params:{id:slide.e_service_id || 0}}' :style="'background-color:'+slide.button_color" class="block px-3 py-3 w-32 rounded-full text-sm text-white text-center my-1 mx-auto">{{ this.$filters.transString(slide.button) }}</router-link>
              <router-link v-else-if='slide.e_provider_id !== null' :to='{name:"EProvider",params:{id:slide.e_provider_id || 0}}' :style="'background-color:'+slide.button_color" class="block px-3 py-3 w-32 rounded-full text-sm text-white text-center my-1 mx-auto">{{ this.$filters.transString(slide.button) }}</router-link>
              <a v-else href='#' :style="'background-color:'+slide.button_color" class="block px-3 py-3 w-32 rounded-full text-sm text-white text-center my-1 mx-auto">{{ this.$filters.transString(slide.button) }}</a>
            </div>
          </div>
        </slide>
        <template #addons>
          <navigation v-if='slides.length > 0' class='hidden sm:flex' />
        </template>
      </carousel>
    </div>
    <SearchBar />
  </div>
</template>
<style>
@media (min-width: 640px) {
  .carousel .carousel__viewport {
    border-radius: 1rem;
  }
}
</style>
<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { createNamespacedHelpers } from 'vuex'
import SliderBackground from './partial/slider_background.vue'
import SearchBar from './partial/search_bar.vue'
import Loader from '../partial/loader.vue'

const { mapState, mapActions } = createNamespacedHelpers('slider')

export default {
  name: 'Slider',
  components: {
    Loader,
    Carousel,
    Slide,
    Navigation,
    SliderBackground,
    SearchBar,
  },
  mounted() {
    this.getSlidesAction()
  },
  computed: {
    ...mapState(['slides']),
  },
  methods: {
    ...mapActions(['getSlidesAction']),
  },
}
</script>