import { Cookies } from 'react-cookie';
import { userInstance, getAdminId } from '@entry/util-config';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '@entry/util-config';

const cookies = new Cookies();

// 로그인/회원가입/관리자 로그인 제외할 URL
const skipAuthUrls = ['/user/auth', '/user', '/admin/auth'];

userInstance.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const url = config.url || '';
  const method = config.method || 'get';

  // 로그인/회원가입/관리자 로그인 요청이면 accessToken 생략
  const isSkip = skipAuthUrls.some(
    (skipUrl) => url.includes(skipUrl) && method === 'post'
  );
  if (isSkip) {
    if (url.includes('/admin/auth')) {
      try {
        const data =
          typeof config.data === 'string'
            ? JSON.parse(config.data)
            : config.data;
        const adminId = data?.adminId || getAdminId() || '';
        config.headers['Request-User-Id'] = adminId;
        config.headers['Request-User-Role'] = 'ADMIN';
      } catch (err) {
        console.warn('[Interceptor] adminId 파싱 실패', err);
      }
    }
    return config;
  }

  // 나머지 요청은 accessToken 자동 삽입
  const accessToken = getAccessToken() || cookies.get('accessToken');
  const refreshToken = getRefreshToken() || cookies.get('refreshToken');

  if (accessToken && refreshToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Response 인터셉터 - 401 발생 시 Refresh Token 재발급
userInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response?.status === 401 && !(config as any)._retry) {
      (config as any)._retry = true;

      try {
        const refreshToken = getRefreshToken() || cookies.get('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await userInstance.put(
          '/user/auth',
          {},
          { headers: { 'X-Refresh-Token': refreshToken } }
        );

        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        // 기존 요청 재시도
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${data.accessToken}`;
        return userInstance(config);
      } catch (err) {
        console.error('[Interceptor] 토큰 갱신 실패', err);
        removeAccessToken();
        removeRefreshToken();
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);
