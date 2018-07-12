import React from "../../../../../../../../Users/bagglerock/Library/Caches/typescript/2.9/node_modules/@types/react";
import "./Button.css";

function handleClick(e, props) {
    e.preventDefault();
    props.func(props.parameter)
}

export const Button = props => (
    <div>
        <button className="button" onClick={(e) => handleClick(e, props)}>{props.name}</button>
    </div>
)