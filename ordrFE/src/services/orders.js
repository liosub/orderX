import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_NEW_API_URL


export const getAllOrders = async () => {
    return request({
        url: `${BaseUrl}orders/analysis/total`,
        method: "POST",
    }, true)
}



export const getCustomersOrders = async () => {
    return request({
        url: `${BaseUrl}orders/analysis/customerInfo`,
        method: "POST",
    }, true)
}

export const checkoutOrder = async (data) => {
    return request({
        url: `${BaseUrl}orders`,
        method: "POST",
        data
    })
}