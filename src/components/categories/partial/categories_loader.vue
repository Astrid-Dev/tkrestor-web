<template>
  <div v-if='!hide' class='max-w-7xl mx-auto sm:px-6 lg:px-8 overflow-hidden grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8'>
    <div v-for='category in [1,2,3,4,5,6,7,8,9]' :key='category' class='relative animate-pulse'>
      <div class='h-56 bg-white rounded-lg w-full'></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getCurrentInstance as instance } from 'vue'

const hide = ref(false)

const props = defineProps({
  height: String,
})

onMounted(() => {
  setTimeout(() => {
    hide.value = true
  }, instance().proxy.$global.loading_time)
})
</script>