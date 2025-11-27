import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'security-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Content Security Policy
          res.setHeader(
            'Content-Security-Policy',
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' https://fonts.gstatic.com; " +
            "connect-src 'self' https://generativelanguage.googleapis.com; " +
            "img-src 'self' data: https:; " +
            "frame-ancestors 'none';"
          );
          // Prevent clickjacking
          res.setHeader('X-Frame-Options', 'DENY');
          // Prevent MIME sniffing
          res.setHeader('X-Content-Type-Options', 'nosniff');
          // Enable XSS protection
          res.setHeader('X-XSS-Protection', '1; mode=block');
          // Referrer policy
          res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
          next();
        });
      }
    }
  ],
  base: '/mbti-test/',
})
