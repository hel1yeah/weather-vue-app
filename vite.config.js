import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const varsPath = path
  .resolve(fileURLToPath(new URL('./src/assets/scss/_vars.scss', import.meta.url)))
  .replace(/\\/g, '/');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${varsPath}";`,
        silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin'],
      },
    },
  },
});
