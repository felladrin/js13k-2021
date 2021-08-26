import { defineConfig } from "vite";
import { minifyHtml } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile(), minifyHtml()],
  logLevel: "warn",
  build: {
    target: "esnext",
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: {},
      },
    },
  },
});
