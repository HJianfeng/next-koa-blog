/* eslint-disable no-underscore-dangle */
/* eslint-disable require-atomic-updates */
/* eslint-disable no-use-before-define */
import Article from '../models/article';
import { getPageNum, Auth } from '../utils';
import { unzip } from '../../../utils/index';

/**
 * 文章列表
 * @param {[type]}   ctx      [description]
 * @param {Function} next     [description]
 */

exports.article = async (ctx) => {
  const { page, pageSize } = ctx.query;
  const size = Number(pageSize) || 10;
  const currentPage = Number(page) || 1;

  const skipSize = (currentPage - 1) * size;
  const articleList = await Article.find()
    .limit(size)
    .skip(skipSize)
    .sort({ createTime: -1 });
  const total = await Article.count();
  const pageObj = getPageNum(total, size, currentPage);
  ctx.body = {
    ...pageObj,
    code: 200,
    data: articleList,
    msg: '请求成功'
  };
};

/**
 * 创建和修改文章
 * @param {[type]}   ctx      [description]
 * @param {Function} next     [description]
 */
exports.changeArticle = async (ctx) => {
  const {
    title, summary, content, type, category, catalog, id
  } = ctx.request.body;
  try {
    await Auth(ctx);
    if (!title || !content) {
      ctx.body = { code: 500, msg: '缺少参数' };
      return;
    }
    const describe = (summary && summary !== '') ? summary : content.substring(0, 30);
    const data = {
      title,
      content: unzip(content),
      summary: describe,
      category,
      type: type || 1,
      catalog
    };
    if (!id || id === '') {
      const newArticle = await Article.create(data);
      ctx.body = {
        code: 200,
        data: newArticle,
        msg: '请求成功'
      };
    } else {
      Article.update({ _id: id }, data, (err, raw) => {
        if (err) ctx.body = { code: 500, msg: err };
        ctx.body = { code: 200, data: raw, msg: '修改成功' };
      });
      ctx.body = {
        code: 200,
        msg: '修改成功'
      };
    }
  } catch (noAuth) {
    ctx.body = noAuth;
  }
};

exports.deleteArticle = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Auth(ctx);
    const result = await Article.deleteOne({ _id: id });
    if (result) {
      ctx.body = {
        code: 200,
        msg: '删除成功'
      };
    }
  } catch (noAuth) {
    ctx.body = noAuth;
  }
};
