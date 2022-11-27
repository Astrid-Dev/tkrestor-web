<template>
  <TransitionRoot :show='this.newUser !== undefined' as='template'>
    <Dialog as='div' class='overflow-hidden fixed inset-0 z-40' @close='this.toggleProfileAction()'>
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
                        {{ $t('Profile') }}
                      </DialogTitle>
                      <p class='text-sm text-gray-500'>
                        {{ $t('This information will be displayed publicly so be careful what you share.') }}
                      </p>
                    </div>
                    <div class='flex items-center h-7'>
                      <button class='text-gray-400 hover:text-gray-500' type='button' @click='this.toggleProfileAction()'>
                        <XIcon aria-hidden='true' class='w-6 h-6' />
                      </button>
                    </div>
                  </div>
                </div>

                <div class='overflow-y-scroll flex-1'>
                  <div class='py-6 space-y-8 sm:py-6 sm:space-y-0 sm:divide-y sm:divide-gray-100'>

                    <div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-6'>
                      <label class='block text-sm font-medium text-gray-700' for='photo'>
                        {{ $t('Profile Photo') }}
                      </label>
                      <div class='mt-1 sm:mt-0 sm:col-span-2'>
                        <form class='flex items-center' enctype='multipart/form-data' @submit.prevent='updateAvatar'>
                          <div class='flex relative items-center'>
                              <span class='overflow-hidden w-12 h-12 bg-gray-100 rounded-full cursor-pointer'>
                                                  <img :src='this.avatarPreview || this.$filters.getFirstMediaIcon(this.getUser)'
                                                       alt='avatar'
                                                       class='object-cover w-12 h-12 rounded-full cursor-pointer' />
                              </span>
                            <button
                              class='px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                              type='button'>
                              {{ $t('Change') }}
                            </button>
                            <input ref='avatar' accept='image/*' class='block absolute w-full h-full opacity-0 cursor-pointer' name='avatar' type='file'
                                   @change='selectAvatar'>
                          </div>
                          <button
                            :disabled='!this.avatarPreview'
                            class='relative px-5 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm disabled:opacity-50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                            type='submit'>
                            <span :style="'width:'+this.progress+'%'" class='block absolute -mx-5 -my-2 h-full rounded bg-main-color-300'></span>
                            <span>{{ $t('Upload') }} {{ this.progress ? this.progress + '%' : '' }}</span>
                          </button>
                        </form>
                      </div>
                    </div>

                    <div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-6'>
                      <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='name'>
                        {{ $t('Full Name') }}
                      </label>
                      <div class='mt-1 sm:mt-0 sm:col-span-2'>
                        <input id='name' :placeholder='$t("John Doe")' :value='newUser?.name' autocomplete='name'
                               class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='name'
                               required='required'
                               type='text'
                               @input='(e) => {newUser.name = e.target.value}' />
                      </div>
                    </div>

                    <div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-6'>
                      <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='email'>
                        {{ $t('Email') }}
                      </label>
                      <div class='mt-1 sm:mt-0 sm:col-span-2'>
                        <input id='email' :placeholder='$t("Your Email")' :value='newUser?.email' autocomplete='email'
                               class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='email'
                               required='required'
                               type='email'
                               @input='(e) => {newUser.email = e.target.value}' />
                      </div>
                    </div>

                    <div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-6'>
                      <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='phone_number'>
                        {{ $t('Phone Number') }}
                      </label>
                      <div class='mt-1 sm:mt-0 sm:col-span-2'>
                        <input id='phone_number' :placeholder='$t("+1 666 777 666")' :value='newUser?.phone_number' autocomplete='phone'
                               class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='phone_number'
                               required='required'
                               type='text'
                               @input='(e) => {newUser.phone_number = e.target.value}' />
                      </div>
                    </div>

                    <div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-6'>
                      <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='phone_number'>
                        {{ $t('Address') }}
                      </label>
                      <div class='mt-1 sm:mt-0 sm:col-span-2'>
                        <input id='address' :placeholder='$t("123 Street, City, Country")' :value='newUser?.custom_fields?.address?.value'
                               autocomplete='address'
                               class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='address'
                               type='text'
                               @input='(e) => {newUser.custom_fields.address.value = e.target.value}' />
                      </div>
                    </div>

                    <div class='px-4 space-y-1 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-6'>
                      <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='about'>
                        {{ ('Short Biography') }}
                      </label>
                      <div class='mt-1 sm:mt-0 sm:col-span-2'>
                          <textarea id='about' :placeholder='$t("Write a few sentences about yourself.")' :value='newUser?.custom_fields?.bio?.value'
                                    class='block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                                    name='about'
                                    rows='3'
                                    @input='(e) => {newUser.custom_fields.bio.value = e.target.value}' />
                      </div>
                    </div>

                    <div class='px-4 space-y-1 sm:space-y-0 sm:px-6 sm:py-6'>
                      <div class='sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3'>
                        <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='password'>
                          {{ $t('Old Password') }}
                        </label>
                        <div class='mt-1 sm:mt-0 sm:col-span-2'>
                          <input id='password' :placeholder='$t("••••••••••••")' :value='newUser?.password' autocomplete='name'
                                 class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                                 name='password'
                                 required='required'
                                 type='password'
                                 @input='(e) => {newUser.password = e.target.value}' />
                        </div>
                      </div>
                      <div class='sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3'>
                        <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='newPassword'>
                          {{ $t('New Password') }}
                        </label>
                        <div class='mt-1 sm:mt-0 sm:col-span-2'>
                          <input id='newPassword' :placeholder='$t("••••••••••••")' :value='newUser?.newPassword' autocomplete='password'
                                 class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                                 name='newPassword'
                                 required='required'
                                 type='password'
                                 @input='(e) => {newUser.newPassword = e.target.value}' />
                        </div>
                      </div>
                      <div class='sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3'>
                        <label class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2' for='confirmPassword'>
                          {{ $t('Confirm New Password') }}
                        </label>
                        <div class='mt-1 sm:mt-0 sm:col-span-2'>
                          <input id='confirmPassword' :placeholder='$t("••••••••••••")' :value='newUser?.confirmPassword' autocomplete='password'
                                 class='block w-full rounded-md border-gray-300 shadow-sm focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                                 name='confirmPassword'
                                 required='required'
                                 type='password'
                                 @input='(e) => {newUser.confirmPassword = e.target.value}' />
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                <!-- Action buttons -->
                <div class='flex-shrink-0 px-4 py-5 border-t border-gray-200 sm:px-6'>
                  <div class='flex justify-between space-x-3'>

                    <button
                      class='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                      type='button'
                      @click='this.toggleProfileAction()'>
                      <ChevronLeftIcon aria-hidden='true' class='mr-2 w-5 h-5' />
                      {{ $t('Close') }}
                    </button>
                    <button
                      class='inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                      type='button'
                      @click='this.updateProfile()'>
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
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon, ChevronLeftIcon } from '@heroicons/vue/outline'
import { mapState, mapActions, mapGetters } from 'vuex'


