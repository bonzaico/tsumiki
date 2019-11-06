import { configure } from "@storybook/react";
import "bonzai-styles/dist/output.css";

const req = require.context("../src", true, /stories\.(ts|tsx)$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
