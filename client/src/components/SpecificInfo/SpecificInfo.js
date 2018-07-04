import React from "react";
import { Input } from "../Input";


export const SpecificInfo = props => {

    return (

        <div className="section-wrapper">

          <h3>Listing Type</h3>
          <select
            value={props.settings.listingType}
            onChange={props.handleInputChangeforSettings}
            name="listingType"
          >
            <option value="Chinese">Auction</option>
            <option value="FixedPriceItem">Fixed</option>
          </select>
          <h3>Duration</h3>
          <select
            value={props.settings.duration}
            onChange={props.handleInputChangeforSettings}
            name="duration"
          >
            <option value="Days_5">5</option>
            <option value="Days_7">7</option>
            <option value="Days_30">30</option>
            <option value="GTC">GTC</option>
          </select>
          <h3>Condition</h3>
          <select
            size="8"
            style={{width: "100%"}}
            value={props.settings.condition}
            onChange={props.handleInputChangeforSettings}
            name="condition"
          >
              <option value="1000">New</option>
              <option value="1750">Open, No Packaging, or Display</option>
              <option value="3000">Washed or Used</option>
          </select>
          <h3>Condition Description</h3>
          <textarea rows="4" style={{width: "100%"}}
              value={props.settings.conditionDescription}
              onChange={props.handleInputChangeforSettings}
              name="conditionDescription"
          />
          <Input
            value={props.settings.quantity}
            func={props.handleInputChangeforSettings}
            parameter="quantity"
            name="quantity"
          >
            Quantity
          </Input>
          <Input
            value={(props.retail !== "") ? (props.getPrice(parseFloat(props.retail))) : ("0")}
            func={props.handleInputChangeforSettings}
            parameter="startPrice"
            name="startPrice"
          >
            StartPrice
          </Input>
          <Input
            value={props.settings.customId}
            func={props.handleInputChangeforSettings}
            parameter="customId"
            name="customId"
          >
            CustomID
          </Input>
        
        
        </div>


        
    
    )

}