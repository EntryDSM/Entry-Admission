import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { Main, NoticeDetailPage } from './pages';
import { NoticePage } from './pages/NoticePage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
      },
      {
        path: '/landing',
        element: <Main />,
      },
      {
        path: '/notice',
        element: <NoticePage />,
      },
      {
        path: '/notice/:id',
        element: <NoticeDetailPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);
