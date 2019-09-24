
/**
 * 测试
 * @param {[type]}   ctx      [description]
 * @param {Function} next     [description]
 */
exports.test = async (ctx) => {
  const params = ctx;
  ctx.body = {
    success: true,
    data: params,
  };
};
