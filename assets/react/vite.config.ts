import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [react(), dts({ tsconfigPath: "./tsconfig.app.json" })],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "@romario-stankovic/ui/react",
            fileName: "index"
        },
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM"
                }
            }
        }
    }
});
