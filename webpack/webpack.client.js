const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const clientBaseConfig = require('./webpack.client.base');
const config = {

  entry: {
    'index': './src/index/client.js',
  },
  externals: {
    lodash: '_',
    jquery: '$',
    Wix: 'Wix'
  }
};

module.exports = merge(baseConfig,clientBaseConfig, config);
