import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { Page404 } from '@entry/ui';
import { MainPage } from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
  {
    path: '*', // 404 페이지
    element: <Page404 />,
  },
]);
