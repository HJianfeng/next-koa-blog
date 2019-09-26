/* eslint-disable require-atomic-updates */
/* eslint-disable no-use-before-define */

import Article from '../models/article';

/**
 * 文章列表
 * @param {[type]}   ctx      [description]
 * @param {Function} next     [description]
 */
exports.article = async (ctx) => {
  // const params = ctx.query;
  const articleList = await Article.find();
  ctx.body = {
    code: 200,
    data: articleList,
    msg: '请求成功'
  };
};

exports.changeArticle = async (ctx) => {
  const {
    title, summary, content, type
  } = ctx.request.body;
  if (!title || !content) {
    ctx.body = { code: 500, msg: '缺少参数' };
    return;
  }
  const describe = (summary && summary !== '') ? summary : content.substring(0, 30);
  const data = {
    title,
    content,
    summary: describe,
    type: type || 1
  };
  const newArticle = await Article.create(data);
  ctx.body = {
    code: 200,
    data: newArticle,
    msg: '请求成功'
  };
};

exports.deleteArticle = async (ctx) => {
  const articleList = await Article.find();
  ctx.body = {
    code: 200,
    data: articleList,
    msg: '请求成功'
  };
};
