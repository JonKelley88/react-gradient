const path = require('path');
const webpack = require('webpack');

module.exports = function pack({ dev, entry }) {
	return {
		entry,
		mode: dev ? 'development' : 'production',
		devtool: 'source-map',
		watch: dev,
		output: {
			path: path.resolve(process.cwd(), 'public'),
			filename({ chunk }) {
				const { name } = chunk;
				return `${name}.js`.replace('js/', '');
			},
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.(html)$/,
					use: {
						loader: 'html-loader',
						options: {
							attrs: [':data-src']
						}
					}
				}
			]
		},
		plugins: [
			new webpack.EnvironmentPlugin({
				...process.env,
				NODE_ENV: dev ? 'development' : 'production',
			})
		],
		resolve: {
			extensions: [
				'.js',
				'.jsx'
			] 
		}
	};
};