import * as Koa from "koa";
import * as koaWebpack from "koa-webpack";
import * as webpack from "webpack";
import * as open from "open";
import {webpackConfigDevelopment} from "./webpack.development";
import * as path from "path";

const bootstrap = async (): Promise<Koa> => {

    const app = new Koa();

    const compiler = webpack(webpackConfigDevelopment);

    let middleware = await koaWebpack({
        compiler: compiler,
        hotClient: {
            reload: true
        }
    });

    app.use(middleware);

    app.use(async (ctx) => {
        const filename = path.resolve(webpackConfigDevelopment.output.path, 'index.html');
        ctx.response.type = 'html';
        ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
    });

    return app;
};

bootstrap().then(app => {
    app.listen(3000, () => {
        console.log('成功监听在 3000');

        open('http://localhost:3000');
    });
    app.on('error', err => {
        err && console.log(err)
    });
}).catch(e => {
    console.log(e);
});


