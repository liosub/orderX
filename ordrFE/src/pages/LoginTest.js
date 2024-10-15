import React, { useContext, useEffect } from "react"
import Cookies from "js-cookie"
import { Formik } from "formik"
import * as Yup from "yup"
import { Checkbox } from "@material-ui/core"
import { Button } from "../components"
import { Link } from "react-router-dom"
import { useAuth } from "../utils/Auth"
import { login } from "../services"

export default function LoginTest() {
  const { setAuth } = useAuth()

  const loginSuccess = (token) => {
    Cookies.set("token", token)
    setAuth(true)
    window.location.href = `${process.env.REACT_APP_STLLR_URL}dashboard`
  }

  const processLogin = async (data) => {
    try {
      let res = await login({ ...data })
      loginSuccess(res.token.accessToken)
    } catch (e) {
      alert(e.data?.message, 'error')
    }
  }
  return (
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
          .email().required("Please enter an email"),
        password: Yup.string()
          .required("No password provided")
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
              <div className="flex h-screen w-full items-center justify-center">
                {/* bg-gradient-to-br from-[#ace0f9] to-[#e3f9d9] */}
                <div className="w-[400px] rounded-2xl bg-white p-8 shadow-xl">
                  <div className="flex flex-col items-center">
                    <img className="mb-8" src={`${process.env.PUBLIC_URL}/ordr_logo.png`} />
                    <div className="w-full space-y-4">
                      <input className="stllr-input mb-5"
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <span className="v-error">{errors.email}</span>
                      )}
                      <input className="stllr-input mb-5"
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password && (
                        <span className="v-error">{errors.password}</span>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox id="remember-me" />
                          <span className="text-sm">
                            Remember me
                          </span>
                        </div>
                        <a className="text-sm text-gray-500 hover:text-gray-700" href="#">
                          Forgot password
                        </a>
                      </div>
                      <div className="flex items-center justify-center">
                        <Button
                          type="submit"
                          className="stllr-btn pink w-3-quarters mb-15 rounded-full"
                          text="Login"
                        />
                      </div>
                      <div className="text-center text-sm">
                        <span>No account? </span>
                        <Link className="font-medium text-[#bd1e59] hover:underline" to="/signuptest">
                          Sign up now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 text-center text-xs text-gray-400">© 2024 ORDR</div>
                </div>
              </div>
            </form>
          )
        }
      }
    </Formik>
  )
}

