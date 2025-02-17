const { CssCompiler } = require("./plugins/css-resolver.cjs");
/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
    files: "src/**",
    targets: ["react", "vue"],
    dest: "./dist/packages",
    parserOptions: {
        jsx: {
            tsConfigFilePath: "./tsconfig.mitosis.json"
        }
    },
    commonOptions: {
        typescript: true,
        prettier: true,
        plugins: [CssCompiler]
    },
    options: {
        react: {
            stylesType: "style-tag"
        },
        vue: {
            api: "composition"
        }
    }
};
