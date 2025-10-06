import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import {
  getAdminId,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  getAdminAccessToken,
  getAdminRefreshToken,
  setAdminAccessToken,
  setAdminRefreshToken,
  removeAdminAccessToken,
  removeAdminRefreshToken,
} from '../hooks/cookies';
import { Cookies } from 'react-cookie';

export const AdmissionUserInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

export const AdmissionAdminInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

// export const TestInstance = axios.create({
//   baseURL: "https://t1.ncloud.sbs" ,
//   timeout: 50000,
//   headers: { 'Content-Type': 'application/json' },
// });

const cookies = new Cookies();

const skipAuthUrls = [
  'POST /admin/auth',
  'POST /user/auth',
  'POST /user',
  'POST /user/verify/popup',
  'GET /user/verify/info',
];

let isUserRefreshingToken = false;
let isAdminRefreshingToken = false;
let userRefreshTokenPromise: Promise<string> | null = null;
let adminRefreshTokenPromise: Promise<string> | null = null;

const userRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();

  const endpoint = `${method} ${url}`;
  if (skipAuthUrls.includes(endpoint)) {
    return config;
  }

  const token = getAccessToken() || cookies.get('accessToken');
  console.log('[UserRequestInterceptor] Token found:', !!token, 'for URL:', config.baseURL + url);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    console.log('[UserRequestInterceptor] Authorization header set');
  } else {
    console.warn('[UserRequestInterceptor] No token available');
  }

  return config;
};

const adminRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();

  const endpoint = `${method} ${url}`;
  if (skipAuthUrls.includes(endpoint)) {
    return config;
  }

  const token = getAdminAccessToken() || cookies.get('adminAccessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

// TestInstance.interceptors.request.use(userRequestInterceptor);
AdmissionUserInstance.interceptors.request.use(userRequestInterceptor);
AdmissionAdminInstance.interceptors.request.use(adminRequestInterceptor);

const userResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config) return Promise.reject(error);

  const retryConfig = config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  // 인증 에러가 아니면 그대로 reject
  if (response?.status !== 401 && response?.status !== 403) {
    return Promise.reject(error);
  }

  // 이미 재시도한 요청이면 reject
  if (retryConfig._retry) {
    return Promise.reject(error);
  }

  retryConfig._retry = true;

  // 이미 리프레시 중이면 해당 Promise를 기다림
  if (isUserRefreshingToken && userRefreshTokenPromise) {
    try {
      const newAccessToken = await userRefreshTokenPromise;
      retryConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return await AdmissionUserInstance(retryConfig);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // 첫 번째 리프레시 시도
  isUserRefreshingToken = true;
  userRefreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const userRefreshToken = getRefreshToken() || cookies.get('refreshToken');
      if (!userRefreshToken) {
        throw new Error('No refresh token');
      }

      const refreshResponse = await AdmissionUserInstance.put(
        '/user/auth',
        {},
        { headers: { 'X-Refresh-Token': userRefreshToken } }
      );

      if (refreshResponse.status !== 200) {
        throw new Error(`Refresh failed with status: ${refreshResponse.status}`);
      }

      const { data } = refreshResponse;
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      isUserRefreshingToken = false;
      userRefreshTokenPromise = null;
      resolve(data.accessToken);
    } catch (err) {
      isUserRefreshingToken = false;
      userRefreshTokenPromise = null;
      removeAccessToken();
      removeRefreshToken();
      window.location.href = 'https://www.entrydsm.hs.kr/';
      reject(err);
    }
  });

  try {
    const newAccessToken = await userRefreshTokenPromise;
    retryConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return await AdmissionUserInstance(retryConfig);
  } catch (err) {
    return Promise.reject(err);
  }
};

const adminResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config) return Promise.reject(error);

  const retryConfig = config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  // 인증 에러가 아니면 그대로 reject
  if (response?.status !== 401 && response?.status !== 403) {
    return Promise.reject(error);
  }

  // 이미 재시도한 요청이면 reject
  if (retryConfig._retry) {
    return Promise.reject(error);
  }

  retryConfig._retry = true;

  // 이미 리프레시 중이면 해당 Promise를 기다림
  if (isAdminRefreshingToken && adminRefreshTokenPromise) {
    try {
      const newAccessToken = await adminRefreshTokenPromise;
      retryConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return await AdmissionAdminInstance(retryConfig);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // 첫 번째 리프레시 시도
  console.log(`[AdminResponseInterceptor] ${response.status} detected, trying refresh token`);
  isAdminRefreshingToken = true;
  adminRefreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const adminRefreshToken = getAdminRefreshToken() || cookies.get('adminRefreshToken');
      if (!adminRefreshToken) {
        console.warn('[AdminResponseInterceptor] No refresh token found');
        throw new Error('No refresh token');
      }

      console.log('[AdminResponseInterceptor] Admin token refresh started');
      const refreshResponse = await AdmissionAdminInstance.put(
        '/admin/auth',
        {},
        {
          headers: {
            'X-Refresh-Token': adminRefreshToken,
            'Request-User-Id': getAdminId(),
            'Request-User-Role': 'ADMIN',
          },
        }
      );

      if (refreshResponse.status !== 200) {
        throw new Error(`Admin refresh failed with status: ${refreshResponse.status}`);
      }

      const { data } = refreshResponse;
      setAdminAccessToken(data.accessToken);
      setAdminRefreshToken(data.refreshToken);

      isAdminRefreshingToken = false;
      adminRefreshTokenPromise = null;
      resolve(data.accessToken);
    } catch (err) {
      console.error('[AdminResponseInterceptor] Token refresh failed', err);
      isAdminRefreshingToken = false;
      adminRefreshTokenPromise = null;
      removeAdminAccessToken();
      removeAdminRefreshToken();
      window.location.href = 'https://www.entrydsm.hs.kr/';
      reject(err);
    }
  });

  try {
    const newAccessToken = await adminRefreshTokenPromise;
    retryConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return await AdmissionAdminInstance(retryConfig);
  } catch (err) {
    return Promise.reject(err);
  }
};

AdmissionUserInstance.interceptors.response.use(
  (response) => response,
  userResponseInterceptor
);

// TestInstance.interceptors.response.use(
//   (response) => response,
//   userResponseInterceptor
// );

AdmissionAdminInstance.interceptors.response.use(
  (response) => response,
  adminResponseInterceptor
);
