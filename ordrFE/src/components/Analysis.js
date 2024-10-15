import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from "react-query"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAllOrders ,getCustomersOrders} from '../services';


export const Analysis = ({ ...props }) => {
    const [totalOrders, setTotalOrders] = useState(
        {
            orderAvg: "",
            orderCount: 0,
            orderSum: ""
        }
    );
    const [orderDetails, setOrderDetails] = useState([]);
    
    const { data:analytics, refetch } = useQuery(["analytics"], () => (getAllOrders()), {
        select: (data) => data,
        onSuccess: (data) => setTotalOrders(data[0]) & console.log(totalOrders),
        keepPreviousData: false,
        cacheTime: 0,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false
    })
    const { data:customerDetails } = useQuery(["customerDetails"], () => (getCustomersOrders()), {
        select: (data) => data,
        onSuccess: (data) => data.length && setOrderDetails(data) ,
        keepPreviousData: false,
        cacheTime: 0,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false
    })
    return (
        <div>
            <p>
                <tr>
                    <th>Orders</th>
                    <th>Revenue</th>
                    <th>AVG</th>             
                </tr>
                        <tr>
                            <td>{totalOrders.orderCount}</td>
                            <td>{totalOrders.orderSum}</td>
                            <td>{totalOrders.orderAvg}</td>
                        </tr>
        </p>
            <table>
                <tr>
                    <th>Customer Name</th>
                    <th>RoomNo / TableNo</th>
                    <th>Order No</th>
                    <th>Revenue</th>
                    <th>Time</th>
                    <th>Notes</th>
                    <th>Status</th>
                    
                </tr>
                {orderDetails.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.customerName}</td>
                            <td>{val.roomNo? val.roomNo: val.tableNo}</td>
                            <td>{val.order_id}</td>
                            <td>{val.revenue}</td>
                            <td>{val.createdAt}</td>
                            <td>{val.notes}</td>
                            <td>{val.status}</td>

                        </tr>
                    )
                })}
            </table>
        </div>
    );
}