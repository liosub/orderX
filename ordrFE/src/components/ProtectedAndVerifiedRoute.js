import React, { useState } from "react"
import { fetchUser } from "../services"
import { useQuery } from "react-query"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import { getToken } from "../utils"
import { WelcomMessage, Checklist } from "."
import { useLocation } from 'react-router-dom'
import qs from 'qs'

function ProtectedAndVerifiedRoute({ component: Component, ...rest }) {
    const isAuth = getToken()
    const [isVerified, setIsVerified] = useState(null)
    const { search: queryString } = useLocation();
    const { redirect_to } = qs.parse(queryString, { ignoreQueryPrefix: true });

    // const { isLoading, data } = useQuery("user", fetchUser, {
    //     select: data => data.data,
    //     onSuccess: (data) => setIsVerified(data.is_verified)
    // })

    // if (isLoading) return <div></div>

    return (<>
        <Route
            {...rest}
            render={(props) => (
                isAuth ?
                    <Component {...props} />
                    : <Redirect to="/logintest" />
            )}
        />
    </>
    )
}

export default ProtectedAndVerifiedRoute