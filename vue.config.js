module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js', // swSrc is required in InjectManifest mode
      // TODO: Remove it if unsued
      // Possibly usefull to add ressources to workbox cache
      // globPatterns: [
      //   '*.css',
      //   'index.html',
      //   'app.js',
      //   'http://remote/image.jpg'
      // ]
    },
    themeColor: '#fbdd01',
    msTileColor: '#000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      name: 'Quiches Wars',
      short_name: 'Quiches Wars',
      description: 'Bataille de quiches',
      lang: 'fr-FR',
      start_url: '.',
      display: 'standalone',
      orientation: 'landscape',
      theme_color: '#fbdd01',
      prefer_related_applications: false,
      icons: [
        {
          src: '/img/icons/android-chrome-192x192.png',
          type: 'image/png',
          sizes: '192x192',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/android-chrome-512x512.png',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/android-chrome-maskable-192x192.png',
          type: 'image/png',
          sizes: '192x192',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/android-chrome-maskable-512x512.png',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/apple-touch-icon.png',
          type: 'image/png',
          sizes: '180x180',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/apple-touch-icon-120x120.png',
          type: 'image/png',
          sizes: '120x120',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/apple-touch-icon-152x152.png',
          type: 'image/png',
          sizes: '152x152',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/apple-touch-icon-180x180.png',
          type: 'image/png',
          sizes: '180x180',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/apple-touch-icon-60x60.png',
          type: 'image/png',
          sizes: '60x60',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/apple-touch-icon-76x76.png',
          type: 'image/png',
          sizes: '76x76',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/favicon-16x16.png',
          type: 'image/png',
          sizes: '16x16',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/favicon-32x32.png',
          type: 'image/png',
          sizes: '32x32',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/msapplication-icon-144x144.png',
          type: 'image/png',
          sizes: '144x144',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/mstile-150x150.png',
          type: 'image/png',
          sizes: '150x150',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/quiches-icon-200x200.png',
          type: 'image/png',
          sizes: '200x200',
          purpose: 'any maskable',
        },
        {
          src: '/img/icons/quiches-icon-460x460.png',
          type: 'image/png',
          sizes: '460x460',
          purpose: 'any maskable',
        },
      ],
    },
    iconPaths: {
      favicon16: './img/icons/favicon-16x16.png',
      favicon32: './img/icons/favicon-32x32.png',
      appleTouchIcon: './img/icons/apple-touch-icon.png',
      maskIcon: './img/icons/msapplication-icon-144x144.png',
      msTileImage: './img/icons/mstile-150x150.png',
    },
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      /* eslint-disable no-param-reassign */
      .tap((args) => {
        args[0].title = 'MyApp title';
        args[0].meta = { viewport: 'width=device-width, height=device-height, initial-scale=1.0,user-scalable=no, viewport-fit=cover' };

        return args;
      });
  },
};
