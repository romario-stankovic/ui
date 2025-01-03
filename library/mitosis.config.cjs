const { CssCompiler } = require("./plugins/css-resolver.cjs");
/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
    files: "src/**",
    targets: ["react", "vue"],
    dest: "../packages",
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
