const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config(); // Load .env file

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
        vendor: ['react', 'react-dom'],
        style: './src/styles/Sentry.css',
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                generator: {
                    filename: 'images/[name][ext][query]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicons/favicon-48.png',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './public/robots.txt', to: './' },
                { from: './public/manifest.webmanifest', to: './' },
                { from: './public/favicons/favicon-48.png', to: './' },
                { from: './public/favicons/mstile-150.png', to: './' },
                { from: './public/favicons/apple-touch-icon.png', to: './' },
                { from: './public/dataflow.png', to: './' },
                { from: './public/index.css', to: './' },
                { from: './public/_redirects', to: './' },
            ],
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.REACT_APP_FIREBASE_API_KEY': JSON.stringify(process.env.REACT_APP_FIREBASE_API_KEY),
            'process.env.REACT_APP_AUTH_DOMAIN': JSON.stringify(process.env.REACT_APP_AUTH_DOMAIN),
            'process.env.REACT_APP_APP_ID': JSON.stringify(process.env.REACT_APP_APP_ID),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};