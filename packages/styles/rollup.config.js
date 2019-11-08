import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import stylelint from "stylelint";


export default {
    input: 'index.js',
    output: {
        file: 'dist/output.js',
        format: 'esm'
    },
    plugins: [
        postcss({
            extract: true,
            minimize: false,
            plugins: [
                stylelint(),
                autoprefixer
            ]
        })
    ]
}
