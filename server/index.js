/* eslint-disable require-atomic-updates */
/* eslint-disable no-console */

import './app/db';

const Koa = require('koa');
const next = require('next');
const session = require('koa-session');
// 路由
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
// 接口路由
const logger = require('koa-logger');
// jwt
const koaJwt = require('koa-jwt');
const apiRouter = require('./router')();

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('/', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/index', ctx.query);
    ctx.respond = false;
  });
  router.get('/login', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/login', ctx.query);
    ctx.respond = false;
  });
  router.get('/post/:id', async (ctx) => {
    const queryParams = Object.assign(ctx.params, ctx.query);
    await app.render(ctx.req, ctx.res, '/post', queryParams);
    ctx.respond = false;
  });

  router.get('/editor', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/editor', ctx.query);
    ctx.respond = false;
  });
  router.get('/vuePage', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/vuePage', ctx.query);
    ctx.respond = false;
  });
  router.get('/labo', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/labo', ctx.query);
    ctx.respond = false;
  });
  router.all('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
  });
  server.use(async (ctx, nextF) => {
    ctx.res.statusCode = 200;
    ctx.set('Access-Control-Allow-Origin', '*');
    /* 当token验证异常时候的处理，如token过期、token错误 */
    await nextF().catch((err) => {
      if (err.status === 401) {
        ctx.body = {
          code: 401,
          msg: err.originalError ? err.originalError.message : err.message
        };
      } else {
        throw err;
      }
    });
  });
  server.use(bodyParser());
  server.use(logger());
  server.use(session(server));
  server.use(koaJwt({ secret: 'secret' }).unless({
    path: [
      /^\/api\/login/,
      /^\/api\/register/,
      /^((?!\/api\/user).)*$/ // 设置除了 /api/user 接口外的其它资源，可以不需要认证访问
    ]
  }));
  server.use(apiRouter.routes());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`,
    );
  });
});