export default {
  name: 'Profile',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon,
    ChevronLeftIcon,
  },

  mounted() {

  },
  computed: {
    ...mapState('user', {
      newUser: state => state.newUser,
    }),
    ...mapState('upload', {
      uuid: state => state.uuid,
      avatarPreview: state => state.previewImage,
      progress: state => state.progress,
    }),
    ...mapGetters('user', ['getUser']),
  },
  methods: {
    ...mapActions('user', ['toggleProfileAction', 'setNewUserAction', 'updateUserAction']),
    ...mapActions('snackbar', ['toggleSnackBarAction']),
    ...mapActions('upload', ['uploadAction', 'updatePreviewAction']),
    updateProfile() {
      let errorsMessages = []
      if (this.newUser.password !== undefined) {
        if (this.newUser.newPassword !== this.newUser.confirmPassword) {
          errorsMessages.push(this.$i18n.t('The password confirmation does not match'))
        } else if ((this.newUser.newPassword?.length || 0) < 6) {
          errorsMessages.push(this.$i18n.t('The minimum password length is 6'))
        }
      }

      if (errorsMessages.length > 0) {
        this.toggleSnackBarAction({ title: 'Validation failed', message: errorsMessages.join('<br>'), type: 'error' })
        return
      }
      this.newUser.password = this.newUser.newPassword
      this.newUser.address = this.newUser.custom_fields.address.value
      this.newUser.bio = this.newUser.custom_fields.bio.value
      this.newUser.device_token = undefined
      if (this.uuid) {
        this.newUser.avatar = this.uuid
      }
      this.updateUserAction(this.newUser).then((result) => {
        this.toggleSnackBarAction(result)
      })
    },

    updateAvatar(e) {
      this.uploadAction({ file: this.$refs.avatar.files.item(0), field: 'avatar' }).then((result) => {
        this.toggleSnackBarAction(result)
      })
    },

    selectAvatar() {
      this.updatePreviewAction(this.$refs.avatar.files.item(0))
    },

  },
}

</script>