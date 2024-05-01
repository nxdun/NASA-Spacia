import { defineConfig } from "vite";
import React from "@vitejs/plugin-react-swc";
export default defineConfig({
    plugins: [React()],
    test: {
        environment: 'jsdom',
    },
    resolve: {
        alias: {
          src: "/src",
        },
      }
});