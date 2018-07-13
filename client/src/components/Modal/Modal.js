import React from "react";
import LinkButton from '../Button/LinkButton';
import "./Modal.css";

import { Button } from "../Button";

export const Modal = props => {

    return (

        <div className="modal">
            <div className="modal-content animate">
                <div className="modal-close-container"><i className="fas fa-times fa-3x" onClick={props.closeModal}></i></div>
                <div className="item-info-container">
                    {props.children}
                </div>
                <div className="modal-button-container">
                    { props.redirect 
                      ? 
                      props.buttons.map(button => (
                          <LinkButton
                            key={button.type}
                            to={button.to}
                            type={button.type}
                            id={props.item.id}
                          >
                          {button.type}
                          </LinkButton>
                      ))
                      
                      :

                      props.buttons.map(button => (
                          <Button
                            key={button.name}
                            func={button.func}
                            parameter={button.parameter}
                            name={button.name}
                          />
                      ))
                    }
                </div>
            </div>
        </div>
        
    
    )

}

