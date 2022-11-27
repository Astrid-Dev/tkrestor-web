<template>
  <div class='w-full h-full'>
    <div v-for='i in [1,2,3]' :key='i' class='animate-pulse flex space-x-4'>
      <div class='flex-1 space-y-4 py-6'>
        <div class='h-5 bg-gray-100 rounded w-3/4'></div>
        <div class='space-y-1'>
          <div class='h-4 bg-gray-50 rounded'></div>
          <div class='h-4 bg-gray-50 rounded w-5/6'></div>
        </div>
      </div>
    </div>
  </div>
</template>