import React from "react";

export const ListItem = props => (
    <ul>
    <li>{props.brand}</li>
    <li>{props.collection}</li>
    <li>{props.type}</li>
    <li>{props.color}</li>
    </ul>
);
