/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths'

/** @type { import('vite').defineConfig }*/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
});
