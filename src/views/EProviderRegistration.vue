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
                    <input type="hidden" id="e_provider_type_id" name="e_provider_type_id" v-model="eProviderData.type_id" disabled="disabled"/>


                    <button v-if="!isProcessing"
                            class='flex justify-center px-4 py-2 w-full text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-main-color-600 hover:bg-main-color-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-color-500'
                            type='submit'>
                        {{ $t('Save') }}
                    </button>
                    <button v-if="isProcessing"
                            disabled='disabled'
                            class='cursor-not-allowed flex justify-center px-4 py-2 w-full text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-second-color-600'>
                        <svg version="1.1" 
                            class="svg-loader" 
                            xmlns="http://www.w3.org/2000/svg" 
                            xmlns:xlink="http://www.w3.org/1999/xlink" 
                            x="0px"
                            y="0px" 
                            viewBox="0 0 80 80" 
                            xml:space="preserve"
                            style="height: 1.3em"
                        >
                            <path 
                                fill="#D43B11" 
                                d="M10,40c0,0,0-0.4,0-1.1c0-0.3,0-0.8,0-1.3c0-0.3,0-0.5,0-0.8c0-0.3,0.1-0.6,0.1-0.9c0.1-0.6,0.1-1.4,0.2-2.1
                                c0.2-0.8,0.3-1.6,0.5-2.5c0.2-0.9,0.6-1.8,0.8-2.8c0.3-1,0.8-1.9,1.2-3c0.5-1,1.1-2,1.7-3.1c0.7-1,1.4-2.1,2.2-3.1
                                c1.6-2.1,3.7-3.9,6-5.6c2.3-1.7,5-3,7.9-4.1c0.7-0.2,1.5-0.4,2.2-0.7c0.7-0.3,1.5-0.3,2.3-0.5c0.8-0.2,1.5-0.3,2.3-0.4l1.2-0.1
                                l0.6-0.1l0.3,0l0.1,0l0.1,0l0,0c0.1,0-0.1,0,0.1,0c1.5,0,2.9-0.1,4.5,0.2c0.8,0.1,1.6,0.1,2.4,0.3c0.8,0.2,1.5,0.3,2.3,0.5
                                c3,0.8,5.9,2,8.5,3.6c2.6,1.6,4.9,3.4,6.8,5.4c1,1,1.8,2.1,2.7,3.1c0.8,1.1,1.5,2.1,2.1,3.2c0.6,1.1,1.2,2.1,1.6,3.1
                                c0.4,1,0.9,2,1.2,3c0.3,1,0.6,1.9,0.8,2.7c0.2,0.9,0.3,1.6,0.5,2.4c0.1,0.4,0.1,0.7,0.2,1c0,0.3,0.1,0.6,0.1,0.9
                                c0.1,0.6,0.1,1,0.1,1.4C74,39.6,74,40,74,40c0.2,2.2-1.5,4.1-3.7,4.3s-4.1-1.5-4.3-3.7c0-0.1,0-0.2,0-0.3l0-0.4c0,0,0-0.3,0-0.9
                                c0-0.3,0-0.7,0-1.1c0-0.2,0-0.5,0-0.7c0-0.2-0.1-0.5-0.1-0.8c-0.1-0.6-0.1-1.2-0.2-1.9c-0.1-0.7-0.3-1.4-0.4-2.2
                                c-0.2-0.8-0.5-1.6-0.7-2.4c-0.3-0.8-0.7-1.7-1.1-2.6c-0.5-0.9-0.9-1.8-1.5-2.7c-0.6-0.9-1.2-1.8-1.9-2.7c-1.4-1.8-3.2-3.4-5.2-4.9
                                c-2-1.5-4.4-2.7-6.9-3.6c-0.6-0.2-1.3-0.4-1.9-0.6c-0.7-0.2-1.3-0.3-1.9-0.4c-1.2-0.3-2.8-0.4-4.2-0.5l-2,0c-0.7,0-1.4,0.1-2.1,0.1
                                c-0.7,0.1-1.4,0.1-2,0.3c-0.7,0.1-1.3,0.3-2,0.4c-2.6,0.7-5.2,1.7-7.5,3.1c-2.2,1.4-4.3,2.9-6,4.7c-0.9,0.8-1.6,1.8-2.4,2.7
                                c-0.7,0.9-1.3,1.9-1.9,2.8c-0.5,1-1,1.9-1.4,2.8c-0.4,0.9-0.8,1.8-1,2.6c-0.3,0.9-0.5,1.6-0.7,2.4c-0.2,0.7-0.3,1.4-0.4,2.1
                                c-0.1,0.3-0.1,0.6-0.2,0.9c0,0.3-0.1,0.6-0.1,0.8c0,0.5-0.1,0.9-0.1,1.3C10,39.6,10,40,10,40z"
                            >
                                <animateTransform
                                    attributeType="xml"
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 40 40"
                                    to="360 40 40"
                                    dur="0.8s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <path 
                                fill="#D43B11" 
                                d="M62,40.1c0,0,0,0.2-0.1,0.7c0,0.2,0,0.5-0.1,0.8c0,0.2,0,0.3,0,0.5c0,0.2-0.1,0.4-0.1,0.7
                                c-0.1,0.5-0.2,1-0.3,1.6c-0.2,0.5-0.3,1.1-0.5,1.8c-0.2,0.6-0.5,1.3-0.7,1.9c-0.3,0.7-0.7,1.3-1,2.1c-0.4,0.7-0.9,1.4-1.4,2.1
                                c-0.5,0.7-1.1,1.4-1.7,2c-1.2,1.3-2.7,2.5-4.4,3.6c-1.7,1-3.6,1.8-5.5,2.4c-2,0.5-4,0.7-6.2,0.7c-1.9-0.1-4.1-0.4-6-1.1
                                c-1.9-0.7-3.7-1.5-5.2-2.6c-1.5-1.1-2.9-2.3-4-3.7c-0.6-0.6-1-1.4-1.5-2c-0.4-0.7-0.8-1.4-1.2-2c-0.3-0.7-0.6-1.3-0.8-2
                                c-0.2-0.6-0.4-1.2-0.6-1.8c-0.1-0.6-0.3-1.1-0.4-1.6c-0.1-0.5-0.1-1-0.2-1.4c-0.1-0.9-0.1-1.5-0.1-2c0-0.5,0-0.7,0-0.7
                                s0,0.2,0.1,0.7c0.1,0.5,0,1.1,0.2,2c0.1,0.4,0.2,0.9,0.3,1.4c0.1,0.5,0.3,1,0.5,1.6c0.2,0.6,0.4,1.1,0.7,1.8
                                c0.3,0.6,0.6,1.2,0.9,1.9c0.4,0.6,0.8,1.3,1.2,1.9c0.5,0.6,1,1.3,1.6,1.8c1.1,1.2,2.5,2.3,4,3.2c1.5,0.9,3.2,1.6,5,2.1
                                c1.8,0.5,3.6,0.6,5.6,0.6c1.8-0.1,3.7-0.4,5.4-1c1.7-0.6,3.3-1.4,4.7-2.4c1.4-1,2.6-2.1,3.6-3.3c0.5-0.6,0.9-1.2,1.3-1.8
                                c0.4-0.6,0.7-1.2,1-1.8c0.3-0.6,0.6-1.2,0.8-1.8c0.2-0.6,0.4-1.1,0.5-1.7c0.1-0.5,0.2-1,0.3-1.5c0.1-0.4,0.1-0.8,0.1-1.2
                                c0-0.2,0-0.4,0.1-0.5c0-0.2,0-0.4,0-0.5c0-0.3,0-0.6,0-0.8c0-0.5,0-0.7,0-0.7c0-1.1,0.9-2,2-2s2,0.9,2,2C62,40,62,40.1,62,40.1z"
                            >
                                <animateTransform
                                    attributeType="xml"
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 40 40"
                                    to="-360 40 40"
                                    dur="0.6s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </svg>
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
                isProcessing: false,
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
                    user_id: null,
                    type_id: null
                }
            }
        },
        mounted(){
            this.eProviderData.type_id = 3;
            console.log(this.eProviderData.type_id);
            setTimeout(() =>{
                this.user = this.getUser;
                this.eProviderData.user_id = this.user.id;
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
                this.isProcessing = true;
                this.registerEProviderAction(event).then(result => {
                    if (result.type === 'success') {
                        this.$router.push({ name: 'Home' });
                    } else {
                        this.toggleSnackBarAction(result)
                    }
                }).finally(() =>{
                     this.isProcessing = false;
                  });
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

                this.eProviderData.type_id = this.isAWorker() ? 2 : 3;
            }
        }
    }
</script>