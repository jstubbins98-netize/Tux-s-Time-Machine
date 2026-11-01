import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Build the same game into one HTML file, with no module requests or server.
const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.resolve(root, '../..');
const result = await build({
  configFile: false,
  root,
  mode: 'standalone',
  base: './',
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.join(root, 'src') } },
  build: {
    write: false,
    minify: true,
    cssCodeSplit: false,
    lib: {
      entry: path.join(root, 'src/main.tsx'),
      name: 'TuxTimeMachine',
      formats: ['iife'],
      fileName: () => 'game.js',
    },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
const bundles = Array.isArray(result) ? result : [result];
const outputs = bundles.flatMap((bundle) => bundle.output);
const javascript = outputs.filter((item) => item.type === 'chunk').map((item) => item.code).join('\n');
const css = outputs.filter((item) => item.type === 'asset' && item.fileName.endsWith('.css'))
  .map((item) => String(item.source)).join('\n');
if (!javascript || !css) throw new Error('Standalone build must contain both JavaScript and CSS.');
let html = await readFile(path.join(root, 'index.html'), 'utf8');
html = html
  .replace(/<script\b[^>]*src="\/src\/main\.tsx"[^>]*><\/script>/, '')
  .replace(/<link\b[^>]*>/g, '')
  .replace('</head>', () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>\n</head>`)
  .replace('</body>', () => `<script>${javascript.replace(/<\/script/gi, '<\\/script')}</script>\n</body>`);
await writeFile(path.join(outputDir, 'index.html'), html);
console.log(`Standalone game written to ${path.join(outputDir, 'index.html')}`);
