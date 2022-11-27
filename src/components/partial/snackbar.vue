<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div aria-live='assertive' class='fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50'>
    <div class='w-full flex flex-col items-center space-y-4 sm:items-end'>
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition enter-active-class='transform ease-out duration-300 transition' enter-from-class='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
                  enter-to-class='translate-y-0 opacity-100 sm:translate-x-0' leave-active-class='transition ease-in duration-300'
                  leave-from-class='opacity-100' leave-to-class='opacity-0'>
        <div v-if='title !== undefined '
             class='max-w-sm w-full bg-white shadow-xl rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
          <div class='p-4'>
            <div class='flex items-center'>
              <div class='flex-shrink-0'>
                <CheckCircleIcon v-if='type === "success"' aria-hidden='true' class='h-8 w-8 text-green-400' />
                <XCircleIcon v-if='type === "error"' aria-hidden='true' class='h-8 w-8 text-red-400' />
                <ExclamationCircleIcon v-if='type === "warning"' aria-hidden='true' class='h-8 w-8 text-yellow-500' />
              </div>
              <div class='ml-3 w-0 flex-1 pt-0.5'>
                <p class='text-sm font-medium text-second-color-600'>
                  {{ $t(title) }}
                </p>
                <p class='mt-1 text-sm text-gray-500' v-html='$t(message)'>
                </p>
              </div>
              <div class='ml-4 flex-shrink-0 flex'>
                <button
                  class='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                  @click='toggleSnackBarAction()'>
                  <span class='sr-only'>{{ $t('Close') }}</span>
                  <XIcon aria-hidden='true' class='h-5 w-5' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('snackbar')

export default {
  name: 'Snackbar',
  components: {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationCircleIcon,
    XIcon,
  },
  computed: {
    ...mapState(['type', 'title', 'message']),
  },
  methods: {
    ...mapActions(['toggleSnackBarAction']),
  },

}
</script>