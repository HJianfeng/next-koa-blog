/* eslint-disable no-console */
const mongoose = require('mongoose');

/**
 * mongoose连接数据库
 * @type {[type]}
 */
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/nextblog', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => {
  console.log(`数据库连接失败：${error}`);
});

db.on('open', () => {
  console.log('数据库连接成功');
});
