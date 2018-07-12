import React from "../../../../../../../../Users/bagglerock/Library/Caches/typescript/2.9/node_modules/@types/react";

export const ShippingTemplates = props => {
    return (

        <div className="section-wrapper">
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