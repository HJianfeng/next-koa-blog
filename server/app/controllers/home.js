// import kitten from '../models/kitten';

/**
 * 测试
 * @param {[type]}   ctx      [description]
 * @param {Function} next     [description]
 */
exports.test = async (ctx) => {
  // const newUser = await kitten.create({
  //   name: '圆圆'
  // });
  // const newUser = await kitten.findOne({ name: 'fluffy' });
  // const newUser = await kitten.find({ name: 'fluffy' });
  ctx.body = {
    code: 200,
    data: ctx.query,
    msg: '请求成功'
  };
};
