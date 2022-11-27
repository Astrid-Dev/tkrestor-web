<template>
  <div class='flex flex-col justify-center py-6 min-h-screen bg-gray-50 sm:px-6 lg:px-8'>
    <Heading />
    <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div class='px-4 py-8 bg-white shadow-xl sm:rounded-lg sm:px-10'>
        <h2 class='mt-3 mb-12 text-2xl font-bold text-center text-second-color-600'>
          {{ $t('Create a new  account') }}
        </h2>
        <form class='space-y-6' @submit.prevent='this.register'>
          <div class='mt-1'>
            <input id='name' :placeholder='$t("Your name")'
                   :value='user.name'
                   autocomplete='name'
                   class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                   name='name'
                   required='required'
                   type='text' />
          </div>
          <div class='mt-1'>
            <input id='email' :placeholder='$t("Your Email address")'
                   :value='user.email'
                   autocomplete='email'
                   class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                   name='email'
                   required='required'
                   type='email' />
          </div>

          <div class='mt-1'>
            <input id='phone_number' :placeholder='$t("Your Phone Number")'
                   :value='user.phone_number'
                   autocomplete='phone_number'
                   class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                   name='phone_number'
                   required='required'
                   type='text' />
          </div>
          <div class='mt-1'>
            <input id='password' :placeholder='$t("Your Password")'
                   :value='user.password'
                   autocomplete='password'
                   class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                   name='password' required='required'
                   type='password' />
          </div>

          <div class='flex items-center'>
            <input id='conditions' class='w-4 h-4 rounded border-gray-300 text-main-color-600 focus:ring-main-color-500' name='conditions'
                   required='required' type='checkbox' />
            <label class='block ml-2 text-sm text-second-color-600' for='conditions'>
              {{ $t('Agree') }}
              <a class='font-medium text-main-color-600 hover:text-main-color-500' href='#'>
                {{ $t('Terms & Conditions ?') }}
              </a>
            </label>
          </div>

          <button
            class='flex justify-center px-4 py-2 w-full text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
            type='submit'>
            {{ $t('Sign Up') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Heading from '../components/auth/heading.vue'
import SocialLogin from '../components/auth/social_login.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    SocialLogin,
    Heading,
  },
  computed: {
    ...mapState('user', {
      user: state => state.user,
    }),
  },
  methods: {
    ...mapActions('user', ['registerAction']),
    ...mapActions('snackbar', ['toggleSnackBarAction']),

    register(event) {
      this.registerAction(event).then(result => {
        if (result.type === 'success') {
          this.$router.push({ name: 'Home' })
        } else {
          this.toggleSnackBarAction(result)
        }
      })
    },
  },
}
</script>