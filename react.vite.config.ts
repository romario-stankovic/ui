import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: "dist/packages/react/src/index.ts",
            name: "@romario-stankovic/ui/react",
            fileName: "index"
        },
        outDir: "dist/release/react",
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
