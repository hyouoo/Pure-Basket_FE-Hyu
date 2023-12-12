import axios from 'axios';
import { getCookie } from './cookies';

//axios 인스턴스를 만들어서 가공할 것
export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  //request 보내기 전 수행
  function (config) {
    console.log('인터셉터 request 요청 성공');
    config.headers['Authorization'] = getCookie('Authorization');
    console.log(config);
    return config;
  },

  //request 오류 요청을 보내기 전 수행
  function (error) {
    console.log('인터셉터 request 오류');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  //응답을 내보내기 전 수행되는 함수
  function (config) {
    console.log('인터셉터 response 요청 성공');
    return config;
  },

  //오류 응답을 내보내기 전 수행되는 함수
  function (error) {
    console.log('인터셉터 response 오류');
    return Promise.reject(error);
  },
);