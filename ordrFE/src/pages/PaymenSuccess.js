import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function PaymentSuccess(props) {
    const { profileId } = useParams();

    useEffect(() => {
        alert("Payment successfully processed");

        window.location.href = `${process.env.REACT_APP_STLLR_URL}menu/${profileId}`
      }, []);

    return (
        <div className="flex flex-col menu-container">

        </div>
    )
}

export default PaymentSuccess
