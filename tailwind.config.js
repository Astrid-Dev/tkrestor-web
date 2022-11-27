const colors = require('tailwindcss/colors')
// const path = require('path');
module.exports = {
    purge: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/litepie-datepicker/**/*.js',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'poppins': ['"Poppins"'],
                'tajawal': ['"Tajawal"'],
            },
            colors: {
                'main-color': {
                    50: 'var(--main-color-50)',
                    100: 'var(--main-color-100)',
                    200: 'var(--main-color-200)',
                    300: 'var(--main-color-300)',
                    400: 'var(--main-color-400)',
                    500: 'var(--main-color-500)',
                    600: 'var(--main-color-600)',
                    700: 'var(--main-color-700)',
                    800: 'var(--main-color-800)',
                    900: 'var(--main-color-900)',
                },
                'accent-color': {
                    50: 'var(--accent-color-50)',
                    100: 'var(--accent-color-100)',
                    200: 'var(--accent-color-200)',
                    300: 'var(--accent-color-300)',
                    400: 'var(--accent-color-400)',
                    500: 'var(--accent-color-500)',
                    600: 'var(--accent-color-600)',
                    700: 'var(--accent-color-700)',
                    800: 'var(--accent-color-800)',
                    900: 'var(--accent-color-900)',
                },
                'second-color': {
                    50: 'var(--second-color-50)',
                    100: 'var(--second-color-100)',
                    200: 'var(--second-color-200)',
                    300: 'var(--second-color-300)',
                    400: 'var(--second-color-400)',
                    500: 'var(--second-color-500)',
                    600: 'var(--second-color-600)',
                    700: 'var(--second-color-700)',
                    800: 'var(--second-color-800)',
                    900: 'var(--second-color-900)',
                },
                'litepie-primary': {
                    50: 'var(--main-color-50)',
                    100: 'var(--main-color-100)',
                    200: 'var(--main-color-200)',
                    300: 'var(--main-color-300)',
                    400: 'var(--main-color-500)',
                    500: 'var(--main-color-600)',
                    600: 'var(--main-color-700)',
                    700: 'var(--main-color-800)',
                    800: 'var(--main-color-900)',
                    900: 'var(--main-color-900)',
                }, // color system for light mode
                'litepie-secondary': {
                    50: 'var(--accent-color-50)',
                    100: 'var(--accent-color-100)',
                    200: 'var(--accent-color-200)',
                    300: 'var(--accent-color-300)',
                    400: 'var(--accent-color-500)',
                    500: 'var(--accent-color-600)',
                    600: 'var(--accent-color-700)',
                    700: 'var(--accent-color-800)',
                    800: 'var(--accent-color-900)',
                    900: 'var(--accent-color-900)',
                }, // color system for dark mode
            },
        },
    },
    variants: {
        extend: {
            outline: ['hover', 'active', 'focus'],
            opacity: ['disabled'],
        },
        scrollbar: ['rounded'],
        space: ['responsive', 'direction'],
        fontFamily: ['direction'],
        inset: ['direction'],
        translate: ['direction'],
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar'),
        require('tailwindcss-dir')(),
    ],
}
