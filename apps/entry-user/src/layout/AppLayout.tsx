import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { ApplicationNav, CommonHeader } from '@entry/ui';
import { useState } from 'react';

export const AppLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 30;

  return (
    <>
      <CommonHeader />
      <Main>
        <ApplicationNav
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100vw;
  margin-top: 70px;
`;
