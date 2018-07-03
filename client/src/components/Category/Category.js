import React from "react";

export const Category = props => {
    return(

        <div>
            <h3>Category</h3>
            <select
            value={props.category}
            onChange={props.handleInputChangeforSettings}
            name="category"
            size="15"
            style={{ width: "100%" }}
            >
            {props.categories
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