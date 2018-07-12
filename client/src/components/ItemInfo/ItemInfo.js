import React from "../../../../../../../../Users/bagglerock/Library/Caches/typescript/2.9/node_modules/@types/react";
import { Input } from "../Input";


export const ItemInfo = props => {

    const filterArr = ["id", "packageSizeId", "createdAt", "updatedAt", "pic", "numPics"];

    return (

        <div className="section-wrapper">
            <h3>Item Information</h3>
            <div className="item-inputs db-info">
            {Object.entries(props.data.item)
            .filter(n => !(filterArr.includes(n[0])))
            .map(property => (
                <Input
                key={property[0]}
                value={property[1] ? property[1] : ""}
                name={property[0]}
                func={props.handleInputChangeforItem}
                parameter={property[0]}
                >
                {props.labelize(property[0])}
                </Input>
            ))}
            </div>
        
        
        </div>


        
    
    )

}
