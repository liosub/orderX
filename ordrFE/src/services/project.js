import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_API_URL

export const fetchProjects = async ({ order_by_last_message }) => {
  let qs = order_by_last_message ? `?order_by_last_message=1` : ``
  return request({
    url: `${BaseUrl}v1/projects${qs}`,
  }, true)
}

export const fetchProject = async (projectId, is_uid = false) => {
  let currency_id = JSON.parse(localStorage.getItem('user_currency')).id

  return request({
    url: `${BaseUrl}v1/project/${projectId}`,
    params: { is_uid, currency_id }
  }, true)
}

export const updateProject = async (data, projectId) => {
  return request({
    url: `${BaseUrl}v1/project/${projectId}`,
    method: "PUT",
    data
  }, true)
}

export const submitBrief = async (data) => {
  return request({
    url: `${BaseUrl}v1/project/brief`,
    method: "POST",
    data
  }, true)
}

export const sendProjectModificationRequest = async (meta, projectId) => {
  return request({
    url: `${BaseUrl}v1/project/modify/${projectId}`,
    data: { lead: meta },
    method: "POST"
  }, true)
}

export const pauseStripeRenewal = async (projectId) => {
  return request({
    url: `${BaseUrl}v1/project/pause/${projectId}`,
    method: "POST"
  }, true)
}

export const markAsFinished = async (projectId) => {
  return request({
    url: `${BaseUrl}v1/project/close/${projectId}`,
    method: "POST"
  }, true)
}

export const replaceExperts = async ({ project_id, ...data }) => {
  return request({
    url: `${BaseUrl}v1/project/replace_experts/${project_id}`,
    method: 'POST',
    data
  }, true)
}

export const updateMilestone = async ({ project_id, ...data }) => {
  return request({
    url: `${BaseUrl}v1/milestone/${project_id}`,
    method: "PUT",
    data
  }, true)
}

export const updateProjectOffer = async ({ project_id, ...data }) => {
  return request({
    url: `${BaseUrl}v1/project/offer/${project_id}`,
    method: "PUT",
    data
  }, true)
}

export const updateProjectTeamOffer = async ({ project_id, ...data }) => {
  return request({
    url: `${BaseUrl}v1/project/team_offer/${project_id}`,
    method: "PUT",
    data
  }, true)
}

export const getOffers = async ({ offset, limit, is_post }) => {
  let currency_id = JSON.parse(localStorage.getItem('user_currency')).id

  return request({
    url: `${BaseUrl}v1/offers`,
    method: "GET",
    params: { offset, limit, is_post, currency_id }
  }, true)
}

export const updateOffer = async (data) => {
  return request({
    url: `${BaseUrl}v1/offers`,
    method: "PUT",
    data
  }, true)
}
