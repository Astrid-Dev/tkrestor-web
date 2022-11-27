<template>
  <TransitionRoot :show='$route.params.action !== undefined' as='template'>
    <Dialog as='div' class='overflow-hidden fixed inset-0 z-40' @close='$router.push({name:"EService"})'>
      <div class='overflow-hidden absolute inset-0'>
        <DialogOverlay class='absolute inset-0' />

        <div class='flex fixed inset-y-0 right-0 pl-10 max-w-full sm:pl-16'>
          <TransitionChild as='template' enter='transform transition ease-in-out duration-500 sm:duration-700' enter-from='translate-x-full'
                           enter-to='translate-x-0' leave='transform transition ease-in-out duration-500 sm:duration-700' leave-from='translate-x-0'
                           leave-to='translate-x-full'>
            <div class='w-screen max-w-2xl'>
              <div class='flex overflow-y-scroll flex-col h-full bg-white shadow-xl'>
                <!-- Header -->
                <div class='px-4 py-6 bg-gray-50 sm:px-6'>
                  <div class='flex justify-between items-start space-x-3'>
                    <div v-if='$route.params.action === "form" && $route.params.id !== undefined' class='space-y-1'>
                      <DialogTitle class='text-lg font-medium text-second-color-600'>
                        {{ $t('Book the Service') }}
                      </DialogTitle>
                      <p class='text-sm text-gray-500'>
                        {{ $t('Fill the information below to book this service') }}
                      </p>
                    </div>
                    <div v-if='$route.params.action === "summary" && $route.params.id !== undefined' class='space-y-1'>
                      <DialogTitle class='text-lg font-medium text-second-color-600'>
                        {{ $t('Booking Summary') }}
                      </DialogTitle>
                      <p class='text-sm text-gray-500'>
                        {{ $t('Check the information below and book this service') }}
                      </p>
                    </div>
                    <div class='flex items-center h-7'>
                      <button class='text-gray-400 hover:text-gray-500' type='button' @click='$router.push({name:"EService"})'>
                        <XIcon aria-hidden='true' class='w-6 h-6' />
                      </button>
                    </div>
                  </div>
                </div>
                <BookEServiceForm v-if='$route.params.action === "form" && $route.params.id !== undefined' />
                <BookingSummary v-if='$route.params.action === "summary" && $route.params.id !== undefined' />
                <BookingSuccess v-if='$route.params.action === "success" && $route.params.id !== undefined' />
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import { mapActions, mapState } from 'vuex'
import BookEServiceForm from './book_e_service_form.vue'
import BookingSummary from './book_e_service_summary.vue'
import BookingSuccess from './book_e_service_success.vue'


export default {
  name: 'BookEService',
  components: {
    BookingSuccess,
    BookingSummary,
    BookEServiceForm,
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    DialogTitle,
    XIcon,
  },
  setup() {

  },
  computed: {
    ...mapState('bookEService', {}),
  },
  methods: {
    ...mapActions('bookEService', []),
  },
}

</script>