import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: "packages/vue/src/index.ts",
            name: "@romario-stankovic/ui/vue",
            fileName: "index"
        },
        outDir: "dist/vue",
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
