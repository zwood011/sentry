const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
        vendor: ['react', 'react-dom'],
        style: './src/styles/Sentry.css',
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'dist'),
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
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                    },
                },
                extractComments: false,
            }),
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicons/favicon-48.png',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            postProcess: (content) => {
                return import('critical').then((critical) => {
                    return critical
                        .generate({
                            base: 'dist/',
                            html: content,
                            inline: true,
                            width: 1300,
                            height: 900,
                            minify: true,
                        })
                        .then((output) => output);
                });
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './public/robots.txt', to: './' },
                { from: './public/BingSiteAuth.xml', to: './' },
                { from: './public/sitemap_index.xml', to: './' },
                { from: './public/404.html', to: './' },
                { from: './public/manifest.webmanifest', to: './' },
                { from: './public/favicons/favicon-48.png', to: './' },
                { from: './public/favicons/mstile-150.png', to: './' },
                { from: './public/favicons/apple-touch-icon.png', to: './' },
                { from: './public/dataflow.png', to: './' },
                { from: './public/index.css', to: './' },
            ],
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        // new BundleAnalyzerPlugin(), |  uncomment when you need to analyze your bundle
    ],
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    devtool: 'source-map',
};