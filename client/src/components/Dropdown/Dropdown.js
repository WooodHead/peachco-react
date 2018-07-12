import React from "../../../../../../../../Users/bagglerock/Library/Caches/typescript/2.9/node_modules/@types/react";


export const Dropdown = props => {
    return (
        <div>
            <h3>{props.children}</h3>
            <select
                value={props.value}
                onChange={() => props.func}
                name={props.name}
            >
            {props.options.map(option => (
                <option
                    key={option.type}
                    value={option.type}
                >
                {option.label}
                </option>
            )
            )}
            </select>
        </div>
    )
}