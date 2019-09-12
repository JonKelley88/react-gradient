const path = require('path');
const webpack = require('webpack');

const dev = true;

module.exports = {
  entry: {
    'js/react-gradient': './src/index.js',
  },
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'inline-source-map' : 'source-map',
  watch: dev,
  output: {
    path: path.resolve(process.cwd(), 'dist'),
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
        loader: 'babel-loader'
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