import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/js/theme.js'),
      output: {
        entryFileNames: 'theme.js',
        assetFileNames: 'theme.[ext]',
      },
    },
  },
});
