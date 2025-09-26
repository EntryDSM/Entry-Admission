import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { CommonHeader, Footer } from '@entry/ui';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';

export const AppLayout = () => {
  const { pathname } = useLocation();
  const cookies = new Cookies();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // 랜딩페이지(/)를 제외한 모든 페이지에서 도메인 리디렉션 검사
    if (pathname !== '/') {
      const currentURL = window.location.href;
      if (currentURL.includes('entrydsm.hs.kr')) {
        alert('리디렉션 중');
        const newURL = currentURL.replace('entrydsm.hs.kr', 'entrydsm.kr');
        window.location.href = newURL;
      }
    }
  }, [pathname]);

  useEffect(() => {
    // 랜딩페이지(/)를 제외한 모든 페이지에서 site_access 쿠키 체크
    if (pathname !== '/') {
      const hostname = window.location.hostname;
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('localhost:');
      const currentURL = window.location.href;

      // 로컬 환경이 아니고 entrydsm.kr 도메인인 경우에만 체크
      if (!isLocalhost && currentURL.includes('entrydsm.kr')) {
        const siteAccess = cookies.get('site_access');
        if (!siteAccess) {
          window.location.href = 'https://entrydsm.kr/error_fixing';
        }
      }
    }
  }, [pathname, cookies]);
  return (
    <>
      <CommonHeader />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  width: 100vw;
  margin-top: 70px;
`;
