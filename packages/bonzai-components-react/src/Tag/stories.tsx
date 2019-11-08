import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Tag } from ".";

storiesOf("Tags", module)
    .add("Default", () => {
        const props1 = {
            content: "Grey tag",
            onClick: action("onClick")
        };
        const props2 = {
            content: "Green tag",
            onClick: action("onClick"),
            kind: "green" as const
        };
        const props3 = {
            content: "Blue tag",
            onClick: action("onClick"),
            kind: "blue" as const
        };
        const props4 = {
            content: "Red tag",
            onClick: action("onClick"),
            kind: "red" as const
        };
        const props5 = {
            content: "Yellow tag",
            onClick: action("onClick"),
            kind: "yellow" as const
        };
        return (
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <Tag {...props1}></Tag>
                <Tag {...props2}></Tag>
                <Tag {...props3}></Tag>
                <Tag {...props4}></Tag>
                <Tag {...props5}></Tag>
            </div>
        );
    })
    .add("with custom class", () => {
        const props = {
            content: "This is a tag",
            onClick: action("onClick"),
            className: "custom-class"
        };
        return <Tag {...props}></Tag>
    });
