import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextInput } from "./text-input";

storiesOf("Text input", module)
    .add("Default", () => {
        const props = {
            id: "name",
            value: "",
            errorMsg: "Wrong input",
            label: "Name",
            placeHolder: "Tyrion Lannister"
        };
        return (
            <div>
                <br/><br/>
                <div className="col-3">
                    <TextInput {...props} />
                </div>
            </div>
        );
    })
    .add("Input for entering name", () => {
        const props = {
            id: "name",
            value: "",
            errorMsg: "Wrong input",
            label: "Name",
            validate: /[a-z]+\s[a-z]+/
        };
        return (
            <div>
                <br/><br/>
                <div className="col-3">
                    <TextInput {...props} />
                </div>
            </div>
        );
    })
    .add("Alert on type end", () => {
        const props = {
            id: "name",
            value: "",
            errorMsg: "Wrong input",
            label: "Name",
            onTypeEnd: () => alert("Enter your name!")
        };
        return (
            <div>
                <br/><br/>
                <div className="col-3">
                    <TextInput {...props} />
                </div>
            </div>
        );
    })
    .add("With leading icon", () => {
        const props = {
            id: "name",
            value: "",
            errorMsg: "Wrong input",
            leadingIcon: "icon-search"
        };
        return (
            <div>
                <br/><br/>
                <div className="col-3">
                    <TextInput {...props} />
                </div>
            </div>
        );
    });
