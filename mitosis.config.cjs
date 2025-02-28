const { CssResolver } = require("./plugins/css-resolver.cjs");
/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
    files: "src/**",
    targets: ["react", "vue"],
    dest: "./packages",
    exclude: ["**/node_modules/**", "**/*.d.ts"],
    parserOptions: {
        jsx: {
            tsConfigFilePath: "./tsconfig.mitosis.json"
        }
    },
    commonOptions: {
        typescript: true,
        prettier: true,
        plugins: [CssResolver]
    },
    options: {
        react: {
            stylesType: "style-tag",
            addUseClientDirectiveIfNeeded: false
        },
        vue: {
            api: "composition"
        }
    }
};
