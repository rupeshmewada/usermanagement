import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/user": "http://localhost:3000",
      "/todo": "http://localhost:3000",
    },
  },

  build: {
    sourcemap: false,
  },
});
