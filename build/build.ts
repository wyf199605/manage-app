import * as webpack from "webpack";
import * as webpackMerge from "webpack-merge";
import {webpackConfig} from "./webpack.common";
import {webpackConfigProduction} from "./webpack.production";

webpack(webpackConfigProduction).run((err, status) => {
    if(err || status.hasErrors()){
        console.log(err);
    }

    console.log(status.toString({
        chunks: false,
        colors: true
    }))

});
