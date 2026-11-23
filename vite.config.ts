import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('lucide-react')) return 'vendor-icons';
            return 'vendor-react';
          }
          if (id.includes('/hyperExpansion72/packA_')) return 'data-h72-a';
          if (id.includes('/hyperExpansion72/packB_')) return 'data-h72-b';
          if (id.includes('/hyperExpansion72/packC')) return 'data-h72-c';
          if (id.includes('/hyperExpansion72/packD')) return 'data-h72-d';
          if (id.includes('/megaExpansion50/')) return 'data-mega50';
          if (id.includes('/curriculumExpansion/')) return 'data-curriculum';
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
  },
});
