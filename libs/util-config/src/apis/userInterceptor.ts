import { Cookies } from 'react-cookie';
import {
  userInstance,
  scheduleInstance,
  statusInstance,
  applicationInstance
} from '@entry/util-config';
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
} from '@entry/util-config';

const cookies = new Cookies();

// 로그인/회원가입/관리자 로그인 제외할 URL
const skipAuthUrls = ['/user/auth', '/user', '/admin/auth' , '/user/verify/info' , '/user/verify/popup'];

// 모든 인스턴스 배열
const instances = [userInstance, scheduleInstance, statusInstance, applicationInstance];

// Request 인터셉터를 모든 인스턴스에 적용
const requestInterceptor = (config: any) => {
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
  const adminAccessToken = getAdminAccessToken() || cookies.get('adminAccessToken');
  const adminRefreshToken = getAdminRefreshToken() || cookies.get('adminRefreshToken');

  // 관리자 토큰이 있으면 관리자 토큰 사용, 없으면 일반 토큰 사용
  const token = adminAccessToken || accessToken;

  if (token && (refreshToken || adminRefreshToken)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

instances.forEach(instance => {
  instance.interceptors.request.use(requestInterceptor);
});

// Response 인터셉터 - 401 발생 시 Refresh Token 재발급
const responseInterceptor = async (error: any) => {
  const { config, response } = error;

  if (response?.status === 401 && !(config as any)._retry) {
    (config as any)._retry = true;

    try {
      const refreshToken = getRefreshToken() || cookies.get('refreshToken');
      const adminRefreshToken = getAdminRefreshToken() || cookies.get('adminRefreshToken');

      // 관리자 토큰이 있으면 관리자 토큰 갱신, 없으면 일반 토큰 갱신
      if (adminRefreshToken) {
        const { data } = await userInstance.put(
          '/admin/auth',
          {},
          {
            headers: {
              'X-Refresh-Token': adminRefreshToken,
              'Request-User-Id': getAdminId(),
              'Request-User-Role': 'ADMIN'
            }
          }
        );

        setAdminAccessToken(data.accessToken);
        setAdminRefreshToken(data.refreshToken);

        // 기존 요청 재시도
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${data.accessToken}`;
        return userInstance(config);
      } else if (refreshToken) {
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
      } else {
        throw new Error('No refresh token');
      }
    } catch (err) {
      console.error('[Interceptor] 토큰 갱신 실패', err);
      removeAccessToken();
      removeRefreshToken();
      removeAdminAccessToken();
      removeAdminRefreshToken();
      window.location.href = '/';
    }
  }

  return Promise.reject(error);
};

instances.forEach(instance => {
  instance.interceptors.response.use(
    (response) => response,
    responseInterceptor
  );
});
