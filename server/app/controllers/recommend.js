
import Article from '../models/article';

exports.recommend = async (ctx) => {
  // const params = ctx.query;
  const articleList = await Article.find().sort({ createTime: -1 });
  ctx.body = {
    code: 200,
    data: articleList,
    msg: '请求成功'
  };
};
