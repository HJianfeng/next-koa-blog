
const jsonwebtoken = require('jsonwebtoken');

const secretOrPublicKey = 'secret';

export const getPageNum = (total = 0, pageSize = 10, currentPage = 1) => {
  const page = Math.ceil(Number(total) / Number(pageSize)) || 1;
  return {
    total,
    pageSize,
    page,
    current: currentPage
  };
};

export const Auth = (ctx) => {
  return new Promise((resolve, reject) => {
    const cookieToken = ctx.cookies.get('xtoken');
    const headersToken = ctx.headers.xtoken;
    const token = headersToken || cookieToken;
    const noAuth = { code: 401, msg: '还未登录' };
    if (!token || token === '') {
      reject(noAuth);
    } else {
      jsonwebtoken.verify(token, secretOrPublicKey, (err, verifyInfo) => {
        if (!err && verifyInfo && verifyInfo.data) {
          resolve(verifyInfo);
        } else {
          const errObj = { code: 401, data: err, msg: '还未登录' };
          reject(errObj);
        }
      });
    }
  });
};
