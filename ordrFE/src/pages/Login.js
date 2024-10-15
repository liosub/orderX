import React, { useContext, useEffect } from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { login } from "../services"
import { v4 as uuidv4 } from 'uuid'
import Cookies from "js-cookie"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useAuth } from "../utils/Auth"
import { Container, Grid } from "@material-ui/core"
import { Button } from "../components/button"
import qs from 'qs'
import { useTranslation } from 'react-i18next';

function Login(props) {
    const { search: queryString } = useLocation();
    const { redirect_to, token } = qs.parse(queryString, { ignoreQueryPrefix: true });  
    const { setAuth } = useAuth()
    const history = useHistory()
    const { t } = useTranslation();

    const loginSuccess = (token, redirect_to) => {
        Cookies.set("token", token)
        setAuth(true)
        window.location.href = `${redirect_to}`
    }

    useEffect(() => {
        if (token) {
            loginSuccess(token, redirect_to ? decodeURIComponent(redirect_to) : '/')
        }
    }, [token])

    const processLogin = async (data) => {
        try {
            let res = await login({ ...data, uuid: uuidv4() })
            if (res.role !== 1) {
                window.location.href = `${res.redirect_url}login?token=${res.accessToken}`
                return
            }
            loginSuccess(res.accessToken, redirect_to ? decodeURIComponent(redirect_to) : res.redirect_url)
        } catch (e) {
            alert(e.data?.message, 'error')
        }
    }

    // useEffect(() => {
    //     document.body.style = `background-image: url("${process.env.PUBLIC_URL}/signup-bg.svg"); background-size: cover; background-repeat: no-repeat; background-position: center`
    // }, [])

    if (token) {
        return 'Redirecting...'
    }

    return (
        <Container maxWidth="lg" className="mt-35">
            <Grid container direction="column" style={{ marginBottom: 50 }}>
                <Grid item lg={3} sm={3} class="is-flex fdr aic">
                    <a href="/">
                        <img src={`${process.env.REACT_APP_STLLR_STATIC_URL}stllr-dark-beta-icon.svg`} alt="Stllr.network" height="46" />
                    </a>
                    <a href="https://www.stllr.network/en/discover/" className="ml-20 fw4">{t('Explore Packages')}</a>
                </Grid>
            </Grid>

            <Grid container spacing={3} direction="row">
                
            <Grid item lg={3} sm={3} />

                <Grid item lg={6} sm={6} xs={12}>
                    <div className="is-flex aic fdc mb-10" style={{ padding: "75px 114px 75px 114px" }}>
                        <h1 className="mb-20 has-max-width has-text-centered fw7" style={{lineHeight: "35px"}}>{t('Log in')}</h1>
                        <h3 className="mb-40 has-max-width has-text-centered fw4" style={{lineHeight: "35px"}}>{t('Welcome back to Stllr')}</h3>

                        <div style={{ width: "100%" }} className="mobile-flex-jcc">
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        processLogin(values)
                                        setSubmitting(false)
                                    }, 500)
                                }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string()
                                        .email().required("Please enter a valid email address"),
                                    password: Yup.string()
                                        .required("No password provided")
                                        .min(8, "Password has to be at least 8 characters")
                                })}
                            >
                                {
                                    props => {
                                        const {
                                            values,
                                            touched,
                                            errors,
                                            isSubmitting,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit
                                        } = props

                                        return (
                                            <form onSubmit={handleSubmit}>
                                                <div className="group">
                                                    <label htmlFor="email">{t('Email address')}</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Enter your email address"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`stllr-input mob-max-width`}
                                                    />
                                                    {errors.email && touched.email && (
                                                        <span className="v-error">{errors.email}</span>
                                                    )}
                                                </div>

                                                <div className="group">
                                                    <label htmlFor="password">{t('Password')}</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Enter your password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={`stllr-input mob-max-width`}
                                                    />
                                                    {errors.password && touched.password && (
                                                        <span className="v-error">{errors.password}</span>
                                                    )}
                                                    <div className='mt-10 is-flex fdr jcfe mob-max-width'>
                                                        <Link to="/forgot-password">{t('Forgot your password?')}</Link>
                                                    </div>
                                                </div>

                                                <div className="is-flex fdc aic jcc mb-25">
                                                    <Button
                                                        type="submit"
                                                        className="stllr-btn btn-lg primary has-full-width mb-15"
                                                        disabled={isSubmitting}
                                                        text={t("Login")}
                                                    />

                                                    {/* <a
                                                        href={`https://expert.stllr.io/signup`}
                                                        className="stllr-btn save has-full-width mb-15"
                                                    >
                                                        Signup as an expert
                                                    </a> */}

                                                    <span>{t('Not a member?')} <Link to="/signup">{t('Signup here for free')}</Link></span>
                                                </div>

                                                <div className="sep-w-text mb-25">
                                                    <span>{t('Or sign in with')}</span>
                                                </div>

                                                <div className="is-flex jcc">
                                                    <a
                                                        className="social-login-btn ml-10 mr-10"
                                                        href={`${process.env.REACT_APP_STLLR_API_URL}v1/linkedin_login?role_id=1`}
                                                    >
                                                        <div style={{ backgroundImage: `url("${process.env.PUBLIC_URL}/linkedin-logo.svg")` }} />

                                                        LinkedIn
                                                    </a>
                                                </div>
                                            </form>
                                        )
                                    }
                                }
                            </Formik>
                        </div>
                    </div>

                    {/* <Grid item lg={12} sm={12}>
                        <div className="content-box is-flex aic fdc mb-10" style={{ padding: "45px 180px" }}>
                            <h3 className="fw7 mb-20 has-max-width" style={{textAlign: "center"}}>Are you an Expert ?</h3>

                            <a
                                className="stllr-btn bordered-primary has-max-width has-text-centered"
                                style={{lineHeight: "18.8px", paddingRight: 10, paddingLeft: 10}}
                                href={`${process.env.REACT_APP_EXPERT_URL}`}
                            >
                                Login as an Expert
                            </a>
                        </div>
                    </Grid> */}
                </Grid>

{/* 
                <Grid item lg={4} sm={4}>
                    <h1 className="white lhn mb-75">Grow and work with companies of tomorrow.</h1>

                    <img src={`${process.env.PUBLIC_URL}/cybertalents.svg`} className="mb-50" alt="Cyber talents" />
                    <img src={`${process.env.PUBLIC_URL}/consoleya.svg`} className="mb-50" alt="Consoleya" />
                    <img src={`${process.env.PUBLIC_URL}/hesas-logo.svg`} className="mb-50" alt="Hesas Masr" />
                </Grid> */}
            </Grid>
        </Container>
    )
}

export default Login
