import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_API_URL

export const initStripePayment = async (data) => {
    return request({
        url: `${BaseUrl}v1/payment/init`,
        method: "POST",
        data
    }, true)
}

export const fetchPaymentRequests = async () => {
    return request({
        url: `${BaseUrl}v1/payment-requests`,
    }, true)
}

export const approvePaymentRequest = async (data) => {
    return request({
        url: `${BaseUrl}v1/request_approve`,
        method: "POST",
        data
    }, true)
}

export const rejectPaymentRequest = async (data) => {
    return request({
        url: `${BaseUrl}v1/request/reject`,
        method: "POST",
        data
    }, true)
}

export const initStripeSubscription = async (data) => {
    return request({
        url: `${BaseUrl}v1/subscription/init`,
        method: "POST",
        data
    }, true)

}

export const initStripeReplacePayment = async (data) => {
    return request({
        url: `${BaseUrl}v1/replace_payment/init`,
        method: "POST",
        data
    }, true)
}

export const initStripeExpertBonus = async (data) => {
    return request({
        url: `${BaseUrl}v1/expert_bonus/init`,
        method: "POST",
        data
    }, true)
}

export const retryStripeSubscription = async (data) => {
    return request({
        url: `${BaseUrl}v1/subscription/retry`,
        method: "POST",
        data
    }, true)
}

export const initSubscriptionPortal = async (data) => {
    return request({
        url: `${BaseUrl}v1/subscription/portal`,
        method: "POST",
        data
    }, true)
}