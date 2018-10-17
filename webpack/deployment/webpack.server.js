const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.prod.base');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
    // Inform webpack that we're building a bundle
    // for nodeJS, rather than for the browser
    target: 'node',

    // Tell webpack the root file of our
    // server application
    // entry: './server/server.js',
    entry: {
        'index': './server/viewsRenders/index.js',
    },
    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/server/viewsRenders'),
        library: 'rootRenderer',
        // libraryExport:'myExportedLib',
        libraryTarget:'commonjs'
    },
//tells webpack to not bundle any libraries into our output bundles on the server,
//if it exist inside the node modules folder. this is done to make the process of building the server webpack faster
    externals:[    webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);

