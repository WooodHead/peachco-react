import React from "react";
import "./Input.css";

export const Input = props => (
  <div className="input-container">
    <div className="label-wrapper">
      <label className="label" htmlFor={props.name}>{props.children}</label>
    </div>
    <div className="input-wrapper">
      <input className="input" value={props.value}
        name={props.name}
        label={props.children}
        onChange={props.func}
        parameter={props.parameter}
      />
    </div>
  </div>
);
