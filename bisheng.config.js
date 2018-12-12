const path = require('path')

module.exports = {
    source: './docs',
    output: './site',
    theme: './theme',
    themeConfig: {
        home: '/',
        sitename: 'bisheng-demo'
    },
    port: 8000,
    webpackConfig: function (config) {
        config.resolve.alias = {
            'bisheng-demo/lib': path.resolve(__dirname, './src')
        }
        
        return config
    },
    htmlTemplate: './template.html',
    htmlTemplateExtraData: {
        time: Date.now()
    },
    root: '/'
}