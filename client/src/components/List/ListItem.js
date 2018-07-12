import React from "../../../../../../../../Users/bagglerock/Library/Caches/typescript/2.9/node_modules/@types/react";
import "./ListItem.css";

export const ListItem = props => (
    <div className="list-item" item-id={props.id} {...props}>
        <ul>
            <li>{props.brand}</li>
            <li>{props.collection}</li>
            <li>{props.type}</li>
            <li>{props.color}</li>
        </ul>
    </div>

);
