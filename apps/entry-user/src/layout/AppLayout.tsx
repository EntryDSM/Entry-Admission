import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { GlobalStyle } from '@entry/design-token';

export const AppLayout = () => {
  return (
    <Main>
      <Outlet />
      <GlobalStyle />
    </Main>
  );
};

const Main = styled.main`
  width: 100vw;
  margin-top: 70px;
`;
