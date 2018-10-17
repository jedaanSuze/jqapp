const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  // entry: './server/server.js',
  entry: './server/server.js',
  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'server/bundle-server.js',
    path: path.resolve(__dirname, 'build')
  },
 resolve: {
    alias: {
      public$: path.resolve(__dirname, 'build/public')
    }
  },
//tells webpack to not bundle any libraries into our output bundles on the server,
//if it exist inside the node modules folder. this is done to make the process of building the server webpack faster
  externals:[    webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);

