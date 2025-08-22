import axios from 'axios';


export const instance = axios.create({
  // baseURL: , //env파일의 export된 baseUrl 가져와서 넣기
})