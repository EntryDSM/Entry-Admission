import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import {
  AdminLogin,
  ChangePasswordPage,
  FindPasswordPage,
  LoginPage,
  LogoutPage,
  Page404,
  SignUpPage,
  UserInfoPage,
  SorryPage,
  DevEnablePage,
} from './pages';

export const Router = createBrowserRouter([
  {
    path: '/sorry',
    element: <SorryPage />,
  },
  {
    path: '/dev/enable',
    element: <DevEnablePage />,
  },
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
        path: '/user-info',
        element: <UserInfoPage />,
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
      {
        path: '/logout',
        element: <LogoutPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);
