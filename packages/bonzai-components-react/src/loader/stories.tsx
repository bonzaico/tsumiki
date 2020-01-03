import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Loader } from "./loader";

storiesOf("Loader", module)
    .add("Default", () => {
        const props = {
            description: "Loading..."
        };
        return (
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <div className="bz--col-12">
                    <Loader {...props} />
                </div>
            </div>
        );
    });
