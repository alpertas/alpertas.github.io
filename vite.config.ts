import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize React for production
      babel: {
        plugins:
          process.env.NODE_ENV === 'production'
            ? [['transform-remove-console', { exclude: ['error', 'warn'] }]]
            : [],
      },
    }),
  ],
  base: '/',
  // Aggressive dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    // Force optimize these dependencies
    force: true,
  },
  build: {
    // Optimize for production
    minify: 'terser',
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    // Reduce chunk size limit warnings
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        // Remove console logs
        drop_console: true,
        drop_debugger: true,
        // Remove unused code
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        // Aggressive chunk splitting for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // UI and animations
          'ui-vendor': ['framer-motion', 'lucide-react'],
          // Separate large components
          components: [
            './src/components/effects/NetworkBackground',
            './src/components/sections/Hero',
            './src/components/sections/Skills',
          ],
        },
        // Optimize chunk naming
        chunkFileNames: chunkInfo => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split('/')
                .pop()
                ?.replace(/\.(tsx?|jsx?)$/, '') || 'chunk'
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        // Optimize asset naming
        assetFileNames: assetInfo => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext || '')) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
      // Tree shaking optimization
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
  },
  // Development optimizations
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
  // Preview optimizations
  preview: {
    port: 3000,
    open: true,
  },
});
