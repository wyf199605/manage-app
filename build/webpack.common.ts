import * as path from "path";
import {Configuration} from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

export const webpackConfig: Configuration = {
    entry: {
        main: [path.resolve(__dirname, '../src/index')]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    // 模式
    mode: 'none',
    // 启用source-map
    devtool: 'source-map',
    target: 'web',
    resolve: {
        // 默认文件后缀
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                loader: [
                    {
                        loader: "awesome-typescript-loader?tsconfig=../tsconfig.json"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: 'index.html'
        })
    ]
};
