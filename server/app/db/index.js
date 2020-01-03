/* eslint-disable no-console */
const mongoose = require('mongoose');

/**
 * mongoose连接数据库 0.0.0.0
 * @type {[type]}
 */
mongoose.Promise = Promise;
const url = 'mongodb://xingzhou:123456@0.0.0.0:27017/nextblog';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => {
  console.log(`数据库连接失败：${error}`);
});

db.on('open', () => {
  console.log('数据库连接成功');
});
