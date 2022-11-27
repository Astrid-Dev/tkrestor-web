<template>
  <section>
    <Loader v-if='optionGroups.length === 0' height='h-48' />
    <div v-else class='overflow-hidden bg-white rounded-lg divide-y divide-gray-100 shadow-lg'>
      <div class='py-4 sm:flex sm:items-center px-8 sm:justify-between'>
        <h2 class='text-xl font-bold text-second-color-600 truncate'>{{ $t('Select Options') }}</h2>
      </div>
      <!-- Details -->
      <div class='flex flex-col'>
        <div v-for='optionGroup in optionGroups' :key='optionGroup.id'>
          <p class='font-bold text-second-color-600 px-8 py-4'>{{ this.$filters.transString(optionGroup.name) }}</p>
          <RadioGroup>
            <div class='relative bg-white'>
              <RadioGroupOption v-for='option in optionGroup.options' :key='option.id' as='template'
                                @click='toggleOptionAction(option)'>
                <div
                  :class="[ selectedOptions.includes(option) ? 'bg-main-color-100' : ' ', 'relative bg-gray-50 p-4 gap-3 flex justify-between items-center cursor-pointer mb-2 md:pl-4 md:pr-6 focus:outline-none']">

                  <div
                    :class="[selectedOptions.includes(option) ? 'bg-main-color-600 border-transparent' : 'bg-white border-gray-300', 'h-6 w-6 flex-shrink-0 rounded-full border flex items-center justify-center']"
                    aria-hidden='true'>
                    <span class='rounded-full bg-white w-2 h-2' />
                  </div>
                  <div class=''>
                    <RadioGroupLabel :class="[selectedOptions.includes(option) ? 'text-main-color-600' : 'text-second-color-600', 'font-bold']" as='span'>
                      {{ this.$filters.transString(option.name) }}
                    </RadioGroupLabel>
                    <RadioGroupDescription as='div'>
                      <div :class="[selectedOptions.includes(option) ? 'text-main-color-600' : 'text-second-color-400','text-sm line-clamp-1']">
                        {{ this.$filters.stripHtml(option.description) }}
                      </div>
                      <div :class="[selectedOptions.includes(option) ? 'text-main-color-600' : 'text-second-color-600','font-bold line-clamp-1']">
                        {{ this.$filters.formatPrice(option.price) }}
                      </div>
                    </RadioGroupDescription>
                  </div>
                  <img :alt='this.$filters.transString(option.name)' :src='this.$filters.getFirstMediaThumb(option)' class='w-16 h-16 flex-shrink-0 rounded-xl'>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DialogTitle, RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { XIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'
import { mapState, mapActions } from 'vuex'
import Loader from '../partial/loader.vue'


export default {
  name: 'Options',
  components: {
    Loader,
    StarIcon,
    DialogTitle,
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
    XIcon,
    ChevronLeftIcon,
  },
  mounted() {
    this.getEServiceOptionGroups(this.$route.params.id)
    this.resetOptionAction()
  },
  computed: {
    ...mapState('eService', {
      optionGroups: state => state.optionGroups,
    }),
    ...mapState('bookEService', {
      selectedOptions: state => state.booking.options,
    }),
  },
  methods: {
    ...mapActions('eService', ['getEServiceOptionGroups']),
    ...mapActions('bookEService', ['toggleOptionAction', 'resetOptionAction']),
  },

}
</script>