import * as path from "path";
import {Configuration} from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as WebpackNotifier from "webpack-notifier";

process['traceDeprecation'] = true; // 开启详细信息

export const webpackConfig: Configuration = {
    entry: {
        main: [path.resolve(__dirname, '../src/index')]
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },
    // 模式
    mode: 'none',
    // 启用source-map
    devtool: 'source-map',
    target: 'web',
    resolve: {
        // 默认文件后缀
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "react-dom": "@hot-loader/react-dom" // 使用@hot-loader/react-dom代替react-dom
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: [
                    {
                        loader: "babel-loader"
                    },
                    // {
                    //     loader: "react-hot-loader/webpack"
                    // },
                    {
                        loader: "awesome-typescript-loader?tsconfig=../tsconfig.json"
                    },
                    {
                        loader: "eslint-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new WebpackNotifier({
            title: 'webpack', // 标题
            excludeWarnings: true, // 排除警告
            alwaysNotify: false // 每次触发通知
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: 'index.html'
        })
    ],
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    minChunks: 1
                }
            }
        }
    }
};
