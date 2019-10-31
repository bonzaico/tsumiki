import React from "react";
import ReactDOM from "react-dom";

export const Checkbox = props => (
    <div>
        <input type="checkbox" />
        <span>{props.label}</span>
    </div>
);
