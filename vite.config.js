import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://ec2-3-27-67-12.ap-southeast-2.compute.amazonaws.com", // backend base URL
        changeOrigin: true, // rewrites the origin of the host header to the target
        secure: false,      // if https and self-signed, set false
        rewrite: (path) => path.replace(/^\/api/, ""), // remove `/api` prefix
      },
    },
  },
});
