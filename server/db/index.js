/* eslint-disable no-console */
// const fs = require('fs');
// const path = require('path');
const mongoose = require('mongoose');

/**
 * mongoose连接数据库
 * @type {[type]}
 */
const db = mongoose.connect('mongodb://localhost/test');
db.connection.on('error', (error) => {
  console.log(`数据库连接失败：${error}`);
});

db.connection.on('open', () => {
  console.log('数据库连接成功');
});
