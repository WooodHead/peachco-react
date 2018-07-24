import React from "react";
import "./ModalListingConfirmed.css";

export const ModalListingConfirmed = props => {
    let f = props.response.data.Fees.Fee;
    let total= 0;
    for (let i = 0; i < f.length; i++ ){
        let fee = parseFloat(f[i].Fee._);
        total = fee+total;
    }

    return (
        <div className="modal-listing-confirmed-wrapper">
            <h3>You have successfully listed something</h3>
            <p>The listing id is {props.response.data.ItemID}</p>
            <p><a href={`https://www.ebay.com/itm/${props.response.data.ItemID}`} target="_blank">link to listing</a></p>
            <p>Ths cost of this listing is ${total}</p>
            <p>Item ends this date {props.response.data.EndTime}</p>
        </div>
    )

}