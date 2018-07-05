import React from "react";
import { Input } from "../Input";

export const StockPhoto = props => {

    let pic = props.stockPic;

    return (
        <div className="section-wrapper">
            <h3>Stock Photo</h3>
            <div>
                <img 
                    src={
                        (pic) ? 
                        `http://www.thepeachco.com/ebay/images/sticky/${pic}/1.jpg` :
                        "./No_image_available.svg"
                    }
                    height="100" 
                    alt="stock"
                />
            </div>
            <div>
                <Input
                    value={props.stockPic ? props.stockPic : ""}
                    func={props.handleInputChangeforItem}
                    parameter={props.stockPic}
                    name="pic"
                >
                Stock Pic
                </Input>
            </div>
        </div>
    )

}