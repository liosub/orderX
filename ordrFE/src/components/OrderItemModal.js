import React, { useEffect, useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../components";
import { request } from "../utils/Request";

const OrderItemModal = ({ onSubmit, item, onClose }) => {

    const validationSchema = Yup.object().shape({
        notes: Yup.string(),
        counter: Yup.number().min(1),
        price: Yup.number().min(1, "Please select an option")
    });

    return (
        <div className="">
            <div className="bg-white p-6 rounded-lg">
                <Formik
                    initialValues={{ notes: '', item_title: item.title, item_id: item.item_id, counter: 1, price: Number(item.price), additionals: [] }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        let existingOrder = sessionStorage.getItem('order');
                        let orderArray = existingOrder ? JSON.parse(existingOrder) : [];
                        if (!Array.isArray(orderArray)) {
                            orderArray = [];
                        }
                        orderArray.push(values);
                        sessionStorage.setItem('order', JSON.stringify(orderArray));
                        console.log('existingOrder', JSON.parse(sessionStorage.getItem('order')))
                        onClose();
                    }}
                >
                    {({ errors, touched, isSubmitting, handleChange, handleBlur, values, setFieldValue }) => (
                        <Form>
                            <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
                                <div className="flex justify-between items-center mb-20">
                                    <h2 className="text-lg font-semibold">Add item</h2>
                                    {/* <div onClick={onClose} className="font-bold" style={{ cursor: 'pointer' }}>
                                        x
                                    </div> */}
                                </div>
                                <div className="mb-50">
                                    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                                        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                                            <img
                                                alt="Margarita"
                                                className="w-full mb-20"
                                                height="200"
                                                src={`${process.env.REACT_APP_STLLR}${item.item_image}`}
                                                style={{
                                                    aspectRatio: "400/200",
                                                    objectFit: "cover",
                                                    zIndex: 0,
                                                }}
                                                width="400"
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    left: '10px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    border: 'none',
                                                    padding: '5px',
                                                    cursor: 'pointer',
                                                    zIndex: 1,
                                                }}
                                                onClick={onClose}
                                            >
                                                x
                                            </div>
                                        </div>

                                        <div className="px-5 py-4">
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="text-gray-500">{item.price ? `€${item.price}` : 'Price on selection'}</p>
                                            <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                                            <div className="mt-4">
                                                <h4 className="font-semibold">
                                                    Options <span className="text-red-500"></span>
                                                </h4>
                                                <div className="flex flex-col mt-2">
                                                    {item.additionalFields && item.additionalFields.map((field, index) => (
                                                        item.price ?
                                                            <label className="inline-flex items-center">
                                                                <input className="form-radio" name="test" type="checkbox" value={index}
                                                                    onChange={(e) => {
                                                                        const isChecked = e.target.checked;
                                                                        if (isChecked) {
                                                                            setFieldValue('price', Number(values.price) + Number(field.price));
                                                                            setFieldValue('additionals', [...values.additionals, field.label]);
                                                                        } else {
                                                                            setFieldValue('price', Number(values.price) - Number(field.price));
                                                                            setFieldValue('additionals', values.additionals.filter((item) => item !== field.label));
                                                                        }
                                                                    }}
                                                                />
                                                                <span className="ml-2">{field.label} €{field.price}</span>
                                                            </label>
                                                            :
                                                            <label className="inline-flex items-center">
                                                                <input className="form-radio" name="options" type="radio" value={index} onChange={() => {setFieldValue('price', Number(field.price)); setFieldValue('additionals', [...values.additionals, field.label])} } />
                                                                <span className="ml-2">{field.label} €{field.price}</span>
                                                            </label>

                                                    ))}
                                                </div>
                                                {errors.price && touched.price && (
                                                    <div className="v-error mb-10">{errors.price}</div>
                                                )}
                                            </div>
                                            <div className="mt-4">
                                                <label className="font-semibold" htmlFor="notes">
                                                    Notes
                                                </label>
                                                <textarea
                                                    className="mt-1 p-2 w-full text-sm text-gray-700 border rounded-md"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="notes"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <h4 className="font-semibold">Allergens</h4>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center">
                                                    <svg onClick={() => values.counter > 1 && setFieldValue('counter', values.counter - 1)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                                                    <span className="text-lg mr-10 ml-10">{values.counter}</span>
                                                    <svg onClick={() => setFieldValue('counter', values.counter + 1)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center'>
                                    <Button
                                        className="stllr-btn btn-lg pink w-3-quarters mb-15 rounded-full"
                                        text={`Add for €${values.price * values.counter}`}
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

function MinusIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
        </svg>
    )
}


function MoreVerticalIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
        </svg>
    )
}


function PanelTopCloseIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" x2="21" y1="9" y2="9" />
            <path d="m9 16 3-3 3 3" />
        </svg>
    )
}


function PlusIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}

export default OrderItemModal;