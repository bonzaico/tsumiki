import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Tag } from ".";

storiesOf("Tags", module)
    .add("Default", () => {
        const props = {
            content: "This is a tag",
            onClick: action("onClick")
        };
        return (
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <Tag {...props}></Tag>
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
