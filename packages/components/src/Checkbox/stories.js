import React from "react";
import { storiesOf } from "@storybook/react";
import { Checkbox } from "../Checkbox";

storiesOf("Checkbox")
    .add("without props", () => <Checkbox />)
    .add("with props", () => <Checkbox label="Hey"/>);
