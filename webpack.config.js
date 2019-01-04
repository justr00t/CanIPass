const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {rating: path.join(__dirname, 'src', 'controllers','generate-rating-page.js'),
    home: path.join(__dirname, 'src', 'controllers','generate-homepage.js'),
    feedback: path.join(__dirname, 'src', 'controllers','generate-feedback.js')} ,
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: '[name]-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['react', 'es2016']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: false
  }
};