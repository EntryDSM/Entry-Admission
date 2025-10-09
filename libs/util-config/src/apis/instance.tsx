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
  baseURL: import.meta.env.VITE_BASE_URL,
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
  'GET /notice',
  'GET /schedule',
  'GET /schedule/all'
];

let isUserRefreshingToken = false;
let isAdminRefreshingToken = false;
let userRefreshTokenPromise: Promise<string> | null = null;
let adminRefreshTokenPromise: Promise<string> | null = null;

// Helper function for user token refresh
const handleUserTokenRefresh = () => {
  if (userRefreshTokenPromise) {
    return userRefreshTokenPromise;
  }

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
      resolve(data.accessToken);
    } catch (err) {
      removeAccessToken();
      removeRefreshToken();
      window.location.href = 'https://auth.entrydsm.kr';
      reject(err);
    } finally {
      isUserRefreshingToken = false;
      userRefreshTokenPromise = null;
    }
  });
  return userRefreshTokenPromise;
};

// Helper function for admin token refresh
const handleAdminTokenRefresh = () => {
  if (adminRefreshTokenPromise) {
    return adminRefreshTokenPromise;
  }

  isAdminRefreshingToken = true;
  adminRefreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const adminRefreshToken = getAdminRefreshToken() || cookies.get('adminRefreshToken');
      if (!adminRefreshToken) {
        throw new Error('No refresh token');
      }

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
      resolve(data.accessToken);
    } catch (err) {
      removeAdminAccessToken();
      removeAdminRefreshToken();
      window.location.href = 'https://auth.entrydsm.kr';
      reject(err);
    } finally {
      isAdminRefreshingToken = false;
      adminRefreshTokenPromise = null;
    }
  });
  return adminRefreshTokenPromise;
};

const userRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();

  // 쿼리 파라미터 제거
  const baseUrl = url.split('?')[0];
  const endpoint = `${method} ${baseUrl}`;

  if (skipAuthUrls.includes(endpoint)) {
    return config;
  }

  let token = getAccessToken() || cookies.get('accessToken');

  if (!token) {
    try {
      token = await handleUserTokenRefresh();
    } catch (error) {
      console.error('Token refresh failed in request interceptor', error);
      return Promise.reject(new axios.Cancel('Token refresh failed'));
    }
  }

  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

const adminRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();

  // 쿼리 파라미터 제거
  const baseUrl = url.split('?')[0];
  const endpoint = `${method} ${baseUrl}`;

  if (skipAuthUrls.includes(endpoint)) {
    return config;
  }

  let token = getAdminAccessToken() || cookies.get('adminAccessToken');

  if (!token) {
    try {
      token = await handleAdminTokenRefresh();
    } catch (error) {
      console.error('Admin token refresh failed in request interceptor', error);
      return Promise.reject(new axios.Cancel('Token refresh failed'));
    }
  }

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
};

AdmissionUserInstance.interceptors.request.use(userRequestInterceptor);
AdmissionAdminInstance.interceptors.request.use(adminRequestInterceptor);

const userResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config || (response?.status !== 401 && response?.status !== 403)) {
    return Promise.reject(error);
  }

  const retryConfig = config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (retryConfig._retry) {
    return Promise.reject(error);
  }
  retryConfig._retry = true;

  try {
    const newAccessToken = await handleUserTokenRefresh();
    retryConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return await AdmissionUserInstance(retryConfig);
  } catch (err) {
    return Promise.reject(err);
  }
};

const adminResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config || (response?.status !== 401 && response?.status !== 403)) {
    return Promise.reject(error);
  }

  const retryConfig = config as InternalAxiosRequestConfig & { _retry?: boolean };

  if (retryConfig._retry) {
    return Promise.reject(error);
  }
  retryConfig._retry = true;

  try {
    const newAccessToken = await handleAdminTokenRefresh();
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

AdmissionAdminInstance.interceptors.response.use(
  (response) => response,
  adminResponseInterceptor
);
