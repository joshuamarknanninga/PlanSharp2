import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const host = process.env.VITE_HOST ?? '0.0.0.0';
const port = Number(process.env.VITE_PORT ?? 5173);
const hmrHost = process.env.VITE_HMR_HOST ?? 'localhost';
const hmrProtocol = (process.env.VITE_HMR_PROTOCOL as 'ws' | 'wss' | undefined) ?? 'ws';
const hmrClientPort = Number(process.env.VITE_HMR_CLIENT_PORT ?? port);

export default defineConfig({
  plugins: [react()],
  server: {
    host,
    port,
    strictPort: true,
    hmr: {
      host: hmrHost,
      protocol: hmrProtocol,
      clientPort: hmrClientPort
    }
  }
});
