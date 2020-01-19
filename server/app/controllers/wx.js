/* eslint-disable no-async-promise-executor */
/* eslint-disable no-use-before-define */
/* eslint-disable require-atomic-updates */
import axios from 'axios';
import wx from '../models/wx';
/**
 * wx
 * @param {[type]}   ctx      [description]
 * @param {Function} next     [description]
 */

exports.getToken = async (ctx) => {
  const nowTime = Math.ceil((new Date().getTime()) / 1000);
  const appid = 'wxcad4807e9aa29dc1';
  const secret = '8e1a97775908bd1cc428b313e673cafc';
  const wxdata = await wx.find({ name: 'wx_token' });
  let token = '';
  if (wxdata && wxdata.expiresTime - nowTime > 0) {
    const { accessToken } = wxdata;
    token = accessToken;
  } else {
    const result = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`);
    const resultData = result.data;
    if (resultData.access_token) {
      const data = {
        name: 'wx_token',
        accessToken: resultData.access_token,
        expiresTime: nowTime + resultData.expires_in
      };
      if (wxdata && wxdata.accessToken) {
        await wx.update({ name: 'wx_token' }, data).exec();
      } else {
        await wx.create(data);
      }
      token = data.accessToken;
    }
  }
  const jsTicket = await getTicke(token);

  ctx.body = {
    code: 200,
    data: jsTicket
  };
};

const getTicke = (token) => {
  return new Promise((async (resolve) => {
    const nowTime = Math.ceil((new Date().getTime()) / 1000);
    const wxdata = await wx.findOne({ name: 'js_ticket' });
    let jsTicket = '';
    if (wxdata && wxdata.expiresTime - nowTime > 0) {
      const { accessToken } = wxdata;
      jsTicket = accessToken;
    } else {
      const result = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`);
      const resultData = result.data;
      if (resultData.ticket) {
        const data = {
          name: 'js_ticket',
          accessToken: resultData.ticket,
          expiresTime: nowTime + resultData.expires_in
        };
        if (wxdata && wxdata.accessToken) {
          await wx.update({ name: 'js_ticket' }, data).exec();
        } else {
          await wx.create(data);
        }
        jsTicket = data.accessToken;
      }
    }
    resolve(jsTicket);
  }));
};

// const createToken = (ticket) => {
//   const params = {
//     noncestr: 'xingzhou',
//     jsapi_ticket: ticket

//   };
// };

exports.getUserInfo = async (ctx) => {
  const params = ctx.query;
  const { data } = await axios.post('https://applet.nanrenbang.cn/api/wechat/sign', params);
  const returnData = {
    ...params
  };
  if (data) {
    returnData.jsapi_ticket = data.data;
  }
  ctx.body = {
    code: 200,
    data: returnData
  };
};
