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
    .sort({ viewNum: -1 });
  // 不足数量通过浏览量补足
  let supplement = [];
  const norArr = [];
  articleList.forEach((item) => {
    norArr.push({ title: item.title });
  });
  if (articleList.length < limitNum) {
    supplement = await Article.find({
      $nor: norArr
    })
      .limit(limitNum - articleList.length)
      .sort({ viewNum: -1 });
  }
  const returnArticle = articleList.concat(supplement);
  ctx.body = {
    code: 200,
    data: returnArticle,
    msg: '请求成功'
  };
};
