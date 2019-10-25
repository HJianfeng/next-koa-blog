import axios from '@/utils/axios';


export function login(data) {
  return axios({
    url: '/api/login',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  });
}

export function getMyUser() {
  return axios({
    url: '/api/my/user',
    method: 'get'
    // headers: { xtoken }
  });
}

export function getUserInfo(params) {
  return axios({
    url: '/api/user',
    method: 'get',
    params
  });
}
