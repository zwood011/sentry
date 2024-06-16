const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/* const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
use at the bottom of plugins: new BundleAnalyzerPlugin(), */

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
        path: __dirname + '/dist',
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
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon-48.png',
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
            // Use dynamic import() to import critical package
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
                { from: './public/favicon-48.png', to: './' },
                { from: './public/mstile-150.png', to: './' },
                { from: './public/apple-touch-icon.png', to: './' },
                { from: './public/dataflow.png', to: './' },
                { from: './public/index.css', to: './' },
            ],
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
};
