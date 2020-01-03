import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { NonIdealState } from "./non-ideal-state";
import { Button } from "../button/button";

storiesOf("NonIdealState", module)
    .add("Default", () => {
        const props = {
            header: "No Search Result",
            description: "Sorry, We couldn't find what you're searching for."
        };

        const btnProps = {
            className: "custom-class",
            disabled: false
        };

        const action = <Button {...btnProps}>Button Primary</Button>;

        return (
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <div className="bz--col-12">
                    <NonIdealState
                        action= {action}
                        {...props} />
                </div>
            </div>
        );
    });
