import React from "react";
import "./Modal.css";

export const Modal = props => (

    <div className="modal">
        <div className="modal-content animate">
            <div className="item-info-container">
                <ul>
                    <li>{props.item.sku}</li>
                    <li>{props.item.brand}</li>
                    <li>{props.item.collection}</li>
                    <li>{props.item.type}</li>
                    <li>{props.item.color}</li>
                    <li>{props.item.retail}</li>
                </ul>
            </div>
            <div className="close-container">
                <button onClick="" className="modal-button accept" type="button">Use Features</button>
                <button onClick="" className="modal-button accept" type="button">Sell This</button>
                <button {...props} className="modal-button cancel" type="button">Close</button>
            </div>
        </div>
    </div>
    

)