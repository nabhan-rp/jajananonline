import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Pastikan hasil build masuk ke folder dist
    outDir: 'dist',
    // Kosongkan folder dist sebelum build baru
    emptyOutDir: true,
  },
  // Base ./ agar bisa jalan di subfolder atau hosting statis biasa
  base: './' 
});