import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { NoPathHeader } from '@entry/ui';

export const RootLayout = () => {
  return (
    <>
      <NoPathHeader />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100vw;
`;
