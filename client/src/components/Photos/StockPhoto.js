import React from "react";
import { Input } from "../Input";

export const StockPhoto = props => {

    return (
        <div className="section-wrapper">
            <h3>Stock Photo</h3>
            <div>
                <img 
                    src={
                        (props.stockPic) ? 
                        `http://www.thepeachco.com/ebay/images/sticky/${props.stockPic}/1.jpg` :
                        "./No_image_available.svg"
                    }
                    height="100" 
                    alt="stock"
                />
            </div>
            <div>
                <Input
                    value={props.stockPic}
                    func={props.handleInputChangeforItem}
                    parameter="pic"
                    name="pic"
                >
                Stock Pic
                </Input>
            </div>
        </div>
    )

}