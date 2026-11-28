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
          if (id.includes('/millennium100/pack1_')) return 'data-m100-1';
          if (id.includes('/millennium100/pack2_')) return 'data-m100-2';
          if (id.includes('/millennium100/pack3_')) return 'data-m100-3';
          if (id.includes('/millennium100/pack4_')) return 'data-m100-4';
          if (id.includes('/millennium100/pack5_')) return 'data-m100-5';
          if (id.includes('/millennium100/pack6_')) return 'data-m100-6';
          if (id.includes('/millennium100/pack7_')) return 'data-m100-7';
          if (id.includes('/centurion100/pack1_')) return 'data-c100-1';
          if (id.includes('/centurion100/pack2_')) return 'data-c100-2';
          if (id.includes('/centurion100/pack3_')) return 'data-c100-3';
          if (id.includes('/centurion100/pack4_')) return 'data-c100-4';
          if (id.includes('/centurion100/pack5_')) return 'data-c100-5';
          if (id.includes('/centurion100/pack6_')) return 'data-c100-6';
          if (id.includes('/hyperExpansion72/packA_')) return 'data-h72-a';
          if (id.includes('/hyperExpansion72/packB_')) return 'data-h72-b';
          if (id.includes('/hyperExpansion72/packC')) return 'data-h72-c';
          if (id.includes('/hyperExpansion72/packD')) return 'data-h72-d';
          if (id.includes('/megaExpansion50/')) return 'data-mega50';
          if (id.includes('/curriculumExpansion/')) return 'data-curriculum';
          if (id.includes('/coachKnowledge/')) return 'data-coach';
          if (id.includes('/extensionV19/')) return 'data-x19';
          if (id.includes('/extensionV20/')) return 'data-x20';
          if (id.includes('/extensionV21/')) return 'data-x21';
          if (id.includes('/extensionV22/')) return 'data-x22';
          if (id.includes('/extensionV23/')) return 'data-x23';
          if (id.includes('/extensionV24/')) return 'data-x24';
          if (id.includes('/newSubjects/')) return 'data-x24';
          if (id.includes('/extensionV25/')) return 'data-x25';
          if (id.includes('/newSubjectsV25/')) return 'data-x25';
          if (id.includes('/extensionV26/')) return 'data-x26';
          if (id.includes('/newSubjectsV26/')) return 'data-x26';
          if (id.includes('/extensionV27/')) return 'data-x27';
          if (id.includes('/newSubjectsV27/')) return 'data-x27';
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
