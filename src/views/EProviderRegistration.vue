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
                               v-model="eProviderData.date_of_birth"
                               autocomplete='date_of_birth'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='date_of_birth'
                               required='required'
                               type='date' />
                    </div>
                    <div class='mt-1'>
                        <input id='city' :placeholder='$t("Your city")'
                               v-model="eProviderData.city"
                               autocomplete='city'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='city'
                               required='required'
                               type='text' />
                    </div>

                    <div class='mt-1'>
                        <input id='address' :placeholder='$t("Your Address")'
                               v-model="eProviderData.address"
                               autocomplete='address'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='address'
                               required='required'
                               type='text' />
                    </div>
                    <div class='mt-1'>
                        <input id='mother_name' :placeholder="$t('Your mother\'s name')"
                               v-model="eProviderData.mother_name"
                               autocomplete='mother_name'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='mother_name'
                               type='text' />
                    </div>

                    <div class='mt-1'>
                        <input id='father_name' :placeholder="$t('Your father\'s name')"
                               v-model="eProviderData.father_name"
                               autocomplete='father_name'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               name='father_name'
                               type='text' />
                    </div>

                    <div class='mt-1'>
                        <select
                                @change.prevent="onMatrimonialStatusChange"
                                v-model="eProviderData.is_married"
                                id="is_married"
                                name="is_married"
                                class='block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                        >
                            <option :value="null" selected hidden>{{$t('Your matrimonial status')}}</option>
                            <option value="false">{{$t('Single')}}</option>
                            <option value="true">{{$t('Married')}}</option>
                        </select>
                    </div>

                    <div class='mt-1' v-if="haveAPartner()">
                        <input :placeholder="$t('Your partner\'s name')"
                               v-model="eProviderData.partner_name"
                               autocomplete='partner_name'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               type='text'
                               required='required'/>
                    </div>

                    <div class='mt-1'>
                        <select
                                @change.prevent="onEnterpriseStateChange"                                v-model="eProviderData.have_an_enterprise"
                                id="have_an_enterprise"
                                name="have_an_enterprise"
                                class='block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                        >
                            <option :value="null" selected hidden>{{$t('Do you work for an enterprise ?')}}</option>
                            <option value="false">{{$t('No, I don\'t')}}</option>
                            <option value="true">{{$t('Yes, I do')}}</option>
                        </select>
                    </div>

                    <div class='mt-1' v-if="isAWorker()">
                        <input :placeholder="$t('Your enterprise\'s name')"
                               v-model="eProviderData.enterprise_name"
                               id="enterprise_name"
                               name="enterprise_name"
                               autocomplete='enterprise_name'
                               class='block px-3 py-2 w-full placeholder-gray-400 rounded-md border border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-main-color-500 focus:border-main-color-500 sm:text-sm'
                               type='text'
                               required='required'/>
                    </div>

                    <input type="hidden" id="user_id" name="user_id" v-model="eProviderData.user_id" disabled="disabled"/>


                    <button
                            class='flex justify-center px-4 py-2 w-full text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                            type='submit'>
                        {{ $t('Save') }}
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
                user: null,
                eProviderData: {
                    birth_date: null,
                    city: null,
                    address: null,
                    father_name: null,
                    mother_name: null,
                    is_married: null,
                    enterprise_name: null,
                    have_an_enterprise: null,
                    partner_name: null,
                    user_id: null
                }
            }
        },
        mounted(){
            setTimeout(() =>{
                this.user = this.getUser;
                this.eProviderData.user_id = this.user.id;
                console.log(this.user);
            })
        },
        computed: {
            ...mapState('eProvider', {
                eProvider: state => state.eProvider
            }),
            ...mapGetters('user', [
                'getUser',
            ]),
        },
        methods: {
            ...mapActions('eProvider', ['registerEProviderAction']),
            ...mapActions('snackbar', ['toggleSnackBarAction']),

            register(event) {
                this.registerEProviderAction(event).then(result => {
                    if (result.type === 'success') {
                        this.$router.push({ name: 'Home' })
                    } else {
                        this.toggleSnackBarAction(result)
                    }
                })
            },
            isAWorker(){
              return this.eProviderData.have_an_enterprise === 'true';
            },
            haveAPartner(){
              return this.eProviderData.is_married === 'true';
            },
            OnMatrimonialStatusChange(event){
                if(!this.haveAPartner()){
                    this.eProviderData.partner_name = null;
                }
            },
            OnEnterpriseStateChange(event){
                if(!this.isAWorker()){
                    this.eProviderData.enterprise_name = null;
                }
            }
        }
    }
</script>