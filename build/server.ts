import * as Koa from "koa";
import * as koaWebpack from "koa-webpack";
import * as webpack from "webpack";
import {webpackConfigDevelopment} from "./webpack.development";
import * as path from "path";

const bootstrap = async (): Promise<Koa> => {

    const app = new Koa();

    const compiler = webpack(webpackConfigDevelopment);

    let middleware = await koaWebpack({
        compiler: compiler,
        hotClient: {
            reload: true
        },
        devMiddleware: {
            publicPath: '/',
            stats: {
                colors: true
            }
        }
    });

    app.use(middleware);

    // app.use(async (ctx) => {
    //     const filename = path.resolve(webpackConfigDev.output.path, 'index.html');
    //     ctx.response.type = 'html';
    //     ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
    // });

    return app;
};

bootstrap().then(app => {
    app.listen(3001, () => {
        console.log('成功监听在 3001');
    });
    app.on('error', err => {
        err && console.log(err)
    });
}).catch(e => {
    console.log(e);
});


