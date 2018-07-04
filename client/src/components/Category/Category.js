import React from "react";

export const Category = props => {
    return(

        <div className="section-wrapper">
            <h3>{props.children}</h3>
            <select
            value={props.category}
            onChange={props.handleInputChangeforSettings}
            name="category"
            size="15"
            style={{ width: "100%" }}
            >
            {props.categories.length
                ? props.categories.map(cat => (
                    <option
                    key={cat.Category.CategoryID}
                    value={cat.Category.CategoryID}
                    >
                    {cat.Category.CategoryName} - Relevance:{" "}
                    {cat.PercentItemFound}%
                    </option>
                ))
                : ""}
            </select>
        </div>

    )
}