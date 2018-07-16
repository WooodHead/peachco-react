//Components
import React from "react";
import { Dropdown } from "../Dropdown";
import { Input } from "../Input";

//Styling
import "./SpecificInfo.css";

//Misc
import specifics from "./parameters.json";


export const SpecificInfo = props => {

    return (

        <div className="section-wrapper">

          <div>
            <Dropdown
              value={props.settings.listingType}
              func={props.func}
              name="listingType"
              options={specifics.specificsParameters.listingTypes}
            >
            Listing Type
            </Dropdown>
          </div>

          <div>
            <Dropdown
            value={props.settings.duration} 
            func={props.func}
            name="duration"
            options={specifics.specificsParameters.durations}
            >
            Duration
          </Dropdown>
          </div>


          <div>
            <Dropdown
              value={props.settings.condition}
              func={props.func}
              name="condition"
              options={specifics.specificsParameters.conditionTypes}
            >
            Condition
            </Dropdown>
          </div>


          <div>
            <h3>Condition Description</h3>
            <textarea rows="4" style={{width: "100%"}}
                value={props.settings.conditionDescription}
                onChange={props.handleInputChangeforSettings}
                name="conditionDescription"
            />
          </div>
          
          <div className="item-inputs db-info">
            <Input
              value={props.settings.quantity}
              func={props.handleInputChangeforSettings}
              parameter="quantity"
              name="quantity"
            >
              Quantity
            </Input>
          </div>


          <div className="item-inputs db-info">
            <Input
              value={(props.retail !== "") ? (props.getPrice(parseFloat(props.retail))) : ("0")}
              func={props.handleInputChangeforSettings}
              parameter="startPrice"
              name="startPrice"
            >
              StartPrice
            </Input>
          </div>

          <div className="item-inputs db-info">
            <Input
              value={props.settings.customId}
              func={props.handleInputChangeforSettings}
              parameter="customId"
              name="customId"
            >
              CustomID
            </Input>
          </div>
        
        </div>


        
    
    )

}