import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from "react-query"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../components";
import { request } from "../utils/Request";
import { checkoutOrder } from '../services/orders';

const CheckoutModal = ({ cart, onSubmit, onClose, businessName, businessImg, menuId, profileId, profilemail }) => {

    // const validationSchema = Yup.object().shape({
    //     notes: Yup.string(),
    //     counter: Yup.number().min(1)
    // });

    const { mutate: proceedCheckout, isLoading } = useMutation((data) => checkoutOrder(data), {
        onSuccess: async (data) => {
            console.log('response', data)
            sessionStorage.removeItem('order')
            window.location.href = data
        },
        onError: error => {
            console.log(error)
            alert('Something went wrong')
        }
    })

    return (
        <Formik
            initialValues={{ cart: cart, total_price: cart.reduce((total, item) => total + item.price * item.counter, 0), public_notes: '', menuId: menuId, profileId: Number(profileId), profilemail: profilemail }}
            // validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log(values)
                proceedCheckout(values)
                onClose();
            }}
        >
            {({ errors, touched, isSubmitting, handleChange, handleBlur, values, setFieldValue }) => (
                <Form>
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex justify-center w-full mb-20" style={{ backgroundColor: '#FFF', paddingTop: 20, paddingBottom: 20 }}>
                            <div className="">
                                <div className="flex items-center justify-center my-4">
                                    <img
                                        alt={businessName}
                                        className="rounded-full"
                                        height="100"
                                        src={`${process.env.REACT_APP_STLLR}${businessImg}`}
                                        style={{
                                            aspectRatio: "100/100",
                                            height: "100px",
                                            objectFit: "cover",
                                            width: "100px",
                                        }}
                                        width="100"
                                    />
                                </div>
                                <div className="text-center">{businessName}</div>
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-center mb-20">Cart</h1>

                        <div className='w-full' style={{ padding: 20 }}>
                            <div className='flex flex-col item-card'>
                                {cart.map((item, index) => (
                                    <div className='flex justify-between mb-20'>
                                        <div>
                                            <div className="text-lg font-bold">
                                                {item.counter} x {item.item_title}
                                            </div>
                                            {item.additionals.length > 0 && (
                                                <div className='light-gray'>
                                                    {item.additionals.join(', ')}
                                                </div>
                                            )}
                                            {item.notes && (
                                                <div className='light-gray'>
                                                    {item.notes}
                                                </div>
                                            )}
                                        </div>
                                        <div className='light-gray'>
                                            €{item.price * item.counter}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='w-full mb-20' style={{ padding: 20 }}>
                            <div className='flex justify-between item-card'>
                                <div className='light-gray'>
                                    Total
                                </div>
                                <div>
                                    €{cart.reduce((total, item) => total + item.price * item.counter, 0)}
                                </div>
                            </div>
                        </div>

                        <label className="flex asfs font-bold" style={{ paddingLeft: 20 }}>
                            Add Note
                        </label>
                        <div className='w-full' style={{ padding: 20 }}>
                            <textarea
                                className="mt-1 p-2 text-sm text-gray-700 border rounded-md"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="public_notes"
                            />
                        </div>

                        <Button
                            className="stllr-btn btn-lg pink w-3-quarters mb-15 rounded-full"
                            text={`Place order`}
                            type="submit"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};


export default CheckoutModal;