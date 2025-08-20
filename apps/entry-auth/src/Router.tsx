import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import {
  AdminLogin,
  ChangePasswordPage,
  FindPasswordPage,
  LoginPage,
  Page404,
  SignUpPage,
} from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/change-password',
        element: <ChangePasswordPage />,
      },
      {
        path: '/find-password',
        element: <FindPasswordPage />,
      },
      {
        path: '/admin-login',
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);
