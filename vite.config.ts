import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";
import kontra from "rollup-plugin-kontra";
import { Packer, InputType, InputAction } from "roadroller";

export default defineConfig((configEnv) => ({
  plugins: [
    kontra({
      debug: configEnv.command === "serve",
      gameObject: {
        acceleration: true,
        anchor: true,
        camera: false,
        group: true,
        opacity: false,
        rotation: false,
        scale: true,
        ttl: true,
        velocity: true,
      },
      sprite: {
        animation: true,
        image: true,
      },
      text: { auto: false, newline: false, rtl: false, text: false },
      vector: {
        angle: false,
        clamp: false,
        distance: false,
        dot: false,
        length: false,
        normalize: false,
        scale: false,
        subtract: false,
      },
    }),
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
    createHtmlPlugin(),
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },
  logLevel: configEnv.command === "serve" ? "info" : "warn",
}));
