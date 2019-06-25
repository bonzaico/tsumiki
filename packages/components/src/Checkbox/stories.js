import React from "react";
import { storiesOf } from "@storybook/react";
import { BZCheckbox } from "../BZCheckbox";

storiesOf("Checkbox")
    .add("without props", () => <BZCheckbox />)
    .add("with props", () => <BZCheckbox label="Hey"/>);
