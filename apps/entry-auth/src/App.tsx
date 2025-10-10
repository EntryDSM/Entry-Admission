import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from '@entry/design-token';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    const isDev = localStorage.getItem('DEV');
    const currentPath = window.location.pathname;

    // /dev/enable과 /sorry 경로는 체크 제외
    if (
      isDev !== 'TRUE' &&
      !currentPath.includes('/sorry') &&
      !currentPath.includes('/dev/enable')
    ) {
      // window.location.href = '/sorry';
    }
  }, []);

  return (
    <>
      <RouterProvider router={Router} />
      <GlobalStyle />
      <ToastContainer />
    </>
  );
};
