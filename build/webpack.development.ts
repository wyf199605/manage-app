import webpackMerge = require("webpack-merge");
import {webpackConfig} from "./webpack.common";
import * as OpenBrowserWebpackPlugin from "open-browser-webpack-plugin";
import {Configuration} from "webpack";

export const webpackConfigDevelopment: Configuration = webpackMerge(webpackConfig, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        // 自动打开浏览器
        new OpenBrowserWebpackPlugin({
            url: 'http://localhost:3001'
        })
    ]
});

