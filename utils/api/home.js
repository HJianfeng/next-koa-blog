import axios from '@/utils/axios';

export function getArticeList(params) {
  return axios({
    url: '/api/article/list',
    method: 'get',
    params
  });
}

export function getArticeOne(params) {
  return axios({
    url: '/api/article/one',
    method: 'get',
    params
  });
}

export function postArtice(data) {
  return axios({
    url: '/api/article',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  });
}


export function getRecommend(params) {
  return axios({
    url: '/api/recommend',
    method: 'get',
    params
  });
}


export function deleteArticle(id) {
  return axios({
    url: `/api/article/${id}`,
    method: 'delete'
  });
}
