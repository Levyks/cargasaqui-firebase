import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import yaml from '@rollup/plugin-yaml';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), yaml()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
