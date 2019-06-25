import React from "react";
import ReactDOM from "react-dom";

export const BZCheckbox = props => (
    <div>
        <input type="checkbox" />
        <span>{props.label}</span>
    </div>
);
