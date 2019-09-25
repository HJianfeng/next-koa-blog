/* eslint-disable func-names */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const kittenSchema = new Schema({
  name: { type: String, required: true },
  updateTime: { type: Number },
  createTime: { type: Number }
});

// Defines a pre hook for the document.
kittenSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = Date.now();
  } else {
    this.updateTime = Date.now();
  }
  next();
});

/**
 * Kitten Model
 * 用户信息
 */
const Kitten = mongoose.model('Kitten', kittenSchema);

export default Kitten;
