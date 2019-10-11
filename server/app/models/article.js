/* eslint-disable func-names */
import mongoose from 'mongoose';

const { Schema } = mongoose;
/**
 * 文章列表
 * @param {String}  title      [标题]
 * @param {String}  summary     [描述]
 * @param {String}  type     [1: 原创 2: 翻译 3: 转载]
 * @param {Number}  viewNum     [浏览量]
 */
const { ObjectId } = mongoose.Schema.Types;
const articleListSchema = new Schema({
  id: ObjectId,
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: Number, required: true, default: 1 },
  category: { type: String, default: 'javascript' },
  viewNum: { type: Number, default: 0 },
  updateTime: { type: Number },
  catalog: { type: Array },
  createTime: { type: Number }
}, { versionKey: false });

// Defines a pre hook for the document.
articleListSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = Date.now();
  } else {
    this.updateTime = Date.now();
  }
  next();
});

/**
 * Article Model
 * 首页文章列表
 */
const Article = mongoose.model('Article', articleListSchema);

export default Article;
