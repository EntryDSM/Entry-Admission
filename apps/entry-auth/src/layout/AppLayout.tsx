import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthHeader } from '@entry/ui';

export const AppLayout = () => {
  // const location = useLocation();
  // const isAdmin = location.pathname === '/admin-login';
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');
  console.log('AppLayout 렌더링됨, isAdmin:', isAdmin);

  return (
    <>
      <AuthHeader isAdmin={isAdmin} />
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
