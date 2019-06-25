// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import flow from "rollup-plugin-flow";
import { uglify } from "rollup-plugin-uglify";
import multiEntry from "rollup-plugin-multi-entry";
import commonjs from "rollup-plugin-commonjs";

const year = new Date().getFullYear();

const PLUGINS = [
    flow(),
    multiEntry(),
    babel({
        exclude: "node_modules/**" // only transpile our source code
    }),
    uglify({
        output: {
            comments: /^!/
        }
    }),
    resolve(),
    commonjs()
];

const BANNER = `/*!
* Copyright (c) ${year} Bonzai Digital Pte. Ltd., All rights reserved.
*/
`;
const folders = ["BZButton", "BZCheckbox"];

const IO = folders.map((f) => ({
    external: ['react', 'react-dom'],
    input: `src/${f}/index.js`,
    output: {
        file: `build/${f}/index.js`,
        format: "cjs"
    },
    plugins: PLUGINS
}));

export default IO;
