import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { AuthHeader } from '@entry/ui';

export const AppLayout = () => {
  return (
    <>
      <AuthHeader />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100%;
  margin-top: 70px;
`;
