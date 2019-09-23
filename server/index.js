/* eslint-disable no-console */
import next from 'next';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

const Router = require('koa-router');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
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
