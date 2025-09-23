import axios from 'axios';

export const instance = axios.create({
  // baseURL: , //env파일의 export된 baseUrl 가져와서 넣기
});

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});
