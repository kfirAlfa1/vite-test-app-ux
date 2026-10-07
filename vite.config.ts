import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    // In the Base44 preview sandbox, the proxy sends a rotating Host header
    // of the form <port>-<sandbox-id>.<sandbox-host-domain>. Vite 5.4 rejects
    // unknown hosts with 403, so allow the sandbox host suffix in preview mode.
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
