const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
	productionSourceMap: false,
	configureWebpack: {
		plugins: [
			new CompressionWebpackPlugin({
				filename: '[path].gz[query]', // 提示compression-webpack-plugin@3.0.0的话asset改为filename
				algorithm: 'gzip',
				test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
				threshold: 10240,
				minRatio: 0.8
			})
		]
	},
	assetsDir: 'assets',
	integrity: false,
	// 基本路径
	publicPath: process.env.NODE_ENV === 'production' ?
		'/' : '/',
	devServer: {
		"port": 8080,
		"disableHostCheck": true,
		proxy: {
			"/api": {
				// target: "http://106.13.201.127:8082/bmcp-web",
				target: "https://jjaq.quweiquwei.com/api/",
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/api": ''
				}
			},
			"/test":{
				target: "http://106.13.201.127:8083/bmcp-web/",
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/test": ''
				}
			}
		}
	}
}
