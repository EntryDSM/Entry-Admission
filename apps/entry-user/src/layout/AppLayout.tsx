import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { CommonHeader, Footer } from '@entry/ui';

export const AppLayout = () => {
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
