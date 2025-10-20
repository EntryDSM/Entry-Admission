import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
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
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const AdmissionAdminInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const AdmissionPublicInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

const cookies = new Cookies();

const getSessionId = (): string => {
  let sessionId = cookies.get('MIEERCAT_SESSION_ID');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    cookies.set('MIEERCAT_SESSION_ID', sessionId, { path: '/', maxAge: 86400 * 30 });
  }
  return sessionId;
};

// 로딩 표시 후 3초 뒤 리다이렉션
const showLoadingAndRedirect = (url: string) => {
  // 전체 화면 로딩 오버레이 생성
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  `;

  const spinner = document.createElement('div');
  spinner.style.cssText = `
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  `;

  const text = document.createElement('div');
  text.style.cssText = `
    margin-top: 20px;
    font-size: 18px;
    font-weight: 500;
  `;
  text.textContent = '로딩 중...';

  // 스피너 애니메이션 추가
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  overlay.appendChild(spinner);
  overlay.appendChild(text);
  document.head.appendChild(style);
  document.body.appendChild(overlay);

  // 3초 후 리다이렉트
  setTimeout(() => {
    window.location.href = url;
  }, 3000);
};

const skipAuthUrls = [
  'POST /admin/auth',
  'POST /user/auth',
  'PUT /user/auth',
  'POST /user',
  'POST /user/verify/popup',
  'GET /user/verify/info',
  'GET /notice',
  'GET /schedule',
  'GET /schedule/all',
  'GET /faq',
];

let userRefreshTokenPromise: Promise<string> | null = null;
let adminRefreshTokenPromise: Promise<string> | null = null;

// entrydsm.kr 메인 페이지인지 확인 (마이페이지 제외)
const isPublicEntryPage = (): boolean => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  // entrydsm.kr 또는 www.entrydsm.kr이고, /mypage가 아닌 경우
  return (hostname === 'entrydsm.kr' || hostname === 'www.entrydsm.kr') &&
         !pathname.startsWith('/mypage');
};

// 서버 에러 리포트
const reportServerError = async (
  config: InternalAxiosRequestConfig,
  error: AxiosError
) => {
  try {
    const pageType =
      window.location.hostname.includes('auth.entrydsm.kr')
        ? 'AUTH'
        : window.location.hostname.includes('entrydsm.kr')
          ? 'USER'
          : 'ADMISSION';

    const request =
      typeof config.data === 'string' ? config.data : JSON.stringify(config.data || {});

    const response = error.response?.data
      ? typeof error.response.data === 'string'
        ? error.response.data
        : JSON.stringify(error.response.data)
      : 'NULL';

    const requestPayload = `REQUEST: ${request} / RESPONSE: ${response}`;

    // 에러 타입 분류
    let errorCategory = 'SERVER_ERROR';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let httpStatus = error.response?.status || 500;
    let messageData: any = 'NULL';

    // 네트워크 에러 처리
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      errorCategory = 'NETWORK_ERROR';
      errorCode = 'TIMEOUT';
      httpStatus = 408;
      messageData = error.message || 'Request timeout';
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      errorCategory = 'NETWORK_ERROR';
      errorCode = 'NETWORK_FAILURE';
      httpStatus = 0;
      messageData = error.message || 'Network connection failed';
    } else if (error.response?.status && error.response.status >= 500) {
      errorCategory = 'SERVER_ERROR';
      errorCode = 'INTERNAL_SERVER_ERROR';
      messageData = error.response?.data && Object.keys(error.response.data).length > 0
        ? error.response.data
        : 'NULL';
    }

    const errorInfo = {
      sessionId: getSessionId(),
      pageType,
      endpoint: config.url || '',
      httpMethod: (config.method || 'GET').toUpperCase(),
      httpStatus,
      errorCategory,
      errorCode,
      message: messageData,
      stackTrace: error.stack || '',
      requestPayload,
      responseTime: performance.now(),
    };

    await fetch('https://meeeeercat.ncloud.sbs/v1/error/server', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorInfo),
    });
  } catch {}
};

// API 로그 기록
const logApiCall = (
  config: InternalAxiosRequestConfig,
  response: AxiosResponse,
  startTime: number
) => {
  // 메인 애플리케이션에 영향 없도록 비동기 처리
  setTimeout(async () => {
    try {
      const requestSize = config.data
        ? new Blob([typeof config.data === 'string' ? config.data : JSON.stringify(config.data)]).size
        : 0;

      const responseSize = response.data
        ? new Blob([typeof response.data === 'string' ? response.data : JSON.stringify(response.data)]).size
        : 0;

      const logData = {
        sessionId: getSessionId(),
        endpoint: config.url || '',
        method: (config.method || 'GET').toUpperCase(),
        statusCode: response.status,
        responseTime: Math.round(performance.now() - startTime),
        requestSize,
        responseSize,
      };

      await fetch('https://meeeeercat.ncloud.sbs/v1/logs/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData),
      });
    } catch {
      // 로깅 실패해도 무시
    }
  }, 0);
};

// 사용자 토큰 갱신
const handleUserTokenRefresh = () => {
  if (userRefreshTokenPromise) return userRefreshTokenPromise;

  userRefreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const userRefreshToken = getRefreshToken() || cookies.get('refreshToken');
      if (!userRefreshToken) throw new Error('No refresh token');

      const refreshResponse = await AdmissionUserInstance.put(
        '/user/auth',
        {},
        {
          headers: { 'X-Refresh-Token': userRefreshToken },
          // @ts-ignore
          skipAuthInterceptor: true,
        }
      );

      if (refreshResponse.status !== 200)
        throw new Error(`Refresh failed with status: ${refreshResponse.status}`);

      const { data } = refreshResponse;
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      resolve(data.accessToken);
    } catch (err) {
      removeAccessToken();
      removeRefreshToken();
      reject(err);
    } finally {
      userRefreshTokenPromise = null;
    }
  });
  return userRefreshTokenPromise;
};

// ✅ 관리자 토큰 갱신
const handleAdminTokenRefresh = () => {
  if (adminRefreshTokenPromise) return adminRefreshTokenPromise;

  adminRefreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const adminRefreshToken = getAdminRefreshToken() || cookies.get('adminRefreshToken');
      if (!adminRefreshToken) throw new Error('No refresh token');

      const refreshResponse = await AdmissionAdminInstance.put(
        '/admin/auth',
        {},
        {
          headers: {
            'X-Refresh-Token': adminRefreshToken,
            'Request-User-Id': getAdminId(),
            'Request-User-Role': 'ADMIN',
          },
          // @ts-ignore
          skipAuthInterceptor: true,
        }
      );

      if (refreshResponse.status !== 200)
        throw new Error(`Admin refresh failed with status: ${refreshResponse.status}`);

      const { data } = refreshResponse;
      setAdminAccessToken(data.accessToken);
      setAdminRefreshToken(data.refreshToken);
      resolve(data.accessToken);
    } catch (err) {
      removeAdminAccessToken();
      removeAdminRefreshToken();
      reject(err);
    } finally {
      adminRefreshTokenPromise = null;
    }
  });
  return adminRefreshTokenPromise;
};

// ✅ 사용자 요청 인터셉터
const userRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  // @ts-ignore - 요청 시작 시간 기록
  config.metadata = { startTime: performance.now() };

  // @ts-ignore
  if (config.skipAuthInterceptor) return config;

  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();
  const baseUrl = url.split('?')[0];
  const endpoint = `${method} ${baseUrl}`;

  if (skipAuthUrls.includes(endpoint)) return config;

  let token = getAccessToken() || cookies.get('accessToken');
  if (!token) {
    try {
      token = await handleUserTokenRefresh();
    } catch {
      // entrydsm.kr 메인 페이지에서는 리다이렉트하지 않음
      if (!isPublicEntryPage()) {
        window.location.href = 'https://auth.entrydsm.kr';
      }
      return Promise.reject(new axios.Cancel('No valid token'));
    }
  }

  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

// ✅ 관리자 요청 인터셉터
const adminRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  // @ts-ignore - 요청 시작 시간 기록
  config.metadata = { startTime: performance.now() };

  // @ts-ignore
  if (config.skipAuthInterceptor) return config;

  config.headers = config.headers || {};
  const url = config.url || '';
  const method = (config.method || 'get').toUpperCase();
  const baseUrl = url.split('?')[0];
  const endpoint = `${method} ${baseUrl}`;

  if (skipAuthUrls.includes(endpoint)) return config;

  let token = getAdminAccessToken() || cookies.get('adminAccessToken');
  if (!token) {
    try {
      token = await handleAdminTokenRefresh();
    } catch {
      window.location.href = 'https://auth.entrydsm.kr';
      return Promise.reject(new axios.Cancel('No valid admin token - redirecting to auth'));
    }
  }

  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

// ✅ Public 요청 인터셉터
const publicRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  // @ts-ignore - 요청 시작 시간 기록
  config.metadata = { startTime: performance.now() };
  return config;
};

AdmissionUserInstance.interceptors.request.use(userRequestInterceptor);
AdmissionAdminInstance.interceptors.request.use(adminRequestInterceptor);
AdmissionPublicInstance.interceptors.request.use(publicRequestInterceptor);

// ✅ 사용자 응답 인터셉터
const userResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;

  // 400번대 에러도 API 로그에 기록
  if (response && response.status >= 400 && response.status < 500 && config) {
    // @ts-ignore
    const startTime = config.metadata?.startTime || performance.now();
    logApiCall(config as InternalAxiosRequestConfig, response, startTime);
  }

  // 모든 에러 타입 리포트 (500, 네트워크 에러, 타임아웃 등)
  const shouldReport =
    response?.status === 500 ||
    response?.status && response.status >= 500 ||
    error.code === 'ECONNABORTED' ||
    error.message.includes('timeout') ||
    error.code === 'ERR_NETWORK' ||
    !response; // 응답 자체가 없는 경우 (네트워크 실패)

  if (shouldReport && config) {
    await reportServerError(config as InternalAxiosRequestConfig, error);
  }

  // TIMEOUT 에러 처리 - 1회 재시도
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    const retryConfig = config as InternalAxiosRequestConfig & { _timeoutRetry?: boolean };

    if (!retryConfig._timeoutRetry) {
      // 첫 번째 timeout - 재시도
      retryConfig._timeoutRetry = true;
      try {
        return await AdmissionUserInstance(retryConfig);
      } catch (retryError) {
        // 재시도 실패 시에도 로깅은 reportServerError에서 자동으로 처리됨
        showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=TIMEOUT');
        return Promise.reject(retryError);
      }
    }

    // 두 번째 timeout - 리다이렉트
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=TIMEOUT');
    return Promise.reject(error);
  }

  // 500, 502, 503 에러 시 리다이렉트
  if (response?.status === 500) {
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=500');
    return Promise.reject(error);
  }
  if (response?.status === 502) {
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=502');
    return Promise.reject(error);
  }
  if (response?.status === 503) {
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=503');
    return Promise.reject(error);
  }

  // skipAuthInterceptor가 설정된 요청(refresh 요청)은 401/403 재시도 하지 않음
  // @ts-ignore
  if (!config || config.skipAuthInterceptor || (response?.status !== 401 && response?.status !== 403))
    return Promise.reject(error);

  const retryConfig = config as InternalAxiosRequestConfig & { _retry?: boolean };
  if (retryConfig._retry) {
    // entrydsm.kr 메인 페이지에서는 리다이렉트하지 않음
    if (!isPublicEntryPage()) {
      window.location.href = 'https://auth.entrydsm.kr';
    }
    return Promise.reject(error);
  }

  retryConfig._retry = true;

  try {
    const newAccessToken = await handleUserTokenRefresh();
    retryConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return await AdmissionUserInstance(retryConfig);
  } catch (err) {
    // entrydsm.kr 메인 페이지에서는 리다이렉트하지 않음
    if (!isPublicEntryPage()) {
      window.location.href = 'https://auth.entrydsm.kr';
    }
    return Promise.reject(err);
  }
};

// ✅ 관리자 응답 인터셉터
const adminResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;

  // 400번대 에러도 API 로그에 기록
  if (response && response.status >= 400 && response.status < 500 && config) {
    // @ts-ignore
    const startTime = config.metadata?.startTime || performance.now();
    logApiCall(config as InternalAxiosRequestConfig, response, startTime);
  }

  // 모든 에러 타입 리포트 (500, 네트워크 에러, 타임아웃 등)
  const shouldReport =
    response?.status === 500 ||
    response?.status && response.status >= 500 ||
    error.code === 'ECONNABORTED' ||
    error.message.includes('timeout') ||
    error.code === 'ERR_NETWORK' ||
    !response; // 응답 자체가 없는 경우 (네트워크 실패)

  if (shouldReport && config) {
    await reportServerError(config as InternalAxiosRequestConfig, error);
  }

  // TIMEOUT 에러 처리 - 1회 재시도
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    const retryConfig = config as InternalAxiosRequestConfig & { _timeoutRetry?: boolean };

    if (!retryConfig._timeoutRetry) {
      // 첫 번째 timeout - 재시도
      retryConfig._timeoutRetry = true;
      try {
        return await AdmissionAdminInstance(retryConfig);
      } catch (retryError) {
        // 재시도 실패 시에도 로깅은 reportServerError에서 자동으로 처리됨
        showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=TIMEOUT');
        return Promise.reject(retryError);
      }
    }

    // 두 번째 timeout - 리다이렉트
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=TIMEOUT');
    return Promise.reject(error);
  }

  // 500, 502, 503 에러 시 리다이렉트
  if (response?.status === 500) {
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=500');
    return Promise.reject(error);
  }
  if (response?.status === 502) {
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=502');
    return Promise.reject(error);
  }
  if (response?.status === 503) {
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=503');
    return Promise.reject(error);
  }

  // skipAuthInterceptor가 설정된 요청(refresh 요청)은 401/403 재시도 하지 않음
  // @ts-ignore
  if (!config || config.skipAuthInterceptor || (response?.status !== 401 && response?.status !== 403))
    return Promise.reject(error);

  const retryConfig = config as InternalAxiosRequestConfig & { _retry?: boolean };
  if (retryConfig._retry) {
    window.location.href = 'https://auth.entrydsm.kr';
    return Promise.reject(error);
  }

  retryConfig._retry = true;

  try {
    const newAccessToken = await handleAdminTokenRefresh();
    retryConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
    return await AdmissionAdminInstance(retryConfig);
  } catch (err) {
    window.location.href = 'https://auth.entrydsm.kr';
    return Promise.reject(err);
  }
};

// ✅ 성공 응답 인터셉터 (API 로그 기록)
const successResponseInterceptor = (response: AxiosResponse) => {
  // @ts-ignore - 시작 시간 가져오기
  const startTime = response.config.metadata?.startTime || performance.now();

  // 200번대 응답일 때만 로그 기록
  if (response.status >= 200 && response.status < 300) {
    logApiCall(response.config, response, startTime);
  }

  return response;
};

AdmissionUserInstance.interceptors.response.use(
  successResponseInterceptor,
  userResponseInterceptor
);

AdmissionAdminInstance.interceptors.response.use(
  successResponseInterceptor,
  adminResponseInterceptor
);

// ✅ Public 응답 인터셉터
const publicResponseInterceptor = async (error: AxiosError) => {
  const { config, response } = error;

  // 400번대 에러도 API 로그에 기록
  if (response && response.status >= 400 && response.status < 500 && config) {
    // @ts-ignore
    const startTime = config.metadata?.startTime || performance.now();
    logApiCall(config as InternalAxiosRequestConfig, response, startTime);
  }

  // 모든 에러 타입 리포트 (500, 네트워크 에러, 타임아웃 등)
  const shouldReport =
    response?.status === 500 ||
    response?.status && response.status >= 500 ||
    error.code === 'ECONNABORTED' ||
    error.message.includes('timeout') ||
    error.code === 'ERR_NETWORK' ||
    !response; // 응답 자체가 없는 경우 (네트워크 실패)

  if (shouldReport && config) {
    await reportServerError(config as InternalAxiosRequestConfig, error);
  }

  // TIMEOUT 에러 처리 - 1회 재시도
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    const retryConfig = config as InternalAxiosRequestConfig & { _timeoutRetry?: boolean };

    if (!retryConfig._timeoutRetry) {
      // 첫 번째 timeout - 재시도
      retryConfig._timeoutRetry = true;
      try {
        return await AdmissionPublicInstance(retryConfig);
      } catch (retryError) {
        // 재시도 실패 시에도 로깅은 reportServerError에서 자동으로 처리됨
        showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=TIMEOUT');
        return Promise.reject(retryError);
      }
    }

    // 두 번째 timeout - 리다이렉트
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=TIMEOUT');
    return Promise.reject(error);
  }

  // 500, 502, 503 에러 시 리다이렉트
  if (response?.status === 500) {
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=500');
    return Promise.reject(error);
  }
  if (response?.status === 502) {
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=502');
    return Promise.reject(error);
  }
  if (response?.status === 503) {
    showLoadingAndRedirect('https://entrydsm.kr/return_soon?code=503');
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

AdmissionPublicInstance.interceptors.response.use(
  successResponseInterceptor,
  publicResponseInterceptor
);
