import mongoose from 'mongoose';

const { Schema } = mongoose;

const userinfoSchema = new Schema({
  userName: String,
  password: String,
  nick: String,
  createTime: Number
}, { versionKey: false });
userinfoSchema.pre('save', (next) => {
  if (this.isNew) {
    this.createTime = Date.now();
  }
  next();
});

const user = mongoose.model('userinfo', userinfoSchema);
export default user;
