import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import metadata from "./metadata.json";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "inline-assets",
      enforce: "post",
      generateBundle(options, bundle) {
        // Handle CSS first
        const cssChunks = Object.keys(bundle).filter((key) =>
          key.endsWith(".css")
        );
        const jsChunks = Object.keys(bundle).filter((key) =>
          key.endsWith(".js")
        );
        const assetChunks = Object.keys(bundle).filter(
          (key) => !key.endsWith(".css") && !key.endsWith(".js")
        );

        if (jsChunks.length) {
          const jsChunk = bundle[jsChunks[0]];
          let injectCode = "";

          // Handle CSS
          if (cssChunks.length) {
            const cssContent = cssChunks
              .map((key) => bundle[key].source)
              .join("\n");

            injectCode += `
              (function() {
                const style = document.createElement('style');
                style.textContent = ${JSON.stringify(cssContent)};
                document.head.appendChild(style);
              })();
            `;
          }

          console.log("bundle", bundle);

          // Handle other assets
          if (assetChunks.length) {
            const assetMap = {};
            assetChunks.forEach((key) => {
              const asset = bundle[key];
              let source = asset.source || asset.code;
              if (source) {
                if (typeof source !== "string") {
                  source = Buffer.from(source).toString("utf-8");
                }
                if (key.endsWith(".svg")) {
                  assetMap[key] = `data:image/svg+xml;base64,${Buffer.from(
                    source
                  ).toString("base64")}`;
                } else {
                  const base64 = Buffer.from(source).toString("base64");
                  const mimeType = key.endsWith(".png")
                    ? "image/png"
                    : key.endsWith(".jpg") || key.endsWith(".jpeg")
                    ? "image/jpeg"
                    : "application/octet-stream";
                  assetMap[key] = `data:${mimeType};base64,${base64}`;
                }
              }
            });

            injectCode += `
              (function() {
                window.__vite_assets = ${JSON.stringify(assetMap)};
                // Replace imported asset URLs with base64 versions
                const originalResolveUrl = import.meta.url;
                import.meta.url = new Proxy({}, {
                  get: (target, prop) => {
                    if (window.__vite_assets[prop]) {
                      return window.__vite_assets[prop];
                    }
                    return originalResolveUrl[prop];
                  }
                });
              })();
            `;
          }

          jsChunk.code = injectCode + jsChunk.code;

          // Remove processed chunks
          [...cssChunks, ...assetChunks].forEach((key) => delete bundle[key]);
        }
      },
    },
  ],
  build: {
    target: "esnext",
    outDir: "dist",
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      input: resolve(__dirname, "src/main.jsx"),
      output: {
        format: "iife",
        entryFileNames: `build.v${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildPatch}.js`,
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
    write: true,
    emptyOutDir: true,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  server: {
    port: 1234,
    proxy: {
"/infinite/api": "http://localhost:3000",    
},
// proxy:{
//   "/serialization_table_config_api":"http://app.msd.zelthy.com:8000/",
//   "/serialization-wh/api/":"http://app.msd.zelthy.com:8000/"
// }
  },
});
