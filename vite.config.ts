import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    ...(process.env.BASE44_PREVIEW_MODE === "1" && process.env.BASE44_SANDBOX_HOST_DOMAIN
      ? { allowedHosts: [`.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`] }
      : {}),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
