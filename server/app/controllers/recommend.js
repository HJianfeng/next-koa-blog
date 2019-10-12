/* eslint-disable require-atomic-updates */

import Article from '../models/article';

exports.recommend = async (ctx) => {
  const params = ctx.query;
  const findParams = {};
  const limitNum = Number(params.pageSize || 10);
  if (params.postId) {
    const { category } = await Article.findById(params.postId);
    findParams.category = category;
  }
  const articleList = await Article.find(findParams)
    .limit(limitNum)
    .sort({ createTime: -1 });
  ctx.body = {
    code: 200,
    data: articleList,
    msg: '请求成功'
  };
};
