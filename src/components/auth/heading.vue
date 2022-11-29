<template>
  <router-link as='div' class='flex flex-shrink-0 items-center justify-center cursor-pointer' to='/'>
    <img :alt='this.$settings["app_name"]'
         :src='this.$settings["app_logo"]' class='w-auto h-14 lg:block' />
    <span class='mx-3 font-bold text-second-color-600'>{{ this.$settings['app_name'] }}</span>
  </router-link>
<!--  <div class='sm:mx-auto sm:w-full sm:max-w-md'>-->
<!--    <img :alt='this.$settings["app_name"]' :src='this.$settings["app_logo"]'-->
<!--         class='mx-auto h-14 w-auto' /> -->

<!--    <img :alt='this.$settings["app_name"]'-->
<!--         :src='this.$settings["app_logo"]' class='w-auto h-12 lg:block' />-->
<!--    <span class='mx-3 font-bold text-second-color-600'>{{ this.$settings['app_name'] }}</span>-->
<!--  </div>-->
</template>