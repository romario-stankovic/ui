const sass = require("sass");
const path = require("path");

/**
 * @type {import('@builder.io/mitosis').MitosisPlugin}
 */
module.exports = (options) => {
    return {
        json: {
            pre: (json) => {
                // Set initial style to an empty string if it doesn't exist
                json.style ??= "";
                // Loop over imports and look for anything ending in ".css", ".scss", or ".sass"
                for (const imp of json.imports) {
                    if (imp.path.endsWith(".css") || imp.path.endsWith(".scss") || imp.path.endsWith(".sass")) {
                        // Remove the import from the list as it is not needed in the final component
                        json.imports = json.imports.filter((i) => i !== imp);

                        // Resolve the relative path of the import
                        if (imp.path.startsWith(".")) {
                            imp.path = path.resolve(
                                json.pluginData.path.substring(0, json.pluginData.path.lastIndexOf("/")),
                                imp.path
                            );
                        }

                        // Compile the CSS/SCSS/SASS file and append it to the style string
                        json.style +=
                            sass.compile(imp.path, {
                                loadPaths: [path.join(__dirname, "../src")]
                            }).css + "\n";
                    }
                }
            }
        }
    };
};
