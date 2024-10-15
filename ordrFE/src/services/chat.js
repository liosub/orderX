import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_API_URL


export const sendMsg = async (data, lead) => {
    return request({
        url: `${BaseUrl}v1/comet_init`,
        method: "POST",
        data: {
            experts_ids: data,
            lead
        }
    }, true)
}



export const getChats = async (params) => {
    return request({
        url: `${BaseUrl}v1/message/conversations`,
        method: "GET",
        params
    }, true)
}