<template>
  <div class='w-full h-full'>
    <div v-for='i in [1,2,3,4,5]' :key='i' class='animate-pulse flex'>
      <div class='flex-1 py-1'>
        <div class='h-24 bg-gray-100 rounded-lg w-full'></div>
      </div>
    </div>
  </div>
</template>