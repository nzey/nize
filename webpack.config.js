const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const cssOutputPath = isProduction ? '/styles/app.[hash].css' : '/styles/app.css';
const jsOutputPath = isProduction ? '/scripts/app.[hash].js' : '/scripts/app.js';
const ExtractSASS = new ExtractTextPlugin(cssOutputPath);
const port = isProduction ? process.env.PORT || 8080 : process.env.PORT || 3000;

// ------------------------------------------
// Base
// ------------------------------------------
const webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, './src/index.html'),
    }),
  ],
  module: {
    loaders: [{
      test: /.jsx?$/,
      include: Path.join(__dirname, './src/app'),
      loader: 'babel',
    }],
  },
};

// ------------------------------------------
// Entry points
// ------------------------------------------
webpackConfig.entry = !isProduction
  ? ['babel-polyfill',
     `webpack-dev-server/client?http://localhost:${port}`,
     'webpack/hot/dev-server',
     Path.join(__dirname, './src/app/index')]
  : ['babel-polyfill',
      Path.join(__dirname, './src/app/index')];

// ------------------------------------------
// Bundle output
// ------------------------------------------
webpackConfig.output = {
  path: Path.join(__dirname, './dist'),
  filename: jsOutputPath,
};

// ------------------------------------------
// Devtool
// ------------------------------------------
webpackConfig.devtool = isProduction ? 'source-map' : 'cheap-eval-source-map';

// ------------------------------------------
// Module
// ------------------------------------------
isProduction
  ? webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractSASS.extract(['css', 'sass']),
  })
  : webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass'],
  });

// ------------------------------------------
// Plugins
// ------------------------------------------
isProduction
  ? webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      ExtractSASS
    )
  : webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

// ------------------------------------------
// Development server
// ------------------------------------------
if (!isProduction) {
  webpackConfig.devServer = {
    contentBase: Path.join(__dirname, './'),
    hot: true,
    port,
    inline: true,
    progress: true,
    historyApiFallback: true,
  };
}

module.exports = webpackConfig;
