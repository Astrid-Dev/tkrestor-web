<template>
  <CategoriesLoader v-if='categories.length === 0' />
  <nav v-else aria-label='Sidebar' class='space-y-1'>
    <router-link v-for='item in categories' :key='item.id'
                 :class="[item.id.toString() === this.$route.params.id ? 'bg-gray-100 font-semibold text-second-color-600' : 'text-gray-600 hover:bg-gray-50 hover:text-second-color-600', 'group flex items-center px-3 py-2 font-medium rounded-md cursor-pointer']"
                 :to='{name:"Help",params:{ id: item.id}}'>
      <span class='truncate'>
        {{ this.$filters.transString(item.name) }}
      </span>
    </router-link>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import CategoriesLoader from './categories_loader.vue'

const { mapState, mapActions } = createNamespacedHelpers('faq')
export default {
  components: {
    CategoriesLoader,
  },
  computed: {
    ...mapState(['categories']),
  },

  mounted() {
    this.getCategoriesAction()
  },
  methods: {
    ...mapActions(['getCategoriesAction']),
  },
}
</script>