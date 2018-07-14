import React from "react";
import noImage from "./No_image_available.svg";
import "./ModalItemInfo.css";

export const ModalItemInfo = props => {

    return(
        <div className="item-info-wrapper">
            <div className="modal-ii-heading">
                <h4>{props.item.brand} - {props.item.collection} {props.item.color} {props.item.type}</h4>
            </div>
            <div className="modal-ii-info">
            
                <p>SKU: {props.item.sku}</p>
                <p>CustomID: {props.item.secPic}</p>
                <p><br/></p>
                <p>{props.item.f_1}</p>
                <p>{props.item.f_2}</p>
                <p>{props.item.f_3}</p>
                <p>{props.item.f_4}</p>
                <p>{props.item.f_5}</p>
                <p><br/></p>
                <p>Retail: {props.item.retail}</p>
            </div>
            <div className="modal-ii-images">
                <div>
                    <img src={(props.item.pic !== null && props.item.pic !== "") ? 
                        (`http://www.thepeachco.com/ebay/images/sticky/${props.item.pic}/1.jpg`) : 
                        (noImage)} width="300" alt="Stock"/>
                </div>
                <div>
                    <img src={(props.item.secPic !== null && props.item.secPic !== "") ? 
                        (`http://www.thepeachco.com/ebay/images/${props.item.secPic}/1.jpg`) : 
                        (noImage)} width="300" alt="Actual"/>
                </div>
            </div>
        </div>
    ) 

}
