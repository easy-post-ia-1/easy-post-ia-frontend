/// <reference types="vite/client" />
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { defineConfig as testConfig, mergeConfig } from 'vitest/config';
import 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import oxlintPlugin from 'vite-plugin-oxlint';
import path from 'path';

// https://vitejs.dev/config/
const config = defineConfig({
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
    port: 3000,
    strictPort: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:3000',
    allowedHosts: true,
  },
});

const test = testConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./setupTests.ts'],
  },
});

export default mergeConfig(config, test);
