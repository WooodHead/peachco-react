import React from "react";
import { Input } from "../Input";

export const StockPhoto = props => {

    return (
        <div className="section-wrapper">
            <h3>Stock Photo</h3>
            <div>
                <img src="https://www.fillmurray.com/200/300" height="100" alt=""/>
            </div>
            <div>
                <Input/>
            </div>
        </div>
    )

}