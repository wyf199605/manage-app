import webpackMerge = require("webpack-merge");
import {webpackConfig} from "./webpack.common";
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
            },
            {
                test: /\.css/,
                loader: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
});

