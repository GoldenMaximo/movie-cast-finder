const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    optimization: {
        // For testing purposes.
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
            // When I bundle the bootstrap native js together with my main.js, I get a "Carousel is not defined" error
            // Having the file separate and instantiated alongside my main.js, the Carousel doesn't work, it is a function
            // that is recognized in the console, however it doesn't apply any change to the DOM
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
