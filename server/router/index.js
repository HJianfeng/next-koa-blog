const Router = require('koa-router');
const Home = require('../app/controllers/home');
const Posts = require('../app/controllers/posts');
const Recommend = require('../app/controllers/recommend');
const User = require('../app/controllers/user');

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
  // 文章详情
  router.get('/article/one', Posts.articleOne);
  // 推荐文章
  router.get('/recommend', Recommend.recommend);
  // 登录注册
  router.post('/login', User.login);
  router.post('/register', User.register);

  return router;
};
