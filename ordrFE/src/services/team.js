import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_API_URL

export const fetchTeams = async (teamId=null, filters) => {
    let qs = teamId ? `?slug=${teamId}` : `${filters}` || ``
    return request({
        url: `${BaseUrl}v1/teams${qs}`
    }, true)
}

export const startProject = async (data) => {
    return request({
        url: `${BaseUrl}v1/checkout/team`,
        method: "POST",
        data
    }, true)
}

export const startPackageChat = async (data) => {
    return request({
        url: `${BaseUrl}v1/chat/package`,
        method: "POST",
        data
    }, true)
}

export const requestTeamOffer = async (data) => {
    return request({
        url: `${BaseUrl}v1/request/team-offer`,
        method: "POST",
        data
    }, true)
}

export const fetchPublicPackage = async (id) => {
    return request({
        url: `${BaseUrl}v1/public/packages`,
        params: { id }
    })
}

export const updateTeamViews = async (teamId) => {
    console.log("In the service")
    return request({
        url: `${BaseUrl}v1/update_team_views/${teamId}`,
        method: "POST",
    }, true)
}

export const fetchRandomTeams = async (teamId=null, filters) => {
    let qs = teamId ? `?id=${teamId}` : filters || ``
    return request({
        url: `${BaseUrl}v1/random_teams${qs}`
    }, true)
}

export const submitPackageRating = async (data, team_id, project_id, expert_id ) => {
    return request({
        url: `${BaseUrl}v1/package_review`,
        method: "POST",
        data : {
            team_id, project_id, expert_id,  ...data
        }
    }, true)
}

export const getRandomPackages = async () => {
    return request({
        url: `${BaseUrl}v1/packages/random`,
        method: 'GET',
    }, true)
}

export const fetchPackages = async (teamId=null, filters) => {
    let qs = teamId ? `?slug=${teamId}` : `${filters}` || ``
    return request({
        url: `${BaseUrl}v1/company-packages${qs}`
    }, true)
}