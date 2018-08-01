import React from "react";
import { Input } from "../Input";
import noImage from "../../images/No_image_available.svg";
export const StockPhoto = props => {

    let pic = props.stockPic;

    return (
        <div className="section-wrapper">
            <h3>Stock Photo</h3>
            <div
                onClick={() => this.fileInput.click()}
            >
                <img className="style_prevu_kit"
                    src={
                        (pic) ? 
                        `https://www.thepeachco.com/ebay/images/sticky/${pic}/1.jpg` :
                        noImage
                    }
                    height="100" 
                    alt="stock"
                />
                <input
                style={{display: "none"}}
                type="file"
                onChange={props.fileSelectedHandlerStock}
                ref={fileInput => this.fileInput = fileInput}
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