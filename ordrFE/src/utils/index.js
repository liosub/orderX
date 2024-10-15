import Cookies from "js-cookie"

const getToken = () => {
    return Cookies.get("token")
}

const setToken = (name, opts) => {
    Cookies.set(name, `${opts.value}`)
}

const signout = () => {
    Cookies.remove("token")
    window.location.href = process.env.REACT_APP_STLLR_URL
}

export { getToken, setToken, signout }