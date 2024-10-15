import React, { useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'qs'
import Cookies from "js-cookie"

const OAuth = () => {
    const history = useHistory();
    const { search } = useLocation()
    const { access_token, e: error } = qs.parse(search, { ignoreQueryPrefix: true })

    useEffect(() => {
        if (access_token) {
            Cookies.set("token", access_token)
            window.location.href = '/'
        }
        else if (error) {
            alert('Oops, something went wrong. Please try again later.', 'error')
            setTimeout(() => history.push('/'), 1500)
        }
        else {
            alert('Access token is missing', 'error')
            setTimeout(() => history.push('/'), 1500)
        }
    }, [])

    return (
        `redirecting..`
    )
}

export default OAuth