import axios from '@/utils/axios';

export function getArticeList(params) {
  return axios({
    url: '/api/article/list',
    method: 'get',
    params
  });
}

export function createArticeList(data) {
  return axios({
    url: '/api/article',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  });
}
