/* eslint-disable require-atomic-updates */
import Article from '../models/article';

/**
 * 文章列表
 * @param {[type]}   ctx      [description]
 * @param {Function} next     [description]
 */

exports.articleOne = async (ctx) => {
  const params = ctx.query;
  if (!params.id || params.id === '') {
    ctx.body = {
      code: 400,
      data: {},
      msg: '请输入ID'
    };
  } else {
    try {
      const article = await Article.findById(params.id);
      ctx.body = {
        code: 200,
        data: article,
        msg: '请求成功'
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        data: error,
        msg: '请输入正确的ID'
      };
    }
  }
};
