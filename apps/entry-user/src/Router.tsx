import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { Main } from './pages';
import { NoticePage } from './pages/NoticePage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/notice',
        element: <NoticePage/>
      }
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);
