import React from "react";
import "./Button.css";

export const Button = props => (
    <div>
        <button className="button" {...props}>{props.name}</button>
    </div>
)