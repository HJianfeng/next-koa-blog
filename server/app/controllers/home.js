
/**
 * 测试
 * @param {[type]}   ctx      [description]
 * @param {Function} next     [description]
 */
exports.test = async (ctx) => {
  const params = ctx;
  ctx.body = {
    code: 200,
    data: {
      title: '参数',
      params,
    },
    msg: '请求成功',
  };
};
