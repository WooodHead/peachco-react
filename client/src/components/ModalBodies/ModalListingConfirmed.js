import React from "react";
import "./ModalListingConfirmed.css";

export const ModalListingConfirmed = props => {

    return (
        <div className="modal-listing-confirmed-wrapper">
            <h3>You have successfully listed something</h3>
            <p>The listing id is {props.response.data.ItemID}</p>
            <p><a href={`https://www.ebay.com/itm/${props.response.data.ItemID} target="_blank"`}>link to listing</a></p>
            <p>Ths cost of this listing is...</p>
            <p>Item ends this date {props.response.data.EndTime}</p>
        </div>
    )

}