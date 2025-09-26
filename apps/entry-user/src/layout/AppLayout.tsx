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
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('localhost:');
    const currentURL = window.location.href;
    const isDev = cookies.get('dev') === 'true';

    // 로컬 환경이 아니고, dev 쿠키가 true가 아니고, entrydsm 도메인인 경우 무조건 error_fixing으로 리디렉션
    if (!isLocalhost && !isDev && (currentURL.includes('entrydsm.hs.kr') || currentURL.includes('entrydsm.kr'))) {
      // error_fixing 페이지가 아닌 경우에만 리디렉션
      if (pathname !== '/error_fixing') {
        window.location.href = 'https://entrydsm.kr/error_fixing';
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
