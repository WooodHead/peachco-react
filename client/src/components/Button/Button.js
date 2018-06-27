import React from "react";
import "./Button.css";

function handleClick(e, props) {
    e.preventDefault();
    console.log(props.parameter);
    props.func(props.parameter)
}

export const Button = props => (
    <div>
        <button className="button" onClick={(e) => handleClick(e, props)}>{props.name}</button>
    </div>
)