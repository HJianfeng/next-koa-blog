import mongoose from 'mongoose';

const { Schema } = mongoose;

const wxConfig = new Schema({
  accessToken: String,
  expiresTime: Number,
  name: String
}, { versionKey: false });

const wx = mongoose.model('wxconfig', wxConfig);
export default wx;
