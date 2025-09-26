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

export const TestInstance = axios.create({
  baseURL: "https://t1.ncloud.sbs" ,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

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

const userRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  console.log("asd;fkljasd;k")
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

TestInstance.interceptors.request.use(userRequestInterceptor);
AdmissionUserInstance.interceptors.request.use(userRequestInterceptor);
AdmissionAdminInstance.interceptors.request.use(adminRequestInterceptor);

const userResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config) return Promise.reject(error);

  const retryConfig = config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if (response?.status === 403 && isUserRefreshingToken) {
    removeAccessToken();
    removeRefreshToken();
    window.location.href = '/logout';
    return Promise.reject(error);
  }

  if ((response?.status === 401 || response?.status === 403) && !retryConfig._retry) {
    retryConfig._retry = true;
    isUserRefreshingToken = true;

    try {
      const userRefreshToken = getRefreshToken() || cookies.get('refreshToken');
      if (userRefreshToken) {
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

        retryConfig.headers['Authorization'] = `Bearer ${data.accessToken}`;
        isUserRefreshingToken = false;

        try {
          const instanceToUse = config.baseURL?.includes('localhost:3449')
            ? TestInstance
            : AdmissionUserInstance;

          const retryResponse = await instanceToUse(retryConfig);
          return retryResponse;
        } catch (retryError: any) {
          if (retryError.response?.status === 401 || retryError.response?.status === 403) {
            throw retryError;
          }
          throw retryError;
        }
      }

      throw new Error('No refresh token');
    } catch (err) {
      isUserRefreshingToken = false;
      removeAccessToken();
      removeRefreshToken();
      window.location.href = '/logout';
    }
  }

  return Promise.reject(error);
};

const adminResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config) return Promise.reject(error);

  const retryConfig = config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if (response?.status === 403 && isAdminRefreshingToken) {
    removeAdminAccessToken();
    removeAdminRefreshToken();
    window.location.href = '/logout';
    return Promise.reject(error);
  }

  if ((response?.status === 401 || response?.status === 403) && !retryConfig._retry) {
    console.log(`[AdminResponseInterceptor] ${response.status} detected, trying refresh token`);
    retryConfig._retry = true;
    isAdminRefreshingToken = true;

    try {
      const adminRefreshToken = getAdminRefreshToken() || cookies.get('adminRefreshToken');
      if (adminRefreshToken) {
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

        retryConfig.headers['Authorization'] = `Bearer ${data.accessToken}`;
        isAdminRefreshingToken = false;

        try {
          const retryResponse = await AdmissionAdminInstance(retryConfig);
          return retryResponse;
        } catch (retryError: any) {
          if (retryError.response?.status === 401 || retryError.response?.status === 403) {
            console.error('[AdminResponseInterceptor] Still unauthorized after refresh, logging out');
            throw retryError;
          }
          throw retryError;
        }
      }

      console.warn('[AdminResponseInterceptor] No refresh token found');
      throw new Error('No refresh token');
    } catch (err) {
      console.error('[AdminResponseInterceptor] Token refresh failed', err);
      isAdminRefreshingToken = false;
      removeAdminAccessToken();
      removeAdminRefreshToken();
      window.location.href = '/logout';
    }
  }

  return Promise.reject(error);
};

AdmissionUserInstance.interceptors.response.use(
  (response) => response,
  userResponseInterceptor
);

TestInstance.interceptors.response.use(
  (response) => response,
  userResponseInterceptor
);

AdmissionAdminInstance.interceptors.response.use(
  (response) => response,
  adminResponseInterceptor
);
