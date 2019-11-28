import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Select } from "./select";

storiesOf("Select", module)
    .add("Default", () => {
        const options = [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Pear", value: "pear" },
            { label: "Watermelon", value: "watermelon" },
            { label: "Starfruit", value: "starfruit" },
            { label: "Muskmelon", value: "muskmelon" },
        ];
        return (
            <Select options={options} value="banana"></Select>
        )
    });
