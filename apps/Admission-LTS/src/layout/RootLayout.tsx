import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { NoPathHeader } from '@entry/ui';
import { ToastContainer } from 'react-toastify';
import { useEffect, useRef } from 'react';

export const RootLayout = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <>
      <NoPathHeader />
      <Main ref={mainRef}>
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
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
`;
