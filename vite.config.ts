import { defineConfig } from "vite";
import { minifyHtml } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";
import { Packer, InputType, InputAction } from "roadroller";

export default defineConfig({
  plugins: [
    {
      name: "roadroller",
      transformIndexHtml(html, context) {
        if (!context || !context.bundle) return html;

        let transformedScripts = "";

        for (const asset of Object.values(context.bundle)) {
          if (asset.type !== "chunk") continue;

          const { firstLine, secondLine } = new Packer(
            [
              {
                data: asset.code,
                type: "js" as InputType.JS,
                action: "eval" as InputAction.Eval,
              },
            ],
            {
              maxMemoryMB: 1024,
            }
          ).makeDecoder();

          transformedScripts = transformedScripts.concat(`<script>${firstLine}\n${secondLine}</script>`);

          html = html.replace(new RegExp(`<script type="module"[^>]*?src="/${asset.fileName}"[^>]*?></script>`), "");
        }

        return html.replace(/<\/body>/, transformedScripts + "</body>");
      },
    },
    viteSingleFile(),
    minifyHtml(),
  ],
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
