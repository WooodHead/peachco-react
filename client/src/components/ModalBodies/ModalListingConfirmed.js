import React from "react";
import "./ModalListingConfirmed.css";

export const ModalListingConfirmed = props => {

    return (
        <div className="modal-listing-confirmed-wrapper">
            <h3>You have successfully listed something</h3>
            <p>The listing id is <a href="www.blah.com" target="_blank"/></p>
            <p>Ths cost of this listing is...</p>
            <p>Item ends this date</p>
        </div>
    )

}