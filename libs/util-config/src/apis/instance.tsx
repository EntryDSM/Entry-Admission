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

const cookies = new Cookies();

const skipAuthUrls = [
  'POST /admin/auth',
  'POST /user/auth',
  'POST /user',
  'POST /user/verify/popup',
  'GET /user/verify/info',
];


/**
 * 사용자 요청 인터셉터
 */
const userRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();

  // Bearer 토큰이 필요없는 엔드포인트 체크
  const endpoint = `${method} ${url}`;
  if (skipAuthUrls.includes(endpoint)) {
    return config;
  }

  const token = getAccessToken() || cookies.get('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

/**
 * 관리자 요청 인터셉터
 */
const adminRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();

  // Bearer 토큰이 필요없는 엔드포인트 체크
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

AdmissionUserInstance.interceptors.request.use(userRequestInterceptor);
AdmissionAdminInstance.interceptors.request.use(adminRequestInterceptor);

/**
 * 사용자 응답 인터셉터 (토큰 재발급 처리)
 */
const userResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config) return Promise.reject(error);

  const retryConfig = config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if ((response?.status === 401 || response?.status === 403) && !retryConfig._retry) {
    retryConfig._retry = true;

    try {
      const userRefreshToken = getRefreshToken() || cookies.get('refreshToken');
      if (userRefreshToken) {
        const { data } = await AdmissionUserInstance.put(
          '/user/auth',
          {},
          { headers: { 'X-Refresh-Token': userRefreshToken } }
        );

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        retryConfig.headers['Authorization'] = `Bearer ${data.accessToken}`;
        try {
          const retryResponse = await AdmissionUserInstance(retryConfig);
          return retryResponse;
        } catch (retryError: any) {
          // 리프레시 후 재시도에서도 401/403이 오면 완전 로그아웃
          if (retryError.response?.status === 401 || retryError.response?.status === 403) {
            throw retryError; // catch 블록으로 넘어가서 로그아웃 처리
          }
          throw retryError;
        }
      }

      throw new Error('No refresh token');
    } catch (err) {
      removeAccessToken();
      removeRefreshToken();
      window.location.href = 'https://auth.entrydsm.kr';
    }
  }

  return Promise.reject(error);
};

/**
 * 관리자 응답 인터셉터 (토큰 재발급 처리)
 */
const adminResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config) return Promise.reject(error);

  const retryConfig = config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if ((response?.status === 401 || response?.status === 403) && !retryConfig._retry) {
    console.log(`[AdminResponseInterceptor] ${response.status} detected, trying refresh token`);
    retryConfig._retry = true;

    try {
      const adminRefreshToken = getAdminRefreshToken() || cookies.get('adminRefreshToken');
      if (adminRefreshToken) {
        console.log('[AdminResponseInterceptor] Admin token refresh started');
        const { data } = await AdmissionAdminInstance.put(
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

        retryConfig.headers['Authorization'] = `Bearer ${data.accessToken}`;
        try {
          const retryResponse = await AdmissionAdminInstance(retryConfig);
          return retryResponse;
        } catch (retryError: any) {
          // 리프레시 후 재시도에서도 401/403이 오면 완전 로그아웃
          if (retryError.response?.status === 401 || retryError.response?.status === 403) {
            console.error('[AdminResponseInterceptor] Still unauthorized after refresh, logging out');
            throw retryError; // catch 블록으로 넘어가서 로그아웃 처리
          }
          throw retryError;
        }
      }

      console.warn('[AdminResponseInterceptor] No refresh token found');
      throw new Error('No refresh token');
    } catch (err) {
      console.error('[AdminResponseInterceptor] Token refresh failed', err);
      removeAdminAccessToken();
      removeAdminRefreshToken();
      window.location.href = 'https://auth.entrydsm.kr';
    }
  }

  return Promise.reject(error);
};

AdmissionUserInstance.interceptors.response.use(
  (response) => response,
  userResponseInterceptor
);

AdmissionAdminInstance.interceptors.response.use(
  (response) => response,
  adminResponseInterceptor
);
