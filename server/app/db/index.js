/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
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

/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const modelsPath = path.join(__dirname, '/app/models');
/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
const walk = (modelPath) => {
  fs
    .readdirSync(modelPath)
    .forEach((file) => {
      const filePath = path.join(modelPath, `/${file}`);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath);
        }
      } else if (stat.isDirectory()) {
        walk(filePath);
      }
    });
};
walk(modelsPath);
