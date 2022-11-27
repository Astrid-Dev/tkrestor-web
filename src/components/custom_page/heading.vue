<template>
  <div class='relative bg-gray-50 overflow-hidden'>
    <HeadingBackground />

    <div class='flex items-center relative h-60'>
      <main class='mx-auto max-w-7xl px-4'>
        <div class='text-center'>
          <h1 class='text-2xl font-bold text-second-color-600 sm:text-3xl md:text-4xl'>
            <span class='block xl:inline'>{{ title }}</span>
          </h1>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import HeadingBackground from '../partial/heading_background.vue'

export default {
  components: {
    HeadingBackground,
  },
  props: ['title'],
}
</script>