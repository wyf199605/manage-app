import webpackMerge = require("webpack-merge");
import {webpackConfig} from "./webpack.common";
import {Configuration} from "webpack";

export const devConfig: Configuration = webpackMerge(webpackConfig, {
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
    }
});

