import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { CommonHeader } from '@entry/ui';
import { GlobalStyle } from '@entry/design-token';

export const AppLayout = () => {
  return (
    <>
      <CommonHeader isAdmin={false} />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <GlobalStyle />
    </>
  );
};

const MainContainer = styled.main`
  width: 100vw;
  margin-top: 64px;
`;
