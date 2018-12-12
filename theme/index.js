const path = require('path')

module.exports = {
    routes: [
        {
            path: '/',
            component: '/template',
            dataPath: 'index'
        },
        {
            path: '/docs/:key',
            component: '/template',
            dataPath: '/:key'
        },
        {
            path: '/preview/:key',
            component: '/preview',
            dataPath: '/:key'
        }
    ],
    plugins: [
        path.resolve(__dirname, './plugins/backup'),
        'bisheng-plugin-react?lang=jsx'
    ]
}