/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** @type { import('vite').defineConfig }*/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: "preserve",
  },
  server: {
    port: 3000,
  },
});
