//Components
import React from "../../../../../../../../Users/bagglerock/Library/Caches/typescript/2.9/node_modules/@types/react";
import { Dropdown } from "../Dropdown";
import { Input } from "../Input";

//Styling
import "./SpecificInfo.css";

//Misc
import specifics from "./parameters.json";


export const SpecificInfo = props => {

    return (

        <div className="section-wrapper">

          <Dropdown
            value={props.settings.listingType}
            func={props.func}
            name="listingType"
            options={specifics.specificsParameters.listingTypes}
          >
          Listing Type
          </Dropdown>

          <Dropdown
            value={props.settings.duration}
            func={props.func}
            name="duration"
            options={specifics.specificsParameters.durations}
          >
          Duration
          </Dropdown>

          <Dropdown
            value={props.settings.condition}
            func={props.func}
            name="condition"
            options={specifics.specificsParameters.conditionTypes}
          >
          Condition
          </Dropdown>

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