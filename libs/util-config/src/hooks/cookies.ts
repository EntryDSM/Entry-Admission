import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 유저 토큰
export const setAccessToken = (token: string) => {
  cookies.set('accessToken', token, { path: '/' });
};
export const getAccessToken = () => {
  return cookies.get('accessToken');
};
export const removeAccessToken = () => {
  cookies.remove('accessToken', { path: '/' });
};

export const setRefreshToken = (token: string) => {
  cookies.set('refreshToken', token, { path: '/' });
};
export const getRefreshToken = () => {
  return cookies.get('refreshToken');
};
export const removeRefreshToken = () => {
  cookies.remove('refreshToken', { path: '/' });
};

// 어드민 토큰
export const setAdminAccessToken = (token: string) => {
  cookies.set('adminAccessToken', token, { path: '/' });
};
export const getAdminAccessToken = () => {
  return cookies.get('adminAccessToken');
};
export const removeAdminAccessToken = () => {
  cookies.remove('adminAccessToken', { path: '/' });
};

export const setAdminRefreshToken = (token: string) => {
  cookies.set('adminRefreshToken', token, { path: '/' });
};
export const getAdminRefreshToken = () => {
  return cookies.get('adminRefreshToken');
};
export const removeAdminRefreshToken = () => {
  cookies.remove('adminRefreshToken', { path: '/' });
};

// 어드민 ID
export const setAdminId = (adminId: string) => {
  cookies.set('adminId', adminId, { path: '/' });
};
export const getAdminId = () => {
  return cookies.get('adminId');
};
export const removeAdminId = () => {
  cookies.remove('adminId', { path: '/' });
};

// PASS 인증 mdlToken
export const setMdlToken = (token: string) => {
  cookies.set('mdlToken', token, { path: '/' });
};
export const getMdlToken = () => {
  return cookies.get('mdlToken');
};
export const removeMdlToken = () => {
  cookies.remove('mdlToken', { path: '/' });
};
