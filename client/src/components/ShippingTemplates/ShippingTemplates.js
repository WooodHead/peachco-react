import React from "react";

export const ShippingTemplates = props => {
    console.log(props);
    // console.log(props.packageSizeId);
    // console.log(props.template);
    return (

        <div className="section-wrapper"
            style={   
                    !props.template.shippingCost
                 ? 
                 
                    {backgroundColor: "red", color: "white"}
                  : 
                 
                    {backgroundColor: "white", color: "black"}
                 
            }

            >
            <h3>{props.children}</h3>
            <select
            value={
                (props.packageSizeId)
                ? (props.packageSizeId)
                : ("")
            }
            name="packageSizeId"
            onChange={props.handleInputChangeforItem}
            size="11"
            style={{ width: "100%" }}
            >
            {props.templates.length
                ? props.templates.map(template => (
                    <option key={template.id} value={template.id}>
                    {template.shippingType}
                    </option>
                ))
                : ""}
            </select>
        </div>

    )
}