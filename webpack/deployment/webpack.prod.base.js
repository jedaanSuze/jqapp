const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.base.js');
const webpack = require('webpack');
var StringReplacePlugin = require("string-replace-webpack-plugin");

const config = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: /\/\*startDeleteForDeployment\*\/([\S\s]+?)\/\*endDeleteForDeployment\*\//igm,
                            replacement: function () {
                                return '';
                            }
                        }
                    ]
                })
            }
        ],
    },
    plugins: [
        new StringReplacePlugin()
    ]
};
module.exports = merge(baseConfig, config);
