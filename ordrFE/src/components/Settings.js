import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from "react-query"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllOrders, getCustomersOrders } from '../services';
import { useAuth } from '../utils/Auth';


export const Settings = ({ ...props }) => {
    const { user } = useAuth()


    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='mb-3'>Your QR Code</div>
            <img
                className="h-16 w-16 rounded mr-10"
                height="64"
                src={`${process.env.REACT_APP_STLLR}${user.QRCode}`}
                style={{
                    aspectRatio: "64/64",
                    objectFit: "cover",
                }}
                width="64"
            />
        </div>
    );
}