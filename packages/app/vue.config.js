const SentryWebpackPlugin = require('@sentry/webpack-plugin');
// get last commit id as revision for /env-config.js
const VERSION = process.env.VERSION || null;
const manifestJSON = require('./public/manifest.json');

const webpackPlugins = [];

if (process.env.NODE_ENV === 'production') {
  if (process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT) {
    webpackPlugins.push(new SentryWebpackPlugin({
      release: VERSION,
      include: 'dist',
      dryRun: process.env.NODE_ENV !== 'production',
    }));
  } else {
    console.log('Please set SENTRY_AUTH_TOKEN, SENTRY_ORG and SENTRY_PROJECT to enable sentry releases!');
  }
}

module.exports = {
  devServer: {
    proxy: {
      '^/api/*': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    progress: false,
  },
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  configureWebpack: {
    plugins: webpackPlugins,
  },
  transpileDependencies: ['vue-oidc-client'],
};
