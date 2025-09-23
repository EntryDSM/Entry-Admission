import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 쿠키 설정 옵션
const getCookieOptions = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  const expires = new Date();
  expires.setDate(expires.getDate() + 1); // 1일 후 만료

  return {
    path: '/',
    expires,
    domain: isLocalhost ? undefined : '.entrydsm.hs.kr'
  };
};

// 유저 토큰
export const setAccessToken = (token: string) => {
  cookies.set('accessToken', token, getCookieOptions());
};
export const getAccessToken = () => {
  return cookies.get('accessToken');
};
export const removeAccessToken = () => {
  const options = getCookieOptions();
  cookies.remove('accessToken', { path: options.path, domain: options.domain });
};

export const setRefreshToken = (token: string) => {
  cookies.set('refreshToken', token, getCookieOptions());
};
export const getRefreshToken = () => {
  return cookies.get('refreshToken');
};
export const removeRefreshToken = () => {
  const options = getCookieOptions();
  cookies.remove('refreshToken', { path: options.path, domain: options.domain });
};

// 어드민 토큰
export const setAdminAccessToken = (token: string) => {
  cookies.set('adminAccessToken', token, getCookieOptions());
};
export const getAdminAccessToken = () => {
  return cookies.get('adminAccessToken');
};
export const removeAdminAccessToken = () => {
  const options = getCookieOptions();
  cookies.remove('adminAccessToken', { path: options.path, domain: options.domain });
};

export const setAdminRefreshToken = (token: string) => {
  cookies.set('adminRefreshToken', token, getCookieOptions());
};
export const getAdminRefreshToken = () => {
  return cookies.get('adminRefreshToken');
};
export const removeAdminRefreshToken = () => {
  const options = getCookieOptions();
  cookies.remove('adminRefreshToken', { path: options.path, domain: options.domain });
};

// 어드민 ID
export const setAdminId = (adminId: string) => {
  cookies.set('adminId', adminId, getCookieOptions());
};
export const getAdminId = () => {
  return cookies.get('adminId');
};
export const removeAdminId = () => {
  const options = getCookieOptions();
  cookies.remove('adminId', { path: options.path, domain: options.domain });
};

// PASS 인증 mdlToken
export const setMdlToken = (token: string) => {
  cookies.set('mdlToken', token, getCookieOptions());
};
export const getMdlToken = () => {
  return cookies.get('mdlToken');
};
export const removeMdlToken = () => {
  const options = getCookieOptions();
  cookies.remove('mdlToken', { path: options.path, domain: options.domain });
};
