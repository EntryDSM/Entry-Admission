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

export const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

export const userInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

export const scheduleInstance = axios.create({
  baseURL: import.meta.env.VITE_SCHEDULE_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

export const statusInstance = axios.create({
  baseURL: import.meta.env.VITE_STATUS_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

export const applicationInstance = axios.create({
  baseURL: import.meta.env.VITE_APPLICATION_BASE_URL,
});

const cookies = new Cookies();

const skipAuthUrls = [
  '/user/auth',
  '/user',
  '/admin/auth',
  '/user/verify/info',
  '/user/verify/popup',
];

const instances = [
  userInstance,
  scheduleInstance,
  statusInstance,
  applicationInstance,
];

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};
  const url = config.url || '';
  const method = config.method || 'get';

  const isSkip = skipAuthUrls.some(
    (skipUrl) => url.includes(skipUrl) && method === 'post'
  );

  if (isSkip) {
    console.log('[RequestInterceptor] Skip Auth URL:', url);
    if (url.includes('/admin/auth')) {
      try {
        const data =
          typeof config.data === 'string'
            ? JSON.parse(config.data)
            : config.data;
        const adminId = data?.adminId || getAdminId() || '';
        config.headers['Request-User-Id'] = adminId;
        config.headers['Request-User-Role'] = 'ADMIN';
        console.log('[RequestInterceptor] Admin login header set:', adminId);
      } catch (err) {
        console.warn('[RequestInterceptor] adminId 파싱 실패', err);
      }
    }
    return config;
  }

  const accessToken = getAccessToken() || cookies.get('accessToken');
  const refreshToken = getRefreshToken() || cookies.get('refreshToken');
  const adminAccessToken =
    getAdminAccessToken() || cookies.get('adminAccessToken');
  const adminRefreshToken =
    getAdminRefreshToken() || cookies.get('adminRefreshToken');
  const token = adminAccessToken || accessToken;

  if (!token) {
    console.log('[RequestInterceptor] No access token, redirect to login');
    window.location.href = '/'; // 토큰 없으면 로그인 페이지로 이동
    return config; // 더 이상 요청 진행 X
  }

  if (token && (refreshToken || adminRefreshToken)) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[RequestInterceptor] Attach token for request:', url);
  }

  return config;
};

instances.forEach((instance) => {
  instance.interceptors.request.use(requestInterceptor);
});

const responseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;

  if (!config) {
    console.warn('[ResponseInterceptor] config is undefined');
    return Promise.reject(error);
  }

  if (
    response?.status === 401 &&
    !(config as InternalAxiosRequestConfig & { _retry?: boolean })._retry
  ) {
    console.log(
      '[ResponseInterceptor] 401 detected, trying refresh token:',
      config?.url
    );
    (config as InternalAxiosRequestConfig & { _retry?: boolean })._retry = true;

    try {
      const refreshToken = getRefreshToken() || cookies.get('refreshToken');
      const adminRefreshToken =
        getAdminRefreshToken() || cookies.get('adminRefreshToken');

      if (adminRefreshToken) {
        console.log('[ResponseInterceptor] Admin token refresh started');
        const { data } = await userInstance.put(
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
        console.log('[ResponseInterceptor] Admin token refreshed:', data);

        setAdminAccessToken(data.accessToken);
        setAdminRefreshToken(data.refreshToken);

        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${data.accessToken}`;
        return userInstance(config);
      } else if (refreshToken) {
        console.log('[ResponseInterceptor] User token refresh started');
        const { data } = await userInstance.put(
          '/user/auth',
          {},
          { headers: { 'X-Refresh-Token': refreshToken } }
        );
        console.log('[ResponseInterceptor] User token refreshed:', data);

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${data.accessToken}`;
        return userInstance(config);
      } else {
        console.log('[ResponseInterceptor] No refresh token found');
        throw new Error('No refresh token');
      }
    } catch (err) {
      console.error('[ResponseInterceptor] 토큰 갱신 실패', err);
      removeAccessToken();
      removeRefreshToken();
      removeAdminAccessToken();
      removeAdminRefreshToken();
      window.location.href = 'https://auth.entrydsm.hs.kr';
    }
  }

  return Promise.reject(error);
};

instances.forEach((instance) => {
  instance.interceptors.response.use(
    (response) => response,
    responseInterceptor
  );
});
