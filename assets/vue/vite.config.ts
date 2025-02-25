import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [vue(), dts({ tsconfigPath: "./tsconfig.app.json" })],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "@romario-stankovic/ui/vue",
            fileName: "index"
        },
        outDir: resolve(__dirname, "./dist"),
        emptyOutDir: true,
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    }
});
