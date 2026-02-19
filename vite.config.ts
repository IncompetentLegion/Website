import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_PORT = process.env.PORT || 7000;

export default defineConfig({
  server: {
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      "/api": `http://localhost:${API_PORT}`,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
