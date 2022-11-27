<template>
  <Menu as='div' class='relative'>
    <div>
      <MenuButton
        class='text-sm focus:outline-none text-second-color-500 hover:text-second-color-900'>
        <span>{{ $t(locale) }}</span>
      </MenuButton>
    </div>
    <transition enter-active-class='transition duration-200 ease-out'
                enter-from-class='opacity-0 transform scale-95'
                enter-to-class='opacity-100 transform scale-100'
                leave-active-class='transition duration-75 ease-in'
                leave-from-class='opacity-100 transform scale-100'
                leave-to-class='opacity-0 transform scale-95'>
      <MenuItems
        class='absolute right-0 rtl:right-auto rtl:left-0 z-40 py-1 mt-2 w-48 bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top focus:outline-none'>
        <MenuItem v-for='lang in this.$global["supported_languages"]' :key='lang' v-slot='{ active }'>
            <span :class="[lang === locale || active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer']"
                  @click='changeLanguage(lang)'>{{ $t(lang) }}</span>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'
import { getCurrentInstance } from 'vue'
import { loadLocaleMessages, setI18nLanguage } from '../../utils/i18n'

export default {
  components: {
    Menu, MenuButton, MenuItem, MenuItems,
  },

  setup() {
    const { proxy } = getCurrentInstance()
    const { t, locale } = useI18n()

    const changeLanguage = async (lang) => {
      await loadLocaleMessages(proxy.i18n, lang)
      setI18nLanguage(proxy.i18n, lang)
    }

    return {
      t, locale, changeLanguage,
    }
  },
}
</script>