import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import oxlintPlugin from 'vite-plugin-oxlint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), oxlintPlugin()],
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
});
