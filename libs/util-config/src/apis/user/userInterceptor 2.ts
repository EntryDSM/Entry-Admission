import { userInstance } from '@entry/util-config';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '@entry/util-config';

userInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[Request] AccessToken 추가:', token);
  }
  return config;
});

// Response 인터셉터 - 401 발생 시 Refresh Token으로 재발급
userInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (response?.status === 401 && !(config as any)._retry) {
      console.warn('[Interceptor] 401 발생, 토큰 재발급 시도');
      (config as any)._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await userInstance.put(
          '/user/auth',
          {},
          { headers: { 'X-Refresh-Token': refreshToken } }
        );

        console.log('[Interceptor] 토큰 갱신 성공', data);

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
