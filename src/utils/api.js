import { faqs, categories, bookingStatuses, bookings, paymentMethods } from './mock-data'

export const getFaqs = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...faqs])
        }, 1000)
    })
}

export const getFaqCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...categories])
        }, 1000)
    })
}

export const getBookingsStatuses = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...bookingStatuses])
        }, 1000)
    })
}

export const getPaymentsMethods = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...paymentMethods])
        }, 1000)
    })
}

export const getBookings = (statusId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...bookings])
        }, 1000)
    })
}
/*
export const getUser = (id) => {
    const user = users.find(user => user.id == id);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(user);
        }, 2000);
    });
};
export const addUser = (user) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            users.push(user);
            resolve(user);
        }, 1000);
    });
};*/
