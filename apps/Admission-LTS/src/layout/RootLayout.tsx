import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { NoPathHeader } from '@entry/ui';
import { ToastContainer } from 'react-toastify';

export const RootLayout = () => {
  return (
    <>
      <NoPathHeader />
      <Main>
        <Outlet />
      </Main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

const Main = styled.main`
  width: 100vw;
`;
