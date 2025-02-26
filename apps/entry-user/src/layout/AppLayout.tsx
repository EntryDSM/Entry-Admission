import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.main`
  width: 100vw;
  margin-top: 64px;
`;
