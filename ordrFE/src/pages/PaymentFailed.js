import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function PaymentFailed(props) {
    const { profileId } = useParams();

    useEffect(() => {
        alert("Payment failed");

        window.location.href = `${process.env.REACT_APP_STLLR_URL}menu/${profileId}`
      }, []);

    return (
        <div className="flex flex-col menu-container">

        </div>
    )
}

export default PaymentFailed
