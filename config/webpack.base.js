const config = require('./project.config');
const webpack = require('webpack');

// -------------------------------------
// Style loaders
// -------------------------------------
const CSS_LOADER = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        importLoaders: 1
    }
};

// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use a plugin to extract that CSS to a file, but
// in development "style" loader enables hot editing of CSS.
const POSTCSS_LOADER = {
    // Necessary for external CSS imports to work
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        plugins: () => [
            require('cssnano')({
                autoprefixer: {
                    add: true,
                    remove: true,
                },
                discardComments: {
                    removeAll: true
                },
                discardUnused: false,
                mergeIdents: false,
                reduceIdents: false,
                safe: true,
                sourcemap: true
            })
        ]
    }
};

const SASS_LOADER = {
    loader: 'sass-loader',
    options: {
        sourceMap: true,
        sassOptions: {
            includePaths: [
                config.paths.src('styles')
            ]
        }
    }
};

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: [
            'node_modules',
            config.paths.base()
        ]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                // "file" loader makes sure those assets get served by WebpackDevServer.
                // When you `import` an asset, you get its (virtual) filename.
                // In production, they would get copied to the `build` folder.
                // This loader doesn't use a "test" so it will catch all modules
                // that fall through the other loaders.
                loader: 'file-loader'
            },
            {
                test: /\.woff(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            },
            {
                test: /\.woff2(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        limit: 10000,
                        mimetype: 'application/font-woff2'
                    }
                }
            },
            {
                test: /\.otf(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            },
            {
                test: /\.ttf(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        limit: 10000,
                        mimetype: 'application/octet-stream'
                    }
                }
            },
            {
                test: /\.eot(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    CSS_LOADER,
                    POSTCSS_LOADER,
                    'resolve-url-loader',
                    SASS_LOADER
                ]
            },
            {
                // plain css for third-party libraries or for globally overriding existing classes
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
