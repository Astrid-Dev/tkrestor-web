export const categories = [
    { id: '1', name: 'Dashboard', current: true, count: 5 },
    { id: '2', name: 'Team', current: false, count: 1 },
    { id: '3', name: 'Projects', current: false, count: 19 },
    { id: '4', name: 'Calendar', current: false, count: 20 },
    { id: '5', name: 'Documents', current: false },
    { id: '6', name: 'Reports', current: false },
]

export const faqs = [
    {
        answer: 'What Documents are you looking for',
        question: 'What\'s the best thing about Switzerland?',
    },
    {
        question: 'What\'s the best thing about Switzerland?',
        answer:
            'I don\'t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    }, {
        question: 'What\'s the best thing about Switzerland?',
        answer:
            'I don\'t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    }, {
        question: 'What\'s the best thing about Switzerland?',
        answer:
            'I don\'t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    }, {
        question: 'What\'s the best thing about Switzerland?',
        answer:
            'I don\'t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
    },
    // More questions...
]

export const bookingStatuses = [
    { id: '1', status: 'Received', current: true },
    { id: '2', status: 'Accepted', current: false },
    { id: '3', status: 'On The Way', current: false },
    { id: '4', status: 'Ready', current: false },
    { id: '5', status: 'In Progress', current: false },
    { id: '6', status: 'Done', current: false },
    { id: '7', status: 'Failed', current: false },
]

export const bookings = [
    {
        id: '1',

        eService: { name: 'Scree - new and repair', price: 10, image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg' },
        eProvider: { name: 'Germ Company', phone: '+14417710382' },
        user: { name: 'John doe', address: 'Lorem ipsum dolor sit am' },
        address: { address: 'Lorem ipsum dolor sit am', latitude: '40.366', longitude: '5.366' },
        bookingStatus: { id: '1', status: 'Received' },
        paymentStatus: { id: '1', status: 'Not Paid' },
        hint: 'Lorem',
        bookingAt: '10 October 2021 | 14:47',
        startAt: '10 October 2021 | 14:47',
        endAt: '10 October 2021 | 14:47',
        total: 100,
        subtotal: 90,
        tax: 10,
        quantity: 1,
        cancelled: false,
    },
    {
        id: '2',

        eService: { name: 'Screen - new and repair', price: 10, image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg' },
        eProvider: { name: 'Germ Company', phone: '+14417710382' },
        user: { name: 'John doe', address: 'Lorem ipsum dolor sit am' },
        address: { address: 'Lorem ipsum dolor sit am', latitude: '40.366', longitude: '5.366' },
        bookingStatus: { id: '1', status: 'Received' },
        paymentStatus: { id: '1', status: 'Not Paid' },
        hint: 'Lorem',
        bookingAt: '10 October 2021 | 14:47',
        startAt: '10 October 2021 | 14:47',
        endAt: '10 October 2021 | 14:47',
        total: 100,
        subtotal: 90,
        tax: 10,
        quantity: 1,
        cancelled: false,
    },
]

export const paymentMethods = [
    {
        id: '1',
        name: 'Dollar Wallet',
        description: 'Lorem ipsum dolor sit am',
        image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
    },
    {
        id: '2',
        name: 'PayPal',
        description: 'Lorem ipsum dolor sit am',
        image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-02.jpg',
    },
    {
        id: '3',
        name: 'Cash',
        description: 'Lorem ipsum dolor sit am',
        image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-03.jpg',
    },
    {
        id: '4',
        name: 'Stripe',
        description: 'Lorem ipsum dolor sit am',
        image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-02.jpg',
    },
    {
        id: '5',
        name: 'RazorPay',
        description: 'Lorem ipsum dolor sit am',
        image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg',
    },
]