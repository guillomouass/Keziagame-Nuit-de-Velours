import { defineConfig } from 'vite';

// base './' : la version construite (dist/) fonctionne depuis n'importe quel dossier ou hébergeur.
export default defineConfig({
  base: './',
  server: { port: 5178, host: true },
  preview: { port: 4178 },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2000,
  },
  test: { environment: 'node', include: ['tests/**/*.test.js'] },
});
