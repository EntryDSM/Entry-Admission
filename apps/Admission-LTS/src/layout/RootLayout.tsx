import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { NoPathHeader } from '@entry/ui';
import { ToastContainer } from 'react-toastify';
import { useLayoutEffect } from 'react';

export const RootLayout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // 메인 스크롤 컨테이너를 최상단으로
    window.scrollTo(0, 0);

    // 내부 스크롤 컨테이너들도 처리
    const scrollContainers = document.querySelectorAll(
      '[data-scroll-container]'
    );
    scrollContainers.forEach((container) => {
      if (container instanceof HTMLElement) {
        container.scrollTop = 0;
      }
    });
  }, [location.pathname]);

  return (
    <>
      <NoPathHeader />
      <Main data-scroll-container>
        <Outlet />
      </Main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

const Main = styled.main`
  padding-top: 70px;
  width: 100vw;
  min-height: 100vh;
`;
