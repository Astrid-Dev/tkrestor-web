<template>
  <div v-if='!hide' class='animate-pulse flex'>
    <div :class='height+" bg-gray-100 rounded-lg w-full"'></div>
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