import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { fetchUser } from "../services"

const Auth = React.createContext()

const AuthProvider = props => {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({ isLoading: true })
    const token = Cookies.get("token")

    useEffect(() => {
        setAuth(token ? true : false)
    }, [auth])

    useEffect(() => {
        if (token) {
            // get user information
            fetchUser().then(res => {
                setUser(res)
            }).catch(e => {
                console.log(e)
                setUser({ error: true })
            })
                .catch(e => console.log(e))
        }
    }, [])

    const refetchUser = () => {
        if (token) {
            fetchUser()
                .then(res => {
                    setUser(res)
                })
                .catch(e => {
                    console.log(e)
                    setUser({ error: true })
                })
        }
    }

    if (token && user?.isLoading) {
        return <div></div>
    }

    const authContextValue = { auth, user, setAuth, refetchUser }
    return <Auth.Provider value={authContextValue} {...props} />
}

const useAuth = () => React.useContext(Auth);

export { AuthProvider, useAuth }