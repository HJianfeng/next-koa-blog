/* eslint-disable no-underscore-dangle */
/* eslint-disable require-atomic-updates */
/* eslint-disable no-use-before-define */
import Article from '../models/article';
import { getPageNum } from '../utils';
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

exports.changeArticle = async (ctx) => {
  const {
    title, summary, content, type, category, catalog
  } = ctx.request.body;
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
