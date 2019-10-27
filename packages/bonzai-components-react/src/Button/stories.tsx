import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from ".";

storiesOf("Buttons", module)
    .add("Default", () => {
        const props = {
            className: "custom-class",
            // kind: "primary",
            disabled: false,
            // size: "medium"
        };
        return (
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <Button {...props}>Button</Button>
            </div>
        );
    })
    .add("with props", () => <Button onClick={action("onClick")}>Click Me</Button>);
