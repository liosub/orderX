import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_NEW_API_URL


export const addProfile = async (data) => {
    return request({
        url: `${BaseUrl}profile/create`,
        method: "POST",
        data
    },true,true)
}