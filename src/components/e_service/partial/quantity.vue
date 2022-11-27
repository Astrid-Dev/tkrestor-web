<template>
  <div class='flex h-10 rounded-md'>
    <button
      class='inline-flex relative items-center px-4 py-2 -mr-px space-x-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-l-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-main-color-500 focus:border-main-color-500'
      type='button'
      @click='this.decrementQuantityAction()'>
      <span class='text-2xl'>-</span>
    </button>
    <div class='flex relative flex-grow items-stretch focus-within:z-10'>
      <input id='quantity' :value='booking.quantity'
             class='w-full text-center block rounded-none border-gray-300 focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm' max='99'
             min='1'
             name='quantity'
             placeholder='1'
             type='text'
             @input='updateQuantity' />
    </div>
    <button
      class='inline-flex relative items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-r-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-main-color-500 focus:border-main-color-500'
      type='button'
      @click='this.incrementQuantityAction()'>
      <span class='text-2xl'>+</span>
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('bookEService')

export default {
  name: 'Quantity',
  components: {},
  computed: {
    ...mapState(['booking']),
  },
  methods: {
    ...mapActions(['incrementQuantityAction', 'decrementQuantityAction', 'updateQuantityAction']),
    updateQuantity(e) {
      this.updateQuantityAction(e.target.value)
    },
  },
}
</script>