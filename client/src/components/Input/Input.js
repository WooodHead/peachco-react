import React from "../../../../../../../../Users/bagglerock/Library/Caches/typescript/2.9/node_modules/@types/react";
import "./Input.css";

export const Input = props => (
  <div className="input-container">
    <div 
      className={
        props.labelWrapper ? 
        props.labelWrapper :
        "label-wrapper"
      }
      >
      <label 
        className={
          props.label ? 
          props.label :
          "label"
        }
        htmlFor={props.name}>{props.children}
      </label>
    </div>
    <div className="input-wrapper">
      <input 
        className={
          props.input ? 
          props.input : 
          "input"
        } 
        value={props.value}
        name={props.name}
        label={props.children}
        onChange={props.func}
       /* parameter={props.parameter}*/
      />
    </div>
  </div>
);
