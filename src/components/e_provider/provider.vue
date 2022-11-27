<template>
  <section>
    <div class='overflow-hidden p-8 bg-white rounded-lg divide-y divide-gray-100 shadow-lg'>
      <div class='pb-4 sm:flex sm:items-center sm:justify-between'>
        <h2 class='text-xl font-bold text-second-color-600 truncate'>{{ $t('Service Provider') }}</h2>
        <a class='hidden text-sm font-semibold text-center text-main-color-600 hover:text-main-color-800 sm:block' href='#'>{{ $t('View More') }}</a>
      </div>
      <div class='flex relative items-center pt-4 space-x-4 rtl:space-x-reverse'>
        <div class='flex-shrink-0'>
          <img alt='' class='w-16 h-16 rounded' src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  " />
        </div>
        <div class='flex-1 min-w-0'>
          <a class='focus:outline-none' href='#'>
            <span aria-hidden='true' class='absolute inset-0' />
            <p class='text-sm font-bold text-second-color-600'>
              Roofing Jones
            </p>
            <p class='text-sm text-gray-500 line-clamp-3'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet deserunt dicta, dolorem eius fuga iure maxime molestiae, molestias neque numquam
              odit quas quibusdam quis quisquam repellat repudiandae suscipit tempora, tenetur!
            </p>
          </a>
        </div>
      </div>


    </div>
  </section>
</template>

<script>
export default {
  name: 'Provider',
}
</script>