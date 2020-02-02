const koa = require('koa');
const session = require('koa-session');
const next = require('next');
const router = require('@koa/router')();

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, preserveLog: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    let server = new koa();
    const debug = require('debug')(server)
    server.use(session(server));

    router.get('/', async (ctx, next) => {
        console.log("Generate dashboard...");
        await handle(ctx.req, ctx.res);
    });
    
    server.use(router.routes());

    server.listen(3000, () => {
        console.log('Now listening...');
    })
});

//const handle = app.getRequestHandler();
/*
router.get('/', async (ctx, next) => {
    await next();
    ctx.respond = false;
    ctx.res.statusCode = 200;

    console.log("Hello World");
    return "Hello World"
});
*/