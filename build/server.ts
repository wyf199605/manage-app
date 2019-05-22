import * as Koa from "koa";
import * as koaWebpack from "koa-webpack";
import * as webpack from "webpack";
import {devConfig} from "./webpack.dev";
import * as path from "path";

const init = async () => {

    const app = new Koa();

    const compiler = webpack(devConfig);

    let middleware = await koaWebpack({
        compiler: compiler
    });

    app.use(middleware);

    app.use(async (ctx) => {
        const filename = path.resolve(devConfig.output.path, 'index.html');
        ctx.response.type = 'html';
        ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
    });

    app.listen(3001, () => {
        console.log('成功监听在 3000');
    });

    app.on('error', err => {
        err && console.log(err)
    })
};

init();


