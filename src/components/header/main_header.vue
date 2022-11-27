<template>
  <Disclosure v-slot='{ open }' as='nav' class='sticky top-0 z-40 bg-white'>
    <div class='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div class='flex justify-between h-16'>
        <div class='flex'>
          <div class='flex items-center mr-2 -ml-2 md:hidden'>
            <!-- Mobile menu button -->
            <DisclosureButton
              class='inline-flex justify-center items-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-main-color-500'>
              <MenuIcon v-if='!open' aria-hidden='true' class='block w-6 h-6' />
              <XIcon v-else aria-hidden='true' class='block w-6 h-6' />
            </DisclosureButton>
          </div>
          <router-link as='div' class='flex flex-shrink-0 items-center cursor-pointer' to='/'>
            <img :alt='this.$settings["app_name"]' :src='this.$settings["app_logo"]'
                 class='block w-auto h-8 lg:hidden' />
            <img :alt='this.$settings["app_name"]'
                 :src='this.$settings["app_logo"]' class='hidden w-auto h-8 lg:block' />
            <span class='mx-3 font-bold text-second-color-600'>{{ this.$settings['app_name'] }}</span>
          </router-link>
          <div class='hidden md:ml-6 md:flex md:space-x-6 rtl:space-x-reverse'>
            <router-link
              :class="{'border-main-color-500 text-main-color-600 font-bold': ($router.currentRoute.value.name === 'Home'),'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': ($router.currentRoute.value.name !== 'Home')}"
              class='inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2'
              to='/'>
              {{ $t('Home') }}
            </router-link>
            <router-link
              :class="{'border-main-color-500 text-main-color-600 font-bold': ($router.currentRoute.value.name === 'Categories'),'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': ($router.currentRoute.value.name !== 'Categories')}"
              class='inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2'
              to='/categories'>
              {{ $t('Categories') }}
            </router-link>
            <router-link
              :class="{'border-main-color-500 text-main-color-600 font-bold': ($router.currentRoute.value.name === 'Help'),'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': ($router.currentRoute.value.name !== 'Help')}"
              class='inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2'
              to='/help'>
              {{ $t('Help & Support') }}
            </router-link>
          </div>
        </div>
        <div class='flex gap-5 items-center'>
          <MyAddresses />
          <div class='hidden md:flex-shrink-0 md:flex md:items-center'>
            <Languages />
          </div>
          <MyNotifications v-if='this.isAuth' />
          <router-link v-if='!this.isAuth' :to='{name:"Login"}'
                       class='hidden text-sm md:inline-flex focus:outline-none text-second-color-500 hover:text-second-color-900'
                       type='button'>
            {{ $t('Login') }}
          </router-link>
          <router-link v-if='!this.isAuth' :to='{name:"Register"}'
                       class='hidden px-4 py-2 text-sm text-white rounded-md border border-transparent shadow-sm md:inline-flex bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                       type='button'>
            {{ $t('Register') }}
          </router-link>
          <div v-if='this.isAuth' class='hidden md:flex-shrink-0 md:flex md:items-center'>
            <Menu as='div' class='relative'>
              <div>
                <MenuButton
                  class='flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'>
                  <img :src='this.$filters.getFirstMediaIcon(this.getUser)'
                       alt='avatar'
                       class='w-8 h-8 rounded-full' />
                </MenuButton>
              </div>
              <transition enter-active-class='transition duration-200 ease-out'
                          enter-from-class='opacity-0 transform scale-95'
                          enter-to-class='opacity-100 transform scale-100'
                          leave-active-class='transition duration-75 ease-in'
                          leave-from-class='opacity-100 transform scale-100'
                          leave-to-class='opacity-0 transform scale-95'>
                <MenuItems
                  class='absolute right-0 rtl:right-auto rtl:left-0 z-40 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none'>
                  <MenuItem v-slot='{ active }'>
                    <span :class="[active ? 'bg-gray-100' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700']" @click='this.toggleProfileAction()'>
                      {{ $t('Your Profile') }}
                    </span>
                  </MenuItem>
                  <MenuItem v-slot='{ active }'>
                    <router-link :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" :to='{name:"Bookings"}'>
                      {{ $t('My Bookings') }}
                    </router-link>
                  </MenuItem>
                  <MenuItem v-slot='{ active }'>
                    <router-link :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" :to='{name:"Favorites"}'>
                      {{ $t('Favorites') }}
                    </router-link>
                  </MenuItem>
                  <MenuItem v-slot='{ active }'>
                    <div :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer']" @click='logout'>
                      {{ $t('Logout') }}
                    </div>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <DisclosurePanel class='md:hidden'>
      <div class='pt-2 pb-3 space-y-1'>
        <router-link
          :class="[($router.currentRoute.value.name === 'Home') ? 'bg-main-color-50 border-main-color-500 text-main-color-700': 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700','text-base font-medium sm:pl-5 sm:pr-6 block pl-3 pr-4 py-2 border-l-4']"
          :to='{name:"Home"}'>
          {{ $t('Home') }}
        </router-link>
        <router-link
          :class="[($router.currentRoute.value.name === 'Categories') ? 'bg-main-color-50 border-main-color-500 text-main-color-700': 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700','text-base font-medium sm:pl-5 sm:pr-6 block pl-3 pr-4 py-2 border-l-4']"
          :to='{name:"Categories"}'>
          {{ $t('Categories') }}
        </router-link>
        <router-link
          :class="[($router.currentRoute.value.name === 'Help') ? 'bg-main-color-50 border-main-color-500 text-main-color-700': 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700','text-base font-medium sm:pl-5 sm:pr-6 block pl-3 pr-4 py-2 border-l-4']"
          :to='{name:"Help"}'>
          {{ $t('Help & Support') }}
        </router-link>
      </div>
      <div class='pt-4 pb-3 border-t border-gray-200'>
        <div class='flex items-center px-4 sm:px-6'>
          <div v-if='this.isAuth' class='flex-shrink-0'>
            <img :src='this.$filters.getFirstMediaIcon(this.getUser)'
                 alt='avatar'
                 class='w-10 h-10 rounded-full' />
          </div>
          <div v-if='this.isAuth' class='ml-3'>
            <div class='text-base font-medium text-gray-800'>{{ this.getUser?.name }}</div>
            <div class='text-sm font-medium text-gray-500'>{{ this.getUser?.email }}</div>
          </div>
          <div v-if='!this.isAuth' class='flex items-center space-x-4'>
            <router-link :to='{name:"Register"}'
                         class='px-4 py-2 text-sm text-white rounded-md border border-transparent shadow-sm bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                         type='button'>
              {{ $t('Register') }}
            </router-link>
            <router-link :to='{name:"Login"}' class='text-sm focus:outline-none text-second-color-500 hover:text-second-color-900'
                         type='button'>
              {{ $t('Login') }}
            </router-link>
          </div>
          <Languages class='ml-auto' />
        </div>
        <div v-if='this.isAuth' class='mt-3 space-y-1'>
          <span class='block px-4 py-2 text-base font-medium text-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-100 sm:px-6'
                @click='this.toggleProfileAction()'>
            {{ $t('Your Profile') }}
          </span>
          <router-link
            :class="[($router.currentRoute.value.name === 'Bookings') ? 'bg-main-color-50 border-main-color-500 text-main-color-700': 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700','text-base font-medium sm:pl-5 sm:pr-6 block pl-3 pr-4 py-2 border-l-4']"
            :to='{name:"Bookings"}'>
            {{ $t('My Bookings') }}
          </router-link>
          <router-link
            :class="[($router.currentRoute.value.name === 'Favorites') ? 'bg-main-color-50 border-main-color-500 text-main-color-700': 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700','text-base font-medium sm:pl-5 sm:pr-6 block pl-3 pr-4 py-2 border-l-4']"
            :to='{name:"Favorites"}'>
            {{ $t('Favorites') }}
          </router-link>
          <div v-if='this.isAuth' class='block px-4 py-2 text-base font-medium text-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-100 sm:px-6'
               @click='logout'>{{ $t('Logout') }}
          </div>
        </div>
      </div>
    </DisclosurePanel>

  </Disclosure>
  <AddressPicker />
  <Profile />
</template>

<script>
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { PlusIcon } from '@heroicons/vue/solid'
import MyAddresses from './my_addresses.vue'
import AddressPicker from './address_picker.vue'
import MyNotifications from './my_notifications.vue'
import Languages from './languages.vue'
import Profile from './profile.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Languages,
    MyNotifications,
    MyAddresses,
    Profile,
    AddressPicker,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const open = ref(false)

    return {
      open,
    }
  },
  computed: {
    ...mapGetters('user', [
      'getUser',
      'isAuth',
    ]),
  },
  methods: {
    ...mapActions('user', [
      'logoutAction',
      'toggleProfileAction',
    ]),
    ...mapActions('snackbar', [
      'toggleSnackBarAction',
    ]),
    async logout() {
      const result = this.logoutAction()
      await this.$router.replace({ name: 'Home' })
      this.toggleSnackBarAction(result)
    },
  },
}
</script>