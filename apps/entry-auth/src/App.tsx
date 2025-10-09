import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from '@entry/design-token';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    const isDev = localStorage.getItem('DEV');
    if (isDev !== 'TRUE' && !window.location.pathname.includes('/sorry')) {
      window.location.href = '/sorry';
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
