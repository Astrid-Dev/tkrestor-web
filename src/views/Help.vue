<template>
  <Heading />
  <div class='bg-white'>
    <div class='my-14 max-w-3xl mx-auto grid grid-cols-1 gap-20 px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
      <div class='sm:pt-6 space-y-6 lg:col-start-1 lg:col-span-1'>
        <Categories />
      </div>
      <div class='lg:col-start-2 lg:col-span-2 divide-y-2 divide-gray-200'>
        <Faqs />
      </div>
    </div>
  </div>
</template>

<script>
import Faqs from '../components/help/faqs.vue'
import Categories from '../components/help/categories.vue'
import Heading from '../components/help/heading.vue'

export default {
  components: {
    Faqs,
    Categories,
    Heading,
  },
}
</script>
