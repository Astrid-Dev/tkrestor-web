export const mapHtmlForm = (event) => {
    let map = {}
    Object.keys(event.target).map(function(key, index) {
        if (event.target[key].name) {
            if (event.target[key].type === 'checkbox') {
                map[event.target[key].name] = event.target[key].value === 'on'
            } else {
                map[event.target[key].name] = event.target[key].value
            }
        }
    })
    return map
}

/*
* Get the real price of the service
* when the discount not set, then it return the price
* otherwise it return the discount price instead
* */
export const swipePrices = (eService) => {
    if (eService?.discount_price > 0) {
        const price = eService.price
        eService.price = eService.discount_price
        eService.discount_price = price
    }
    return eService
}

export const filterOptionsByEService = (responseData, eServiceId) => {
    return responseData.map(function(element) {
        element.options = element.options.filter((option) => option.e_service_id.toString() === eServiceId)
        return element
    })
}

export const prepareBooking = (booking) => {
    const newBooking = { ...booking }
    newBooking.options = newBooking.options.map(function(element) {
        return element.id
    })
    newBooking.e_service = newBooking.e_service.id
    return newBooking
}

export const prepareReadNotification = (notification) => {
    return { id: notification.id, read_at: true }
}
