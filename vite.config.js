import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function redirectToolsPlugin() {
  const redirects = {
    '/tools/mp4-to-mp3': '/mp4-to-mp3',
    '/tools/webm-to-mp4': '/webm-to-mp4',
    '/tools/convert/webm-to-mp4': '/webm-to-mp4',
    '/tools/merge-pdf': '/merge-pdf',
    '/tools/jpg-to-pdf': '/jpg-to-pdf',
    '/tools/pdf-to-jpg': '/pdf-to-jpg',
    '/tools/compress-image': '/compress-image',
    '/tools': '/',
  };
  const handleRedirect = (req, res, next) => {
    const urlPath = (req.url || '').split('?')[0].replace(/\/+$/, '') || '/';
    if (redirects[urlPath]) {
      res.statusCode = 301;
      res.setHeader('Location', redirects[urlPath]);
      res.end();
      return;
    }
    next();
  };

  return {
    name: 'redirect-tools-middleware',
    configureServer(server) {
      server.middlewares.use(handleRedirect);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleRedirect);
    },
  };
}

export default defineConfig({
  plugins: [
    redirectToolsPlugin(),
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
});
