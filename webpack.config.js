const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    optimization: {
        // We no not want to minimize our code.
        minimize: false,
    },
    entry: {
        main: './src/index.js',
        'bootstrap-native.min': './src/js/bootstrap-native.min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /index\.js$/],
                use: {
                    loader: 'script-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // {
            //     test: /bootstrap\.native/,
            //     use: {
            //         loader: 'bootstrap.native-loader',
            //         options: {
            //             only: ['carousel'],
            //         },
            //     },
            // },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]', // <-- retain original file name
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            favicon: './public/favicon.png',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};
