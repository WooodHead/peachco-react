import React from "react";
import "./Input.css";

export const Input = props => (
  <div className="input-container">
    <div className="label-wrapper"><label className="label" htmlFor={props.name}>{props.labelname}</label></div>
    <div className="input-wrapper"><input className="input" {...props} /></div>
  </div>
);
