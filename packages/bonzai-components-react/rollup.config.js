import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import flow from "rollup-plugin-flow";
import { uglify } from "rollup-plugin-uglify";
import commonjs from "rollup-plugin-commonjs";
import serve from "rollup-plugin-serve";
import replace from "rollup-plugin-replace";
const fs = require("fs");

const year = new Date().getFullYear();

let PLUGINS = [
    flow(),
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
const BASEDIR = "src";
let config = [];

const componentList = fs.readdirSync(BASEDIR);
componentList.forEach((component) => {
    const file = fs.readdirSync(`${BASEDIR}/${component}`).find(fn => fn === "index.js");
    if (!file) return {};
    config.push({
        external: ['react', 'react-dom'],
        input: `${BASEDIR}/${component}/index.js`,
        output: {
            file: `build/${component}/index.js`,
            format: "cjs",
            banner: BANNER,
            globals: {
                react: "React",
                "react-dom": "ReactDOM"
            }
        },
        plugins: PLUGINS
    });
});

export default config;
