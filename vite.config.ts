import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Optimize for production
    minify: 'terser',
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: id => {
          // React ve React-DOM'u vendor chunk'ına al
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          // Framer Motion'ı ayrı chunk'a al
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          // Lucide React'ı ayrı chunk'a al
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide';
          }
          // Diğer node_modules'ları vendor chunk'ına al
          if (id.includes('node_modules')) {
            return 'vendor-libs';
          }
        },
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
      },
    },
  },
});
