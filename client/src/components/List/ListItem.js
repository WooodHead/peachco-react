import React from "react";
import "./ListItem.css";

export const ListItem = props => (
    <div className="list-item" item-id={props.id} {...props}>
        <div className="item-result-wrapper">
            <div className="item-result-info-wrapper">
                <ul>
                    <li>{props.brand}</li>
                    <li>{props.collection}</li>
                    <li>{props.type}</li>
                    <li>{props.color}</li>
                </ul>
            </div>
            <div className="item-result-img-wrapper">
                <div>
                    <img src={`http://www.thepeachco.com/ebay/images/sticky/${props.pic}/1.jpg`} alt={props.pic} height="120"/>
                </div>
                <div>
                    <img src={`http://www.thepeachco.com/ebay/images/${props.secPic}/1.jpg`} alt={props.secPic} height="120"/>
                </div>
            </div>
        </div>
    </div>

);
