<template>
  <div class='flex flex-col justify-center py-6 min-h-screen bg-gray-50 sm:px-6 lg:px-8'>
    <Heading />
    <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div class='px-4 py-8 bg-white shadow-xl sm:rounded-lg sm:px-10'>
        <h2 class='mt-3 mb-12 text-2xl font-bold text-center text-second-color-600'>
          {{ $t('Sign in to your account') }}
        </h2>
        <form class='space-y-6' @submit.prevent='this.login'>
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
            <input id='password' :placeholder='$t("Your Password")'
                   :value='user.password'
                   autocomplete='password'
                   class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                   name='password' required='required'
                   type='password' />
          </div>

          <div class='flex items-center'>

            <input id='remember'
                   :value='user.remember'
                   class='block w-4 h-4 rounded border-gray-300 text-main-color-600 focus:ring-main-color-500'
                   name='remember'
                   type='checkbox' />
            <label class='block ml-2 text-sm text-second-color-600' for='remember'>
              {{ $t('Remember me') }}
            </label>

            <div class='flex-grow text-sm text-right'>
              <a class='font-medium text-main-color-600 hover:text-main-color-500' href='#'>
                {{ $t('Forgot your password?') }}
              </a>
            </div>
          </div>

          <div>
            <button
              class='flex justify-center px-4 py-2 w-full text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
              type='submit'>
              {{ $t('Login') }}
            </button>
          </div>
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
    ...mapActions('user', ['loginAction']),
    ...mapActions('snackbar', ['toggleSnackBarAction']),

    login(event) {
      this.loginAction(event).then(result => {
        if (result.type === 'success') {
          console.log(this.$route.redirectedFrom)
          this.$router.replace(this.$route.redirectedFrom || { name: 'Home' })
        }
        this.toggleSnackBarAction(result)
      })
    },
  },
}
</script>