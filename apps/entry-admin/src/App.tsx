import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from '@entry/design-token';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer />
      <GlobalStyle />
    </>
  );
};
