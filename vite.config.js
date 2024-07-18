import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // legacy({
    //   targets: ['defaults', 'not IE 11', 'Chrome 52'],
    //   modernPolyfills: true
    //   // polyfills: ['es.promise.finally', 'es/map', 'es/set']
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  // build: {
  //   target: ['ios11'],
  //   minify: 'terser'
  // },
});
