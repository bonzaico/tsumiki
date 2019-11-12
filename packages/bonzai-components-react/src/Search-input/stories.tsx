import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SearchInput } from ".";

storiesOf("Search input", module)
    .add("Default", () => {
        const props = {
            value: "",
            placeHolder: "Search for brands"
        };
        return (
            <SearchInput {...props} />
        );
    })
    .add("Type end", () => {
        const props = {
            value: "",
            placeHolder: "Search for brands",
            onTypeEnd: action("onTypeEnd")
        };
        return (
            <SearchInput {...props} />
        );
    });
