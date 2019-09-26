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
  });

  router.get('/editor', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/editor', ctx.query);
  });


  router.all('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
  });
  server.use(async (ctx, nextF) => {
    ctx.res.statusCode = 200;
    await nextF();
  });
  server.use(bodyParser());
  server.use(logger());
  server.use(session(server));
  server.use(apiRouter.routes());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`,
    );
  });
});
