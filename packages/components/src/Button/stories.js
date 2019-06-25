import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "../Button";

storiesOf("Button")
    .add("without props", () => <Button />)
    .add("with props", () => <Button label="Click me" onClick={action("clicked")}/>);
