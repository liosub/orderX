import axios from "axios"
import Cookies from "js-cookie"
import { getToken } from "../utils"
import i18n from 'i18next';
import qs from 'qs'
const baseUrl = process.env.REACT_APP_STLLR_API_URL

var client = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

client.interceptors.response.use(response => {
    return response
}, (error) => {
    if (401 === error.response.status) {
        Cookies.remove("token")
        const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })
        window.location.href = `/login?redirect_to=${encodeURIComponent(query.redirect_to || window.location.href)}`;
    }
    else return Promise.reject(error)
})

export const request = async (options, isAuth = false,isFormData=false) => {
    const onSuccess = (response) => {
        return response.data
    }

    const onError = (error) => {
        if (undefined !== error.response && error.response.status === 401) {
            Cookies.remove("token")
            window.location.href = `/login?redirect_to=${encodeURIComponent(window.location.href)}`;
        }
        return Promise.reject(error.response || error.message);
    }

    if (isAuth) {
        options.headers = {
            "Authorization": `Bearer ${getToken()}`
        }
    }
    if(isFormData){
        options.headers ={
            "Content-Type":"multipart/form-data",
            "Authorization": `Bearer ${getToken()}`
        }
    }
    options.params = {
        ...(options.params || {}),
    }

    return client(options).then(onSuccess).catch(onError)
}