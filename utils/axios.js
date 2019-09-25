import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: { },
});
const isServer = typeof window === 'undefined';
// 拦截器
instance.interceptors.response.use((response) => {
  const res = response.data;
  if (!isServer && (response.status !== 200 || res.code !== 200)) {
    message.error(res.msg);
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});
instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
