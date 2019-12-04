import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "./button";

storiesOf("Buttons", module)
    .add("Default", () => {
        const props = {
            className: "custom-class",
            // kind: "primary",
            disabled: false,
            // size: "medium"
        };
        const propsSecondary = {
            className: "custom-class",
            kind: "secondary" as const,
            disabled: false,
            // size: "medium"
        };
        const propsTertiary = {
            className: "custom-class",
            kind: "tertiary" as const,
            disabled: false,
            // size: "medium"
        };
        return (
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <div className="bz--col-2">
                    <Button {...props}>Button Primary</Button>
                </div>
                <div className="bz--col-2">
                    <Button {...propsSecondary}>Button Secondary</Button>
                </div>
                <div className="bz--col-2">
                    <Button {...propsTertiary}>Button Tertiary</Button>
                </div>
            </div>
        );
    })
    .add("with props", () => <Button onClick={action("onClick")}>Click Me</Button>)
    .add("Disabled", () => {
        const propsDisabled = {
            className: "custom-class",
            // kind: "primary",
            disabled: true,
            // size: "medium"
        };
        const propsSecondaryDisabled = {
            className: "custom-class",
            kind: "secondary" as const,
            disabled: true,
            // size: "medium"
        };
        const propsTertiaryDisabled = {
            className: "custom-class",
            kind: "tertiary" as const,
            disabled: true,
            // size: "medium"
        };
        return (
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <div className="bz--col-2">
                    <Button {...propsDisabled}>Button Primary</Button>
                </div>
                <div className="bz--col-2">
                    <Button {...propsSecondaryDisabled}>Button Secondary</Button>
                </div>
                <div className="bz--col-2">
                    <Button {...propsTertiaryDisabled}>Button Tertiary</Button>
                </div>
            </div>
        );
    })
