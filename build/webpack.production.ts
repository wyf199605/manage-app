import webpackMerge = require("webpack-merge");
import {webpackConfig} from "./webpack.common";
import CleanWebpackPlugin from "clean-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import {Configuration} from "webpack";

export const webpackConfigProduction: Configuration = webpackMerge(webpackConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css'
        })
    ]
});

