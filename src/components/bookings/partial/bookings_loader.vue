<template>
  <div class='space-y-8 w-full h-full'>
    <div v-for='i in [1,2,3]' :key='i' class='flex animate-pulse'>
      <div class='flex-1 px-6 py-8 bg-white border-t border-gray-50 shadow-lg sm:rounded-lg'>
        <div class='w-20 h-5 bg-gray-100 rounded'></div>
        <div class='my-8 h-px bg-gray-100 w-full'></div>
        <div class='flex my-5 space-x-4 rtl:space-x-reverse'>
          <div class='w-20 h-20 bg-gray-100 rounded'></div>
          <div class='flex-1 space-y-3'>
            <div class='w-3/5 h-4 bg-gray-100 rounded'></div>
            <div class='w-1/3 h-4 bg-gray-100 rounded'></div>
            <div class='w-1/2 h-4 bg-gray-100 rounded'></div>
          </div>
        </div>
        <div class='flex justify-between'>
          <div class='w-1/4 h-4 bg-gray-100 rounded'></div>
          <div class='w-20 h-4 bg-gray-100 rounded'></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'BookingsLoader',
}
</script>