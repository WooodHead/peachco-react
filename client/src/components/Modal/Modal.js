import React from "react";
import { Button } from "../Button";
import LinkButton from '../Button/LinkButton';
import "./Modal.css";


export const Modal = props => {

    return (

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
                    <LinkButton
                        to={"/build/"} 
                        type={"similar"}
                        id={props.item.id}
                    >
                    Similar
                    </LinkButton>
                    <LinkButton
                        to={"/build/"} 
                        type={"similar"}
                        id={props.item.id}
                    >
                    Exact
                    </LinkButton>
                </div>
                <div>
                    <Button func={props.closeModal} name="Close"/>
                </div>
            </div>
        </div>
        
    
    )

}

