const sass = require("sass");
const path = require("path");

/**
 * @type {import('@builder.io/mitosis').Plugin}
 */
function CssResolver(options) {
    return {
        json: {
            pre: (json) => {
                const imports = json.imports || [];
                json.style ??= "";
                for (const imp of imports) {
                    if (imp.path.endsWith(".css") || imp.path.endsWith(".scss") || imp.path.endsWith(".sass")) {
                        json.imports = json.imports.filter((i) => i !== imp);
                        json.style +=
                            sass.compile(imp.path, { loadPaths: [path.join(__dirname, "../src")] }).css + "\n";
                    }
                }
            }
        }
    };
}

module.exports = {
    CssCompiler: CssResolver
};
