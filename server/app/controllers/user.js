/* eslint-disable require-atomic-updates */
import bcrypt from 'bcrypt-nodejs';
import UserLogin from '../models/user';

const jsonwebtoken = require('jsonwebtoken');
/**
 * 登录
 * @param {String}  userName      [description]
 * @param {String}  password     [description]
 */

exports.login = async (ctx) => {
  const { userName, password } = ctx.request.body;
  const userInfo = await UserLogin.findOne({ userName });
  const compare = await bcrypt.compareSync(password, userInfo.password);
  if (compare) {
    const token = jsonwebtoken.sign({
      data: userInfo.userName,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, 'secret');
    ctx.set('x-token', token);
    const returnData = {
      id: userInfo._id,
      userName: userInfo.userName,
      nick: userInfo.nick
    };
    ctx.body = {
      code: 200,
      msg: '登录成功！',
      data: returnData
    };
  } else {
    ctx.body = {
      code: 500,
      msg: '登录失败！'
    };
  }
};

/**
 * 注册
 * @param {String}  userName      [description]
 * @param {String}  password     [description]
 */
exports.register = async (ctx) => {
  const { userName, password, nick } = ctx.request.body;
  const userinfo = await UserLogin.findOne({ userName });
  if (!userName || userName === '' || !password || password.length < 6 || nick === '') {
    ctx.body = {
      code: 500,
      msg: '请输入正确的账号、密码、昵称'
    };
    return;
  }
  if (userinfo && userinfo.userName === userName) {
    ctx.body = {
      code: 500,
      msg: '该用户已存在'
    };
  } else {
    const data = {
      nick,
      userName
    };
    data.password = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const res = await UserLogin.create(data);
    if (res) {
      ctx.body = {
        code: 200,
        msg: '注册成功！'
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败！'
      };
    }
  }
};
