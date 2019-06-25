import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { BZButton } from "../BZButton";

storiesOf("Button")
    .add("without props", () => <BZButton />)
    .add("with props", () => <BZButton label="Click me" onClick={action("clicked")}/>);
