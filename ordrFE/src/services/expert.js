import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_API_URL


export const fetchExperts = async ({ id, id_str, uid }) => {
    const params = { id, id_str, uid }
    return request({
        url: `${BaseUrl}v1/experts`,
        params,
    }, true)
}

export const publicFetchExperts = async ({ id, id_str, uid }) => {
    const params = { id, id_str, uid }
    return request({
        url: `${BaseUrl}v1/public/experts`,
        params,
    }, true)
}

export const fetchPaginatedExperts = async (page = 1, filters, seed) => {
    let qs = `${filters ? filters+'&' : '?'}page=${page}&pageSize=8`
    qs += seed ? `&seed=${seed}` : ``
    return request({
        url: `${BaseUrl}v1/experts/filters${qs}`
    }, true)
}

export const fetchFilters = async (filters) => {
    return request({
        url: `${BaseUrl}v1/experts/filters?${filters}`,
    }, true)
}

export const fetchSectors = async () => {
    return request({
        url: `${BaseUrl}v1/sectors`
    })
}

export const fetchServices = async () => {
    return request({
        url: `${BaseUrl}v1/services`
    })
}

export const submitRating = async (data, expertId, project_id ) => {
    return request({
        url: `${BaseUrl}v1/review/${data.expert}`,
        method: "POST",
        data : {
            project_id, ...data
        }
    }, true)
}

export const updateProfileViews = async (profileId) => {
    return request({
        url: `${BaseUrl}v1/update_views/${profileId}`,
        method: "POST",
    }, true)
}

// export const serviceExperts = async (service_id) => {
//     console.log(service_id)
//     return request({
//         url: `${BaseUrl}v1/service_experts`,
//         method: "GET",
//         data: service_id
//     }, true)
// }
export const fetchReplaceReasons = async () => {
    return request({
        url: `${BaseUrl}v1/replace_reasons`,
        method: "GET",
    }, true)
}

export const fetchRandomExperts = async () => {
    return request({
        url: `${BaseUrl}v1/experts/random`,
        method: "GET",
    }, true)
}
