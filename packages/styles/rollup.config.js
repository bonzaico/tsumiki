import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import flow from "rollup-plugin-flow";
import { uglify } from "rollup-plugin-uglify";
import commonjs from "rollup-plugin-commonjs";
import serve from "rollup-plugin-serve";
import replace from "rollup-plugin-replace";
const fs = require("fs");
import scss from 'rollup-plugin-scss';


export default {
  input: 'index.js',
  output: {
    file: 'dist/output.js',
    format: 'esm'
  },
  plugins: [
    scss({
        output: 'dist/output.css'
    })
  ]
}
