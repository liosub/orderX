import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from "react-query"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../components"
import { addProfile } from "../services"
import { useAuth } from '../utils/Auth';


export const Profile = ({ ...props }) => {
    const { user, refetchUser } = useAuth()
    const [image, setImage] = useState(user.logo ? `${process.env.REACT_APP_STLLR}${user.logo}` : null)
    const fileRef = useRef()

    const { mutate: submitProfile, isLoading } = useMutation((data) => addProfile(data), {
        select: (data) => data,
        onSuccess: (data) => {
            refetchUser()
            alert('Successfully added')
        },
        onError: error => {
            console.log(error)
            alert('Something went wrong')
        }
    })

    const handleOnUploadClick = (e) => {
        e.preventDefault()
        fileRef.current.click()
    }

    const getBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result)
        };
        reader.onerror = function (error) {
            reject();
        };
    })

    return (
        <div>
            <Formik
                initialValues={{
                    logo: user.logo || null,
                    businessName: user.businessName || '',
                    about: user.about || '',
                    url: user.url || '',
                    tbc: user.tbc || '',
                }}
                validationSchema={Yup.object().shape({
                    logo: Yup.mixed()
                        .required("Please upload an image"),
                    businessName: Yup.string()
                        .required("Please specify your business name"),
                    about: Yup.string()
                        .required("Please specify your about"),
                    url: Yup.string()
                        .required("Please specify a menu link"),
                    tbc: Yup.string()
                        .required("Please specify your TBC"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(async () => {
                        const formData = new FormData();
                        formData.append("logo", values.logo);
                        formData.append("businessName", values.businessName);
                        formData.append("about", values.about);
                        formData.append("tbc", values.tbc);
                        console.log('ehh', values)
                        submitProfile(formData)
                        setSubmitting(false)
                    }, 500)
                }}
            >
                {({ errors, touched, isSubmitting, handleChange, handleBlur, values, setFieldValue }) => (
                    <Form>
                        {image ? (
                            <div
                                style={{ backgroundImage: `url(${image})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: 200 }}
                                className="has-full-width my-4 flex h-32 w-full items-center justify-center"
                            />
                        )
                            :
                            <div className="my-4 flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300" style={{ cursor: 'pointer' }} onClick={handleOnUploadClick}>
                                <span className="text-sm font-medium">Upload logo</span>
                            </div>
                        }
                        {errors.image && touched.image && (
                            <div className="v-error mb-10">{errors.image}</div>
                        )}

                        <input
                            ref={fileRef}
                            type="file"
                            name="logo"
                            className="d-none"
                            accept='image/*'
                            onChange={(event) => {
                                const ev = event.currentTarget.files;
                                console.log("ev:", ev)
                                if (ev) {
                                    if (ev.length === 0) {
                                        return;
                                    }
                                    const img = document.createElement("img");
                                    img.onload = function () {
                                        setFieldValue("logo", ev[0]);
                                        getBase64(ev[0]).then(data => {
                                            setImage(data);
                                        });
                                    }
                                    img.src = URL.createObjectURL(ev[0])
                                }
                            }}
                        />

                        <input
                            className="stllr-input mb-10"
                            placeholder="Business name"
                            name="businessName"
                            value={values.businessName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.businessName && touched.businessName && (
                            <div className="v-error mb-10">{errors.businessName}</div>
                        )}

                        <input
                            className="stllr-input mb-10"
                            placeholder="About"
                            name="about"
                            value={values.about}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.about && touched.about && (
                            <div className="v-error mb-10">{errors.about}</div>
                        )}

                        <input
                            className="stllr-input mb-10"
                            placeholder="ordr.ee/"
                            name="url"
                            value={values.url}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.url && touched.url && (
                            <div className="v-error mb-10">{errors.url}</div>
                        )}

                        <input
                            className="stllr-input mb-10"
                            placeholder="TBC"
                            name="tbc"
                            value={values.tbc}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.tbc && touched.tbc && (
                            <div className="v-error mb-10">{errors.tbc}</div>
                        )}

                        <div className="flex justify-end pt-4">
                            <Button
                                className="stllr-btn pink w-3-quarters mb-15 rounded-full"
                                text="Save"
                                type="submit"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}