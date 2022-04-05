const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    const isDev = !isProd;

    return {
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: ['core-js/stable', 'regenerator-runtime/runtime', './index.ts'],
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].bungle.js',
            clean: true,
        },

        devtool: isDev ? 'source-map' : false,
        devServer: {
            port: 3000,
            open: true,
            hot: true,
            watchFiles: './',
        },

        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src', 'core'),
            },
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
            }),
            new CopyWebpackPlugin({
                from: path.resolve(__dirname, 'src', 'favicon.ico'),
                to: path.resolve(__dirname, 'dist'),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].bungle.css',
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'ts-loader'],
                },
            ],
        },
    };
};
