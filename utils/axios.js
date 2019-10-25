import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
import { setCookie } from './index';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  transformRequest: [data => qs.stringify(data)] // 参数转换
});
const isServer = typeof window === 'undefined';
// 拦截器
instance.interceptors.response.use((response) => {
  const res = response.data;
  const { headers } = response;
  if (!isServer && headers) {
    if (headers['x-token'] && headers['x-token'] !== '') {
      setCookie('xtoken', headers['x-token'] || '');
    }
  }
  if (!isServer && (response.status !== 200)) {
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
