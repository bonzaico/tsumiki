import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import stylelint from "stylelint";


export default {
  input: 'bundle.js',
  output: {
    file: 'dist/output.js',
    format: 'cjs'
  },
  plugins: [
  ]
}
