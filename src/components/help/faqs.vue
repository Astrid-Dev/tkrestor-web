<template>
  <Loader v-if='faqs.length === 0 && this.$route.params.id !== ""' />
  <EmptyFaqs v-else-if='this.$route.params.id === ""' />
  <dl v-else class='space-y-6 divide-y divide-gray-200'>
    <Disclosure v-for='faq in faqs' :key='faq.question' v-slot='{ open }' as='div' class='pt-6'>
      <dt class='text-lg'>
        <DisclosureButton class='text-left w-full flex justify-between items-start text-gray-400'>
                <span class='font-semibold text-second-color-600'>
                  {{ this.$filters.stripHtml(faq.question) }}
                </span>
          <span class='ml-6 h-7 flex items-center'>
                  <ChevronDownIcon :class="[open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform']" aria-hidden='true' />
                </span>
        </DisclosureButton>
      </dt>
      <DisclosurePanel as='dd' class='mt-2 pr-12'>
        <p class='text-base text-gray-500' v-html='this.$filters.transString(faq.answer)'></p>
      </DisclosurePanel>
    </Disclosure>
  </dl>
</template>

<script>
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/outline'
import { createNamespacedHelpers } from 'vuex'
import Loader from './faqs_loader.vue'
import EmptyFaqs from './partials/empty_faqs.vue'

const { mapState, mapActions } = createNamespacedHelpers('faq')


export default {
  components: {
    EmptyFaqs,
    Loader,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon,
  },
  setup() {
    const open = ref(false)
    return {
      open,
    }
  },
  computed: {
    ...mapState(['faqs']),
  },
  watch: {
    $route() {
      console.log(this.$route.params.id)
      this.loadFaqs(this.$route.params.id)
    },
  },
  mounted() {
    console.log(this.$route.params.id)
    this.loadFaqs(this.$route.params.id)
  },
  methods: {
    ...mapActions(['getFaqsAction']),
    loadFaqs(categoryId) {
      this.getFaqsAction(categoryId)
    },
  },
}
</script>