import fs from "fs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";

const year = new Date().getFullYear();

let PLUGINS = [
    postcss({
        extract: true,
        minimize: true
    }),
    external(),
    resolve(),
    typescript({
        rollupCommonJSResolveHack: true,
        exclude: "**/__tests__/**",
        clean: true
    }),
    commonjs({
        include: ["node_modules/**"],
        namedExports: {
            "node_modules/react/react.js": [
                "Children",
                "Component",
                "PropTypes",
                "createElement"
            ],
            "node_modules/react-dom/index.js": ["render"]
        }
    }),
    terser({
        output: {
            comments: /^!/
        }
    })
];

const BANNER = `/*!
* Copyright (c) ${year} Bonzai Digital Pte. Ltd., All rights reserved.
*/
`;
const BASEDIR = "src";

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
const componentList = getDirectories(BASEDIR);

const config = componentList.map(component => {
    const file = fs.readdirSync(`${BASEDIR}/${component}`).find(fn => fn === `${component}.tsx`);
    if (!file) return {};
    return {
        external: ["react", "react-dom"],
        input: `${BASEDIR}/${component}/${component}.tsx`,
        output: [{
            file: `dist/${component}/index.js`,
            format: "cjs",
            exports: "named",
            sourcemap: true,
            banner: BANNER
        }, {
            file: `dist/${component}/index.es.js`,
            format: "es",
            exports: "named",
            sourcemap: true,
            banner: BANNER
        }],
        plugins: PLUGINS
    };
});

export default config;
