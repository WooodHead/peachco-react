import React from "react";
import "./Modal.css";

export const Modal = props => (

    <div className="modal">
        <div className="modal-content animate">
            <div>
                <ul>
                    <li>{props.item.brand}</li>
                    <li>{props.item.collection}</li>
                    <li>{props.item.type}</li>
                    <li>{props.item.color}</li>
                    <li>{props.item.retail}</li>
                </ul>
            </div>
            <div className="filter-close-container">
                <button {...props} className="modal-button cancel" type="button">Close</button>
            </div>
        </div>
    </div>
    

)