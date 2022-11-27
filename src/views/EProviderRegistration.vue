<template>
    <div class='flex flex-col justify-center py-6 min-h-screen bg-gray-50 sm:px-6 lg:px-8'>
        <Heading />
        <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div class='px-4 py-8 bg-white shadow-xl sm:rounded-lg sm:px-10'>
                <h2 class='mt-3 mb-12 text-2xl font-bold text-center text-second-color-600'>
                    {{ $t('Complete your profile') }}
                </h2>
                <form class='space-y-6' @submit.prevent='this.register'>
                    <div class='mt-1'>
                        <input id='date_of_birth' :placeholder='$t("Your birth date")'
                               :value='eProvider.date_of_birth'
                               autocomplete='date_of_birth'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='date_of_birth'
                               required='required'
                               type='date' />
                    </div>
                    <div class='mt-1'>
                        <input id='city' :placeholder='$t("Your city")'
                               :value='eProvider.city'
                               autocomplete='city'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='city'
                               required='required'
                               type='text' />
                    </div>

                    <div class='mt-1'>
                        <input id='address' :placeholder='$t("Your Address")'
                               :value='eProvider.address'
                               autocomplete='address'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='address'
                               required='required'
                               type='text' />
                    </div>
                    <div class='mt-1'>
                        <input id='mother_name' :placeholder="$t('Your mother\'s name')"
                               :value='eProvider.mother_name'
                               autocomplete='mother_name'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='mother_name'
                               type='text' />
                    </div>

                    <div class='mt-1'>
                        <input id='father_name' :placeholder="$t('Your father\'s name')"
                               :value='eProvider.father_name'
                               autocomplete='father_name'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='father_name'
                               type='text' />
                    </div>

                    <div class='mt-1'>
                        <select
                                @change="this.onMatrimonialStatusChange()"
                                v-model="this.isMarried"
                                id="is_married"
                                name="is_married"
                                class='block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                        >
                            <option value="" selected hidden>{{$t('Your matrimonial status')}}</option>
                            <option value="false">{{$t('Single')}}</option>
                            <option value="true">{{$t('Married')}}</option>
                        </select>
                    </div>

                    <div class='mt-1' v-if="haveAPartner()">
                        <input :placeholder="$t('Your partner\'s name')"
                               v-model="partnerName"
                               autocomplete='partner_name'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               type='text'
                               required='required'/>
                    </div>

                    <div class='mt-1'>
                        <select
                                @change="this.onEnterpriseStateChange()"
                                v-model="this.haveAnEnterprise"
                                id="partner_name"
                                name="partner_name"
                                class='block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                        >
                            <option value="" selected hidden>{{$t('Do you work for an enterprise ?')}}</option>
                            <option value="false">{{$t('No, I don\'t')}}</option>
                            <option value="true">{{$t('Yes, I do')}}</option>
                        </select>
                    </div>

                    <div class='mt-1' v-if="isAWorker()">
                        <input :placeholder="$t('Your enterprise\'s name')"
                               v-model="enterpriseName"
                               id="enterprise_name"
                               name="enterprise_name"
                               autocomplete='enterprise_name'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               type='text'
                               required='required'/>
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
    import {mapState, mapActions, mapGetters} from 'vuex'

    export default {
        components: {
            Heading,
        },
        data() {
            return {
                haveAnEnterprise: '',
                enterpriseName: '',
                isMarried: '',
                partnerName: null
            }
        },
        computed: {
            ...mapState('eProvider', {
                eProvider: state => state.eProvider
            })
        },
        methods: {
            ...mapActions('eProvider', ['registerAction']),
            ...mapActions('snackbar', ['toggleSnackBarAction']),

            register(event) {
                console.log(event)
                // this.registerAction(event).then(result => {
                //     if (result.type === 'success') {
                //         this.$router.push({ name: 'Home' })
                //     } else {
                //         this.toggleSnackBarAction(result)
                //     }
                // })
            },
            isAWorker(){
              return this.haveAnEnterprise === 'true';
            },
            haveAPartner(){
              return this.isMarried === 'true';
            },
            OnMatrimonialStatusChange(){
                if(!this.haveAPartner()){
                    this.partnerName = null;
                }
            },
            OnEnterpriseStateChange(){
                if(!this.haveAPartner()){
                    this.enterpriseName = null;
                }
            }
        }
    }
</script>