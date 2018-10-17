const merge = require('webpack-merge');
const baseConfig = require('./webpack.prod.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const config = {
    entry: {
        'index': './src/index/client.js',
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist/public/scripts')
    }, plugins: [
        new UglifyJSPlugin()
    ],
    externals: {
        lodash: '_',
        jquery: '$',
        Wix: 'Wix'
    }
};

module.exports = merge(baseConfig, config);
