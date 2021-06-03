import webpack from 'webpack';
import path from 'path';
import BlogConfig from './blog.config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const injectScripts = require('webpack-dev-server-inject-scripts');

const srcPath = path.join(__dirname, '/ts');
const distPath = path.join(__dirname, '/dist');

type Mode = 'production' | 'development' | 'none';
export default (_: unknown, { mode }: { mode: Mode }): webpack.Configuration => {
    const inProduction = mode == 'production';
    
    return {
        mode,
        entry: {
            'main': path.join(srcPath, '/main.ts'),
        },
        output: {
            path: distPath,
            publicPath: process.env.PUBLIC_PATH ?? distPath,
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.p?css$/,
                    use: [
                        (inProduction
                            ? {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    publicPath: distPath,
                                },
                            }
                            : 'style-loader'
                        ),
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            },
                        },
                        'postcss-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                'blog-config': path.join(__dirname, 'blog.config.ts'),
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
        devServer: {
            contentBase: __dirname,
            compress: true,
            hot: true,
            port: 8080,
            open: true,
            inline: true,
            proxy: {
                '!/docs/**/*': {
                    target: BlogConfig.origin,
                    changeOrigin: true,
                    autoRewrite: true,
                },
            },
            before(app, server, compiler) {
                app.use(injectScripts(compiler));
            },
        }
    };
};
