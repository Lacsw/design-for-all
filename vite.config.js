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
      },
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
        esmExternals: true,
        // transformMixedEsModules: true,
        // esmExternals: true,
      },
      cssCodeSplit: false,
      minify: 'esbuild',
      // cssCodeSplit: false,
      // minify: 'esbuild',
    },
    optimizeDeps: {
      include: [
        'i18next',
        'i18next-browser-languagedetector',
        'i18next-http-backend',
        'cross-fetch'
      ],
      esbuildOptions: {
        target: 'esnext',
        format: 'esm'
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    plugins: [
      react(),
      // Простой плагин исключения index2.css/js
      {
        name: 'exclude-iframe-assets',
        enforce: 'pre',
        resolveId(id) {
          if (id.includes('index2.css') || id.includes('index2.js')) {
            return { id, external: true };
          }
        }
      },
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
