import { defineConfig } from "vite";
import { minifyHtml } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";
import { Packer, InputType, InputAction } from "roadroller";

export default defineConfig({
  plugins: [
    {
      name: "roadroller",
      async transformIndexHtml(html, context) {
        if (!context || !context.bundle) return html;

        let transformedScripts = [];

        for (const asset of Object.values(context.bundle)) {
          if (asset.type !== "chunk") continue;

          html = html.replace(new RegExp(`<script type="module"[^>]*?src="/${asset.fileName}"[^>]*?></script>`), "");

          const packer = new Packer(
            [
              {
                data: asset.code,
                type: "js" as InputType.JS,
                action: "eval" as InputAction.Eval,
              },
            ],
            {}
          );

          await packer.optimize();

          const { firstLine, secondLine } = packer.makeDecoder();

          transformedScripts.push(`<script>${firstLine}${secondLine}</script>`);
        }

        return html.replace(/<\/body>/, `${transformedScripts.join("")}</body>`);
      },
    },
    viteSingleFile(),
    minifyHtml(),
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
  logLevel: "warn",
});
