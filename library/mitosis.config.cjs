const { CssCompiler } = require("./plugins/css-resolver.cjs");
/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
    files: "src/**",
    targets: ["react", "vue"],
    dest: "../packages",
    commonOptions: {
        typescript: true
    },
    options: {
        react: {
            stylesType: "style-tag",
            plugins: [CssCompiler]
        },
        vue: {
            api: "composition",
            plugins: [CssCompiler]
        }
    }
};
