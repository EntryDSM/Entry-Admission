import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 쿠키 옵션 (로컬/배포 환경 구분)
const getCookieOptions = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  const expires = new Date();
  expires.setDate(expires.getDate() + 1); // 1일 후 만료

  return {
    path: '/',
    expires,
    domain: isLocalhost ? undefined : '.entrydsm.hs.kr',
    secure: !isLocalhost, // HTTPS 환경에서만 전송 (로컬 제외)
    sameSite: isLocalhost ? 'lax' : 'none', // 서브도메인 간 쿠키 공유 허용
  } as const;
};

// 공통 remove 함수
const removeCookie = (key: string) => {
  const options = getCookieOptions();
  cookies.remove(key, options);
};

// 유저 토큰
export const setAccessToken = (token: string) =>
  cookies.set('accessToken', token, getCookieOptions());
export const getAccessToken = () => cookies.get('accessToken');
export const removeAccessToken = () => removeCookie('accessToken');

export const setRefreshToken = (token: string) =>
  cookies.set('refreshToken', token, getCookieOptions());
export const getRefreshToken = () => cookies.get('refreshToken');
export const removeRefreshToken = () => removeCookie('refreshToken');

// 어드민 토큰
export const setAdminAccessToken = (token: string) =>
  cookies.set('adminAccessToken', token, getCookieOptions());
export const getAdminAccessToken = () => cookies.get('adminAccessToken');
export const removeAdminAccessToken = () => removeCookie('adminAccessToken');

export const setAdminRefreshToken = (token: string) =>
  cookies.set('adminRefreshToken', token, getCookieOptions());
export const getAdminRefreshToken = () => cookies.get('adminRefreshToken');
export const removeAdminRefreshToken = () => removeCookie('adminRefreshToken');

// 어드민 ID
export const setAdminId = (adminId: string) =>
  cookies.set('adminId', adminId, getCookieOptions());
export const getAdminId = () => cookies.get('adminId');
export const removeAdminId = () => removeCookie('adminId');

// PASS 인증 mdlToken
export const setMdlToken = (token: string) =>
  cookies.set('mdlToken', token, getCookieOptions());
export const getMdlToken = () => cookies.get('mdlToken');
export const removeMdlToken = () => removeCookie('mdlToken');
