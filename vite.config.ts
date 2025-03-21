/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import oxlintPlugin from 'vite-plugin-oxlint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), oxlintPlugin()],
  resolve: {
    alias: {
      '@adapters': path.resolve(__dirname, './src/adapters'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@models': path.resolve(__dirname, './src/models'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@router': path.resolve(__dirname, './src/router'),
      '@services': path.resolve(__dirname, './src/services'),
      '@i18n': path.resolve(__dirname, './src/_i18n'),
      '@i18n-zod': path.resolve(__dirname, './src/_i18n-zod'),
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@stores': path.resolve(__dirname, './src/stores/'),
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:5173',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./setupTests.ts'],
  },
});
