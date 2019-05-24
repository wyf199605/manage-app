import webpackMerge = require("webpack-merge");
import {webpackConfig} from "./webpack.common";
import CleanWebpackPlugin from "clean-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import {Configuration} from "webpack";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import * as path from "path";

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
        // 使用交互式可缩放树形图可视化webpack输出文件的大小
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled", // 模式
            generateStatsFile: true, // 生成state.json文件
            statsOptions: {
                source: true
            },
            statsFilename: path.resolve(__dirname, "../analyzer/stats.json") //生成的json文件路径
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css'
        })
    ]
});

