import React from "react";
import { Input } from "../Input";


export const ItemInfo = props => {

    return (

        <div>
            <h3>Item Information</h3>
            <div className="item-inputs db-info">
            {Object.entries(props.data.item)
            .filter(n => n[0] !== "id")
            .filter(n => n[0] !== "packageSizeId")
            .filter(n => n[0] !== "createdAt")
            .filter(n => n[0] !== "updatedAt")
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
