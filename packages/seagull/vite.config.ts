import Vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import { VitePWA } from 'vite-plugin-pwa';
import Layouts from 'vite-plugin-vue-layouts';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: 'prose prose-sm m-auto text-left',
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      manifest: {
        name: 'Obelix',
        short_name: 'Obelix',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['vue-demi'],
  },
});
