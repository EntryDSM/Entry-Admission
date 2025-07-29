import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '@entry/ui';

export const AppLayout = () => {
  return (
    <>
      <AdminHeader />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100vw;
  margin-top: 70px;
  padding: 50px 100px;
`;
