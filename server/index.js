/* eslint-disable no-console */
import next from 'next';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import './app/db';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const logger = require('koa-logger');
const session = require('koa-session');
// 路由
const Router = require('koa-router');

const router = new Router();
// 接口路由
const apiRouter = require('./router')();

app.prepare().then(() => {
  const server = new Koa();
  server.use(apiRouter.routes()).use(apiRouter.allowedMethods());
  server.use(logger());
  server.use(session(server));
  server.use(bodyParser());

  router.get('/', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/index', ctx.query);
  });

  router.all('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
  });
  server.use(async (ctx, nextF) => {
    ctx.res.statusCode = 200;
    await nextF();
  });
  server.use(router.routes());
  server.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`,
    );
  });
});
