import React from "react";
import LinkButton from '../Button/LinkButton';
import "./Modal.css";

import { Button } from "../Button";

export const Modal = props => ({children})=> {

    return (

        <div className="modal">
            <div className="modal-content animate">
                <div className="modal-close-container"><i className="fas fa-times fa-3x" onClick={props.closeModal}></i></div>
                <div className="item-info-container">
                    {children}
                </div>
                <div className="modal-button-container">
                    {props.buttons.map(button => {
                        <Button
                            func={button.func}
                            parameter={button.parameter}
                            name={button.name}
                        />
                    })}
                </div>
            </div>
        </div>
        
    
    )

}

