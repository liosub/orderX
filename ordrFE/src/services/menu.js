import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_NEW_API_URL

export const createMenu = async (data) => {
    return request({
        url: `${BaseUrl}menu/createMany`,
        method: "POST",
        data
    }, true, true)
}

export const getMenuInfo = async () => {
    return request({
        url: `${BaseUrl}menu`,
        method: "GET",
    }, true, true)
}

export const getMenu = async () => {
    return request({
        url: `${BaseUrl}items`,
        method: "GET",
    }, true, true)
}

export const removeBeforeUpdate = async (menuId,data) => {
    return request({
        url: `${BaseUrl}items/itemX/${menuId}`,
        method: "POST",
        data:JSON.stringify(data)
    }, true)
}

export const getGuestMenu = async (profileId) => {
    return request({
        url: `${BaseUrl}items/guest/${profileId}`,
        method: "POST",
    }, true, true)
}

export const getGuestProfile = async (profileId) => {
    return request({
        url: `${BaseUrl}profile/guest/${profileId}`,
        method: "POST",
    }, true)
}