import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
    plugins: [vue(), dts({ tsconfigPath: "./tsconfig.app.json" })],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "@romario-stankovic/ui/vue",
            fileName: "index"
        },
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "./src")
        }
    }
});
