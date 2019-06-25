import React from "react";
import ReactDOM from "react-dom";

export const BZButton = (props) => (
    <button onClick={props.onClick}>{props.label}</button>
);