import React from "react"
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useQuery } from "react-query"
import { Checkbox } from "@material-ui/core"
import { Button } from "../components"
import { Link } from "react-router-dom"
import { setToken } from "../utils";
import { useAuth } from "../utils/Auth";
import { signup } from "../services"

export default function SignupTest() {
    const { setAuth } = useAuth()

    const { mutate: addUser } = useMutation((user) => signup(user), {
        select: (data) => data.token,
        onSuccess: ({ token }) => {
            setToken("token", { value: token.accessToken })
            setAuth(true)
            window.location.href = `${process.env.REACT_APP_STLLR_URL}dashboard`
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Please enter a valid email')
                    .required('Please enter your email'),
                password: Yup.string()
                    .required("No password provided")
                    .min(8, "Password has to be at least 8 characters")
            })}
            onSubmit={async (data) => {
                addUser({ ...data })
            }}
        >
            {({ errors, touched, isSubmitting, handleChange, handleBlur, values, setFieldValue }) => (
                <Form className="form">
                    <div className="flex h-screen w-full items-center justify-center">
                        {/* bg-gradient-to-br from-[#ace0f9] to-[#e3f9d9] */}
                        <div className="w-[400px] rounded-2xl bg-white p-8 shadow-xl">
                            <div className="flex flex-col items-center">
                                <img className="mb-8" src={`${process.env.PUBLIC_URL}/ordr_logo.png`} />
                                <div className="w-full space-y-4">
                                    <input
                                        name="email"
                                        placeholder="Email"
                                        className="stllr-input mb-5"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="email"
                                    />
                                    {errors.email && touched.email && (
                                        <span className="v-error">{errors.email}</span>
                                    )}
                                    <input
                                        placeholder="Password"
                                        name="password"
                                        className="stllr-input mb-5"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="password"
                                    />
                                    {errors.password && touched.password && (
                                        <span className="v-error">{errors.password}</span>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="remember-me" />
                                            <label className="text-sm" htmlFor="remember-me">
                                                Remember me
                                            </label>
                                        </div>
                                        <a className="text-sm text-gray-500 hover:text-gray-700" href="#">
                                            Forgot password
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Button
                                            type="submit"
                                            className="stllr-btn pink w-3-quarters mb-15 rounded-full"
                                            text="Signup"
                                        />
                                    </div>
                                    <div className="text-center text-sm">
                                        <span>Already have an account? </span>
                                        <Link className="font-medium text-[#bd1e59] hover:underline" to="/logintest">
                                            Login here
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 text-center text-xs text-gray-400">© 2024 ORDR</div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

