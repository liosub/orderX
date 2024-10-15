import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_API_URL


export const fetchMessageNotifications = async () => {
    return request({
      url: `${BaseUrl}v1/message/notifications`,
    }, true)
  }
  