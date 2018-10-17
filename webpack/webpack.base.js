const path = require('path');
module.exports = {
    // Tell webpack to run babel on every file it runs through
    node: {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'react',
                        'stage-0',
                        'es2015',
                        ['env', {targets: {browsers: ['last 2 versions']}}]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]"
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            ['_root']: path.resolve(path.join(__dirname, '/')),
            '_src': path.resolve(__dirname, '../src/'),
            '_assets': path.resolve(__dirname, '../src/assets/'),
            '_index-components': path.resolve(__dirname, '../src/index/components/'),
            'draft-js': path.resolve(__dirname, '..', 'node_modules', '@wix', 'draft-js')
        }
    }
};
