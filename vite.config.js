import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';

export default defineConfig(() => {
  return {
    base: '/',
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
    plugins: [
      react(),
      alias({
        entries: {
          utils: '/src/utils',
          contexts: '/src/contexts',
          store: '/src/store',
          components: '/src/components',
          images: '/src/images',
          styles: '/src/styles',
        },
      }),
    ],
  };
});
