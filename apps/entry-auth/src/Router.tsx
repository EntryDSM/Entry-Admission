import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { LoginPage } from './pages/LoginPage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
    ],
  },
]);
