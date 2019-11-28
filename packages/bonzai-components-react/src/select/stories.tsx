import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Select } from "./select";

storiesOf("Select", module)
    .add("With Search", () => {
        const options = [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Pear", value: "pear" },
            { label: "Watermelon", value: "watermelon" },
            { label: "Starfruit", value: "starfruit" },
            { label: "Muskmelon", value: "muskmelon" },
        ];
        return (
            <div className="bz--col-4">
                <Select options={options} value="banana"></Select>
            </div>
        )
    })
    .add("Without Search", () => {
        const options = [
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Pear", value: "pear" },
        ];
        return (
            <div className="bz--col-4">
                <Select options={options} value="banana"></Select>
            </div>
        )
    });
