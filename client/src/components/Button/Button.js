import React from "react";
import "./Button.css";

export const Button = props => (
    <div>
        <button {...props}>{props.name}</button>
    </div>
)