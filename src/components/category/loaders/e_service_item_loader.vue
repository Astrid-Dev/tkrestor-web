<template>
  <div v-if='!hide' class='flex overflow-hidden flex-col rounded-lg'>
    <div class='bg-gray-100 h-48 animate-pulse w-full'>
    </div>
    <div class='bg-gray-50 h-52 animate-pulse w-full'>
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
    hide.value = !hide.value
  }, instance().proxy.$global.loading_time)
})
</script>