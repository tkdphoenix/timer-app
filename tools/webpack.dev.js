const polyfill = require('@babel/polyfill')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../package.json')

const BUILD_DATE = new Date().toUTCString()
const FILE_INDEX = 'index.html'
const PATH_OUTPUT = path.resolve(__dirname, config.directories.output)
const PAGE_TITLE = 'Project Timer'

module.exports = {
	mode: 'development',
	entry: 
		// main: `./${config.directories.source}/${config.main}.js`,
	[
		`core-js/stable`, 
		`regenerator-runtime/runtime`,
		`./src/app.js`,
	],
	output: {
		filename: '[name].[hash].js',
		path: PATH_OUTPUT,
	},
	devtool: 'source-map',
	module: {
		rules: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: { babelrc: true, cacheDirectory: true },
			},
		}],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			built: BUILD_DATE,
			charset: config.charset,
			template: FILE_INDEX,
			title: PAGE_TITLE,
			version: config.version,
		}),
	],
	optimization: {
		minimize: false,
	},
	target: 'web',
}
