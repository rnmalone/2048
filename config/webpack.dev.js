const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const defaultConfig = require('./webpack.base');
const config = require('./project.config');

const APP_ENTRY = config.paths.src('index.tsx');
const TEMPLATE = config.paths.public('index.html');

console.log('merge', config.paths.public());

module.exports = merge.merge(defaultConfig, {
    // Webpack will default some settings for development mode
    mode: 'development',

    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    // The first two entry points enable "hot" CSS and auto-refreshes for JS.
    entry: [
        '@babel/polyfill',
        APP_ENTRY
    ],
    devtool: 'cheap-module-eval-source-map',

    // Config for webpack-dev-server
    devServer: {
        // Path to unbuilt files
        contentBase: config.paths.src(),
        // Hot-reload changes
        hot: true,
        // Allows react-router to function
        historyApiFallback: true,
        // Where to serve files from
        port: config.server.port,
        host: config.server.host,
        // Omit logging from terminal
        stats: 'errors-only'
    },

    output: {
        // Webpack uses `publicPath` to determine where the app is being served from.
        // In development, we always serve from the root. This makes config easier.
        publicPath: '/',
        // remove /* filename */ comments to generated require()s in the output.
        pathinfo: false
    },

    plugins: [
        // Generates an `index.html` file with the <script> injected.
        // Add the built files as imports into the html template
        new HtmlWebpackPlugin({
            title: config.server.templateLocals.title,
            template: TEMPLATE
        }),
    ]

});
