<template>
  <div class='mx-auto max-w-7xl sm:px-6 lg:px-8 my-8 flex gap-4'>
    <div v-for='category in categories' :key='category.id' :style="'color:'+category.color+';'+'background-color:'+category.color+'22'"
         class='inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-main-color-100 text-main-color-600'>
      <router-link :to="{ name: 'Category', params: { id: category.id }}">
        {{ this.$filters.transString(category.name) }}
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  props: ['categories'],
}
</script>
