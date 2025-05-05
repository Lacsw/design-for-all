import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias';
import { checker } from 'vite-plugin-checker';

export default defineConfig(() => {
  return {
    base: '/',
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
          format: 'es',
          exports: 'named',
        },
        external: [/assets\/index2\.(css|js)$/],
      },

      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    optimizeDeps: {
      include: [
        'i18next',
        'i18next-browser-languagedetector',
        'i18next-http-backend',
        'cross-fetch',
      ],
      esbuildOptions: {
        target: 'esnext',
        format: 'esm',
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    plugins: [
      react(),
      alias({
        entries: {
          /* При изменениях alias не забудьте соответствующе обновить:
          settings → import/resolver → alias в eslintrc.json */
          utils: '/src/utils',
          contexts: '/src/contexts',
          store: '/src/store',
          components: '/src/components',
          images: '/src/images',
          styles: '/src/styles',
          types: '/src/types',
          node_modules: '/node_modules',
        },
      }),
      checker({
        overlay: {
          initialIsOpen: 'error',
        },
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx}"',
          useFlatConfig: false,
          dev: {
            logLevel: ['error', 'warning'],
          },
        },
      }),
    ],
  };
});
