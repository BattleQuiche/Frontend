// Inside vue.config.js
module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
        name: 'BattleQuiche',
        themeColor: '#d9b12b',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        orientation: "landscape",

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'public/sw.js',
            // ...other Workbox options...
        },
        manifestOptions: {
            start_url: '.',
            display: 'standalone',
        }
    }
}
