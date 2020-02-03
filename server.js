// server/index.js

const NextKoa = require('next-koa')
const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')

const app = new Koa()
const router = new Router()
const nextApp = NextKoa({
  dev: process.env.NODE_ENV !== 'production'
})

// console nextConfig
console.log(nextApp.nextConfig);
console.log(nextApp);

app.use(nextApp.middleware);

// using renderer of next.js to emit pages/about.tsx
// the state can be captured by next-koa/getstate package
// and is rendered as ctx.state merged by this data
// here data usually is a plain object
router.get('/', async (ctx, next) => {
    await ctx.render('about')//nextApp.handle(ctx.req, ctx.res);
});


app.use(router.routes());
// if nextConfig.useFileSystemPublicRoutes is missing or true
// then you can get any page under `pages` by directly fetching
// the pathname without defining the koa routes

app.listen(3000)
console.log('Now listening...');