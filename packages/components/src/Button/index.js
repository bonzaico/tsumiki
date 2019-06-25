import React from "react";
import ReactDOM from "react-dom";

export const Button = (props) => (
    <button onClick={props.onClick}>{props.label}</button>
);
