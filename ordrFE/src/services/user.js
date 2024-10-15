import { request } from "../utils/Request"
const BaseUrl = process.env.REACT_APP_STLLR_NEW_API_URL

export const login = async (data) => {
    return request({
        url: `${BaseUrl}signin`,
        method: "POST",
        data
    })
}

export const LinkedInAuth = async () => {
    return request({
        url: `${BaseUrl}v1/li_login`,
        method: "POST",
    })
}

export const signup = async (data) => {
    return request({
        url: `${BaseUrl}signup`,
        method: "POST",
        data
    })
}

export const signupcontinue = async (data) => {
    return request({
        url: `${BaseUrl}v1/signup/continue`,
        method: 'POST',
        data,
    }, true)
}

export const addLead = async (data) => {
    return request({
        url: `${BaseUrl}v1/lead`,
        method: "POST",
        data: { lead: data }
    }, true)
}

export const fetchUser = async () => {
    return request({
        url: `${BaseUrl}profile/me`
    }, true)
}

export const fetchUserByEmail = async (email) => {
    let qs = email ? `?email=${email}` : ''
    return request({
        url: `${BaseUrl}v1/customers${qs}`
    }, true)
}

export const verifyUser = async (data) => {
    return request({
        url: `${BaseUrl}v1/verify`,
        method: "POST",
        data
    }, true)
}

export const resendVerificationCode = async (data) => {
    return request({
        url: `${BaseUrl}v1/resend_code`,
        method: "POST",
        data
    }, true)
}

export const saveOnboarding = async (data) => {
    return request({
        url: `${BaseUrl}v1/save_onboarding`,
        method: "POST",
        data
    }, true)
}

export const changePassword = async (data) => {
    return request({
        url: `${BaseUrl}v1/change_password`,
        method: 'POST',
        data
    }, true)
}

export const changeEmail = async (data) => {
    return request({
        url: `${BaseUrl}v1/email`,
        method: 'PUT',
        data
    }, true)
}

export const updateUser = async (data) => {
    return request({
        url: `${BaseUrl}v1/account`,
        method: 'PUT',
        data
    }, true)
}

export const fetchBillings = async (projectId) => {
    return request({
        url: `${BaseUrl}v1/billings`,
        method: 'GET',
        params: { project_id: projectId ? projectId : null }
    }, true)
}

export const sendResetCode = async (email) => {
    return request({
        url: `${BaseUrl}v1/send_reset_code`,
        method: 'POST',
        data: { email }
    })
}

export const verifyResetCode = async (data) => {
    return request({
        url: `${BaseUrl}v1/verify_reset_code`,
        method: 'POST',
        data,
    })
}

export const resetPassword = async (data) => {
    return request({
        url: `${BaseUrl}v1/reset_password`,
        method: 'POST',
        data,
    })
}

export const fetchCompanyBrief = async () => {
    return request({
        url: `${BaseUrl}v1/brief`
    }, true)
}

export const fetchBriefBlocks = async (companyId) => {
    if (companyId) {
        return request({
            url: `${BaseUrl}v1/user/briefs`,
            params: { user_id: companyId }
        }, true)
    } else {
        return request({
            url: `${BaseUrl}v1/user/briefs`
        }, true)
    }
}

export const submitBriefBlock = async (brief_block_id, answers, companyId) => {
    if (companyId) {
        return request({
            url: `${BaseUrl}v1/user/briefs/${brief_block_id}`,
            method: 'POST',
            data: { answers, user_id: companyId }
        }, true)
    } else {
        return request({
            url: `${BaseUrl}v1/user/briefs/${brief_block_id}`,
            method: 'POST',
            data: { answers }
        }, true)
    }
}

export const updateBriefBlock = async (brief_block_id, answers, companyId) => {
    if (companyId) {
        return request({
            url: `${BaseUrl}v1/user/briefs/${brief_block_id}`,
            method: 'PUT',
            data: { answers, user_id: companyId }
        }, true)
    } else {
        return request({
            url: `${BaseUrl}v1/user/briefs/${brief_block_id}`,
            method: 'PUT',
            data: { answers }
        }, true)
    }
}

