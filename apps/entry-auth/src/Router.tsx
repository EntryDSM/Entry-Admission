import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { LoginPage, SignUpPage } from './pages';

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
    ],
  },
]);
