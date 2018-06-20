import React from "react";
import "./ListItem.css";

export const ListItem = props => (
    <div className="list-item">
    <ul>
    <li>{props.brand}</li>
    <li>{props.collection}</li>
    <li>{props.type}</li>
    <li>{props.color}</li>
    </ul>
    
    </div>

);
