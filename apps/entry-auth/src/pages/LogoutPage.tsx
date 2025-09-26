import { useEffect } from 'react';
import {
  removeAccessToken,
  removeRefreshToken,
  removeAdminAccessToken,
  removeAdminRefreshToken,
  removeAdminId,
  removeMdlToken,
} from '@entry/util-config';

export const LogoutPage = () => {
  useEffect(() => {
    // 모든 쿠키 삭제
    removeAccessToken();
    removeRefreshToken();
    removeAdminAccessToken();
    removeAdminRefreshToken();
    removeAdminId();
    removeMdlToken();

    // auth.entrydsm.kr로 리다이렉트
    window.location.href = 'https://auth.entrydsm.kr';
  }, []);

  return (
    <div>
      <p>로그아웃 중...</p>
    </div>
  );
};