<template>
  <TransitionRoot :show='this.newAddress !== undefined' as='template'>
    <Dialog as='div' class='overflow-hidden fixed inset-0 z-40'>
      <div class='overflow-hidden absolute inset-0'>
        <DialogOverlay class='absolute inset-0' />

        <div class='flex fixed inset-y-0 right-0 pl-10 max-w-full sm:pl-16'>
          <TransitionChild as='template' enter='transform transition ease-in-out duration-500 sm:duration-700' enter-from='translate-x-full'
                           enter-to='translate-x-0' leave='transform transition ease-in-out duration-500 sm:duration-700' leave-from='translate-x-0'
                           leave-to='translate-x-full'>
            <div class='w-screen max-w-2xl'>
              <div class='flex flex-col h-full bg-white shadow-xl'>
                <!-- Header -->
                <div class='px-4 py-6 bg-gray-50 sm:px-6'>
                  <div class='flex justify-between items-start space-x-3'>
                    <div class='space-y-1'>
                      <DialogTitle class='text-lg font-medium text-second-color-600'>
                        {{ $t('Add new address') }}
                      </DialogTitle>
                    </div>
                    <div class='flex items-center h-7'>
                      <button class='text-gray-400 hover:text-gray-500' type='button' @click='this.toggleAddressPickerAction()'>
                        <XIcon aria-hidden='true' class='w-6 h-6' />
                      </button>
                    </div>
                  </div>
                </div>
                <!-- Details -->
                <div class='flex flex-col flex-1 gap-4 w-full text-base sm:my-8 sm:px-6 lg:px-8'>
                  <div>
                    <label class='block text-sm font-medium text-gray-700' for='street-address'>
                      {{ $t('Description') }}
                    </label>
                    <div class='mt-1'>
                      <input id='description' :placeholder='$t("My Home Address")' :value='newAddress?.description' autocomplete='description'
                             class='shadow-sm focus:ring-main-color-500 focus:border-main-color-500 block w-full sm:text-sm border-gray-300 rounded-md'
                             name='description'
                             type='text'
                             @input='updateDescription'
                      />
                    </div>
                  </div>
                  <div>
                    <label class='block text-sm font-medium text-gray-700' for='street-address'>
                      {{ $t('Full Address') }}
                    </label>
                    <div class='mt-1'>
                      <input id='address' :placeholder='$t("123 Street, City, Country")' :value='newAddress?.address' autocomplete='address'
                             class='shadow-sm focus:ring-main-color-500 focus:border-main-color-500 block w-full sm:text-sm border-gray-300 rounded-md'
                             name='address'
                             type='text'
                             @input='updateFullAddress'
                      />
                    </div>
                  </div>

                  <span class='block text-sm font-medium text-gray-700'>
                      {{ $t('Click on the map to change your location') }}
                    </span>
                  <PlaceSearch
                    :loading='$t("Search for location")'
                    :placeholder='$t("Search for location")'
                    fallbackProcedure='gps'
                    style='width: 100%; height: 100%;'
                    v-bind:address='this.newAddress'
                    v-bind:geolocation='this.newAddress'
                    v-bind:gps_timeout='7000'
                    v-bind:manually='this.newAddress'
                    v-bind:ready='this.newAddress !== undefined'
                    v-bind:zoom='17'
                    @changed='updateMarker'
                  >
                  </PlaceSearch>
                </div>

                <!-- Action buttons -->
                <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6' dir='ltr'>
                  <div class='flex justify-between space-x-3'>
                    <button
                      class='inline-flex justify-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                      type='button'

                      @click='this.toggleAddressPickerAction()'>
                      <ChevronLeftIcon aria-hidden='true' class='w-5 h-5 mr-2' />
                      {{ $t('Close') }}
                    </button>
                    <button
                      class='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                      type='button'
                      @click='this.setCurrentAddressAction(this.newAddress); toggleAddressPickerAction(); '>
                      {{ $t('Save') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { PlaceSearch } from 'vuejs3-google-maps'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import { mapState, mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'AddressPicker',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon,
    ChevronLeftIcon,
    PlaceSearch,
  },

  computed: {
    ...mapState('user', {
      newAddress: state => state.newAddress,
      address: state => state.address,
      addresses: state => state.addresses,
    }),
    ...mapGetters('user', ['getUser']),
  },
  methods: {
    ...mapActions('user', ['toggleAddressPickerAction', 'setNewAddressAction', 'setCurrentAddressAction']),
    updateFullAddress(e) {
      this.newAddress.address = e.target.value
      this.setNewAddressAction(this.newAddress)
    },

    updateDescription(e) {
      this.newAddress.description = e.target.value
      this.setNewAddressAction(this.newAddress)
    },

    updateMarker(place) {
      this.newAddress.address = place !== undefined ? place.address_description : this.newAddress.address
      this.newAddress.latitude = place.lat
      this.newAddress.longitude = place.lng
      this.setNewAddressAction(this.newAddress)
    },
  },
}

</script>