import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  assetsInclude: ["**/*.glb", "**/*.hdr", "**/*.HDR"],
  server: {
    host: "0.0.0.0",
    port: 3000,
    https: false,
    open: true,
    // Additional configurations...
  },
});
