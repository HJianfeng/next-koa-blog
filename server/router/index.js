const Router = require('koa-router');
const Home = require('../app/controllers/home');
const Posts = require('../app/controllers/posts');

module.exports = () => {
  const router = new Router({
    prefix: '/api'
  });

  // 文章列表
  router.get('/article/list', Home.article);
  // 新增文章
  router.post('/article', Home.changeArticle);
  // 修改文章
  router.put('/article', Home.changeArticle);
  // 删除文章
  router.delete('/article/:id', Home.deleteArticle);

  router.get('/article/one', Posts.articleOne);
  return router;
};
