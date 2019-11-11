import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextInput } from ".";

storiesOf("Text input", module)
    .add("Default", () => {
        const props = {
            value: "",
            errorMsg: "Wrong input",
            label: "Name",
            placeHolder: "Tyrion Lannister"
        };
        return (
            <TextInput {...props} />
        );
    })
    .add("Input for entering name", () => {
        const props = {
            value: "",
            errorMsg: "Wrong input",
            label: "Name",
            validate: /[a-z]+\s[a-z]+/
        };
        return (
            <TextInput {...props} />
        );
    })
    .add("Alert on type end", () => {
        const props = {
            value: "",
            errorMsg: "Wrong input",
            label: "Name",
            onTypeEnd: () => alert("Enter your name!")
        };
        return (
            <TextInput {...props} />
        );
    });
