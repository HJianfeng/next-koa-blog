const Router = require('koa-router');
const Home = require('../app/controllers/home');

module.exports = () => {
  const router = new Router({
    prefix: '/api',
  });

  // DB Interface test
  router.get('/test', Home.test);

  return router;
};
