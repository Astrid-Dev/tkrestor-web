<template>
  <div class='relative'>
    <div aria-hidden='true' class='absolute inset-0 flex items-center'>
      <div class='w-full border-t border-gray-100' />
    </div>
    <div class='relative flex justify-left'>
      <span class='px-2 bg-white font-bold'>
        {{ $t(dividerLabel) }}
      </span>
    </div>
  </div>
</template>
<script>

export default {
  props: ['dividerLabel'],
}
</script>
