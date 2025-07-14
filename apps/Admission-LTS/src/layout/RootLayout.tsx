import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { NoPathHeader } from '@entry/ui';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

export const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <NoPathHeader />
      <Main>
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
`;
