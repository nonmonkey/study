import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import packageJson from './package';
import fs from 'fs';

function outputBuildMsg () {
  let msg = '';
  msg += `name: ${packageJson.name}\n`;
  msg += `version: ${packageJson.version}\n`;
  msg += `time: ${new Date().toLocaleString()}\n`;
  fs.writeFile('./public/.version', msg, () => {});
}
outputBuildMsg();

// https://vitejs.dev/config/
export default defineConfig({
  base: './',

  resolve: { alias: { '@': resolve(__dirname, 'src') } },

  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
      cache: false
    })
  ]
});
