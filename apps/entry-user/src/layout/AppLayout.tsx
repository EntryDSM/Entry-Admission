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
