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
  baseURL: import.meta.env.VITE_BASE_URL,
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

  // 인증 스킵 URL
  const isSkip = skipAuthUrls.some(
    (skipUrl) => url.includes(skipUrl) && method === 'post'
  );

  if (isSkip) {
    // Admin 로그인 시 adminId와 역할 헤더 추가
    if (url.includes('/admin/auth')) {
      try {
        const data =
          typeof config.data === 'string'
            ? JSON.parse(config.data)
            : config.data;
        const adminId = data?.adminId || getAdminId() || '';
        (config.headers as any).set?.('Request-User-Id', adminId);
        (config.headers as any).set?.('Request-User-Role', 'ADMIN');
        console.log('[RequestInterceptor] Admin login header set:', adminId);
      } catch (err) {
        console.warn('[RequestInterceptor] adminId 파싱 실패', err);
      }
    }
    return config;
  }

  // 토큰 가져오기
  const token =
    getAdminAccessToken() || getAccessToken() || cookies.get('accessToken');

  if (!token) {
    console.warn('[RequestInterceptor] No access token, redirect to login');
    window.location.href = '/';
    return config;
  }

  (config.headers as any).set?.('Authorization', `Bearer ${token}`);
  console.log('[RequestInterceptor] Authorization header set:', token);

  return config;
};

instances.forEach((instance) => {
  instance.interceptors.request.use(requestInterceptor);
});

const responseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config) return Promise.reject(error);

  const retryConfig = config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if (response?.status === 401 && !retryConfig._retry) {
    console.log('[ResponseInterceptor] 401 detected, trying refresh token');
    retryConfig._retry = true;

    try {
      const adminRefreshToken =
        getAdminRefreshToken() || cookies.get('adminRefreshToken');
      const refreshToken = getRefreshToken() || cookies.get('refreshToken');

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

        setAdminAccessToken(data.accessToken);
        setAdminRefreshToken(data.refreshToken);

        (retryConfig.headers as any).set?.(
          'Authorization',
          `Bearer ${data.accessToken}`
        );
        return userInstance(retryConfig);
      } else if (refreshToken) {
        console.log('[ResponseInterceptor] User token refresh started');
        const { data } = await userInstance.put(
          '/user/auth',
          {},
          { headers: { 'X-Refresh-Token': refreshToken } }
        );

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        (retryConfig.headers as any).set?.(
          'Authorization',
          `Bearer ${data.accessToken}`
        );
        return userInstance(retryConfig);
      } else {
        console.warn('[ResponseInterceptor] No refresh token found');
        throw new Error('No refresh token');
      }
    } catch (err) {
      console.error('[ResponseInterceptor] Token refresh failed', err);
      removeAccessToken();
      removeRefreshToken();
      removeAdminAccessToken();
      removeAdminRefreshToken();
      window.location.href = 'https://auth.entrydsm.hs.kr';
    }
  }

  return Promise.reject(error);
};

// 각 인스턴스에 responseInterceptor 적용
instances.forEach((instance) => {
  instance.interceptors.response.use(
    (response) => response,
    responseInterceptor
  );
});
