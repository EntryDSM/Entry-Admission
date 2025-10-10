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

// 인증이 필요 없는 공개 API 전용 인스턴스
export const AdmissionPublicInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

const cookies = new Cookies();

// 인증이 필요 없는 공개 API 목록
const skipAuthUrls = [
  'POST /admin/auth',
  'POST /user/auth',
  'PUT /user/auth', // 토큰 갱신
  'POST /user',
  'POST /user/verify/popup',
  'GET /user/verify/info',
  'GET /notice', // 공지사항 목록
  'GET /schedule', // 일정 조회
  'GET /schedule/all', // 전체 일정
  'GET /faq', // FAQ
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
        {
          headers: { 'X-Refresh-Token': userRefreshToken },
          // @ts-ignore - interceptor를 우회하기 위한 플래그
          skipAuthInterceptor: true
        }
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
      // 토큰 갱신 실패 시 자동 리다이렉트하지 않음 - 각 페이지에서 처리하도록 함
      console.error('User token refresh failed:', err);
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
          // @ts-ignore - interceptor를 우회하기 위한 플래그
          skipAuthInterceptor: true
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
      // 토큰 갱신 실패 시 자동 리다이렉트하지 않음 - 각 페이지에서 처리하도록 함
      console.error('Admin token refresh failed:', err);
      reject(err);
    } finally {
      isAdminRefreshingToken = false;
      adminRefreshTokenPromise = null;
    }
  });
  return adminRefreshTokenPromise;
};

const userRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  // @ts-ignore - skipAuthInterceptor 플래그 확인
  if (config.skipAuthInterceptor) {
    return config;
  }

  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();

  // 쿼리 파라미터 제거
  const baseUrl = url.split('?')[0];
  const endpoint = `${method} ${baseUrl}`;

  // 인증이 필요 없는 공개 API는 그냥 통과
  if (skipAuthUrls.includes(endpoint)) {
    return config;
  }

  // 인증이 필요한 API: 토큰 확인
  let token = getAccessToken() || cookies.get('accessToken');

  if (!token) {
    // 토큰이 없으면 리프레시 시도
    try {
      token = await handleUserTokenRefresh();
    } catch (error) {
      // 리프레시도 실패하면 auth로 리다이렉트
      console.error('Token refresh failed - redirecting to auth', error);
      window.location.href = 'https://auth.entrydsm.kr';
      return Promise.reject(new axios.Cancel('No valid token - redirecting to auth'));
    }
  }

  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

const adminRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  // @ts-ignore - skipAuthInterceptor 플래그 확인
  if (config.skipAuthInterceptor) {
    return config;
  }

  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();

  // 쿼리 파라미터 제거
  const baseUrl = url.split('?')[0];
  const endpoint = `${method} ${baseUrl}`;

  // 인증이 필요 없는 공개 API는 그냥 통과
  if (skipAuthUrls.includes(endpoint)) {
    return config;
  }

  // 인증이 필요한 API: 토큰 확인
  let token = getAdminAccessToken() || cookies.get('adminAccessToken');

  if (!token) {
    // 토큰이 없으면 리프레시 시도
    try {
      token = await handleAdminTokenRefresh();
    } catch (error) {
      // 리프레시도 실패하면 auth로 리다이렉트
      console.error('Admin token refresh failed - redirecting to auth', error);
      window.location.href = 'https://auth.entrydsm.kr';
      return Promise.reject(new axios.Cancel('No valid admin token - redirecting to auth'));
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
    // 재시도도 실패하면 auth로 리다이렉트
    window.location.href = 'https://auth.entrydsm.kr';
    return Promise.reject(error);
  }
  retryConfig._retry = true;

  try {
    const newAccessToken = await handleUserTokenRefresh();
    retryConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return await AdmissionUserInstance(retryConfig);
  } catch (err) {
    // 토큰 갱신 실패 시 auth로 리다이렉트
    window.location.href = 'https://auth.entrydsm.kr';
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
    // 재시도도 실패하면 auth로 리다이렉트
    window.location.href = 'https://auth.entrydsm.kr';
    return Promise.reject(error);
  }
  retryConfig._retry = true;

  try {
    const newAccessToken = await handleAdminTokenRefresh();
    retryConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return await AdmissionAdminInstance(retryConfig);
  } catch (err) {
    // 토큰 갱신 실패 시 auth로 리다이렉트
    window.location.href = 'https://auth.entrydsm.kr';
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
