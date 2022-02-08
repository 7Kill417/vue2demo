module.exports = {
    publicPath: './',
    lintOnSave: false,
    devServer: {
        proxy: {
            // '/api': {
            //     // 此处的写法，目的是为了 将 /api 替换成 http://81.70.95.45:8091
            //     target: 'http://81.70.95.45:8091/douyin-api',
            //     // 允许跨域
            //     changeOrigin: true,
            //    // ws: true,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // }
        }
    }
}