export const fetchBriefBlock = async (brief_block_id, companyId) => {
    if (companyId) {
        return request({
            url: `${BaseUrl}v1/user/briefs/${brief_block_id}`,
            params: { user_id: companyId }
        }, true)
    } else {
        return request({
            url: `${BaseUrl}v1/user/briefs/${brief_block_id}`,
        }, true)
    }
}

export const fetchNotifications = async () => {
    return request({
        url: `${BaseUrl}v1/project_notifications`,
    }, true)
}

export const sendInvitation = async (data) => {
    return request({
        url: `${BaseUrl}v1/company/members`,
        method: 'POST',
        data,
    }, true)
}

export const getInvited = async () => {
    return request({
        url: `${BaseUrl}v1/company/members`,
        method: 'GET',
    }, true)
}

export const deleteInvited = async (data) => {
    return request({
        url: `${BaseUrl}v1/company/members`,
        method: 'DELETE',
        data,
    }, true)
}

export const getInviter = async () => {
    return request({
        url: `${BaseUrl}v1/company/inviter`,
        method: 'GET',
    }, true)
}

export const referCompany = async (data) => {
    return request({
        url: `${BaseUrl}v1/refer-company`,
        method: 'POST',
        data,
    }, true)
}

export const fetchSimilarExperts = async (expertId) => {
    return request({
        url: `${BaseUrl}v1/similar/experts`,
        params: { expertId }
    }, true)
}

export const fetchAllIndustries = async () => {
    return request({
        url: `${BaseUrl}v1/sectors`
    })
}

export const requestCall = async () => {
    return request({
        url: `${BaseUrl}v1/request_call`,
        method: 'POST'
    }, true)
}

export const fetchOnboardingProgress = async () => {
    return request({
        url: `${BaseUrl}v1/user/onboarding-progress`
    }, true)
}

export const getProjectsCount = async () => {
    return request({
        url: `${BaseUrl}v1/projects/count`,
        method: 'GET',
    }, true)
}

export const submitCustomBriefBlock = async (brief_block_id, answers, project_id) => {
    return request({
        url: `${BaseUrl}v1/user/custom/briefs/${brief_block_id}`,
        method: 'POST',
        data: { answers, project_id }
    }, true)
}

export const getPackagesCount = async () => {
    return request({
        url: `${BaseUrl}v1/packages/count`,
        method: 'GET',
    }, true)
}

export const recordActivity = async (data) => {
    return request({
        url: `${BaseUrl}v1/activity`,
        method: 'POST',
        data
    }, true)
}

export const recordPageVisit = async (data) => {
    return request({
        url: `${BaseUrl}v1/page_visit`,
        method: 'POST',
        data,
    }, true)
}

export const addJobPost = async (data) => {
    return request({
        url: `${BaseUrl}v1/company/posts`,
        method: "POST",
        data
    }, true)
}

export const editJobPost = async (data, id) => {
    return request({
        url: `${BaseUrl}v1/company/posts/${id}`,
        method: "PUT",
        data
    }, true)
}

export const deleteJobPost = async (id) => {
    return request({
        url: `${BaseUrl}v1/company/posts/${id}`,
        method: "DELETE"
    }, true)
}

export const getMyPosts = async (id) => {
    return request({
        url: `${BaseUrl}v1/company/posts`,
        method: 'GET',
        params: { id }
    }, true)
}

export const getMyPostOffers = async (id) => {
    return request({
        url: `${BaseUrl}v1/company/posts/${id}/offers`,
        method: 'GET',
    }, true)
}

export const postOfferRespond = async (post_id, data) => {
    return request({
        url: `${BaseUrl}v1/company/posts/${post_id}/offers`,
        method: 'PUT',
        data
    }, true)
}

export const getCurrencyRates = async (base) => {
    return request({
        url: `${BaseUrl}v1/currency/rates`,
        method: 'GET',
        params: { base }
    }, true)
}

export const deleteUserAccount = async (data) => {
    return request({
        url: `${BaseUrl}v1/delete_account`,
        method: "POST",
        data
    }, true)
}

export const fetchGeoLocation = async () => {
    const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`);
    return response.json();
};

export const blockExpert = async (expert_id) => {
    return request({
        url: `${BaseUrl}v1/block/${expert_id}`,
        method: "POST",
    }, true)
}

export const unblockExpert = async (expert_id) => {
    return request({
        url: `${BaseUrl}v1/unblock/${expert_id}`,
        method: "DELETE",
    }, true)
}