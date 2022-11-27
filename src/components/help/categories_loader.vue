<template>
  <div class='w-full h-full'>
    <div v-for='i in [1,2,3,5,6,7]' :key='i' class='animate-pulse flex'>
      <div class='flex-1 py-1'>
        <div class='h-10 bg-gray-100 rounded w-full'></div>
      </div>
    </div>
  </div>
</template>