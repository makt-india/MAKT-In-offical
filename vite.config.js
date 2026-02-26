import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],

  build: {
    // Raise the warning threshold to 1000kb (three.js is large by nature)
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          // React core — tiny, loads first
          "vendor-react": ["react", "react-dom"],

          // Router — separate so it caches independently
          "vendor-router": ["react-router-dom"],

          // Icons — medium sized, shared across all pages
          "vendor-icons": ["lucide-react"],

          // Framer Motion — only used in IntroOverlay (already dynamic imported)
          // No manual chunk needed — Vite handles dynamic imports automatically

          // Three.js — largest chunk, lazy loaded in Galaxy3D already
          // No manual chunk needed — dynamic import() handles this automatically
        },
      },
    },
  },
});