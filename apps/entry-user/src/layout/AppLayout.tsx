import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { CommonHeader, Footer } from '@entry/ui';
import { useEffect } from 'react';
import { CalculationDataProvider } from '../contexts';

export const AppLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CalculationDataProvider>
      <CommonHeader />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </CalculationDataProvider>
  );
};

const Main = styled.main`
  width: 100vw;
  margin-top: 70px;
`;
