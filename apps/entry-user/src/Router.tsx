import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { Page404 } from '@entry/ui';
import {
  MainPage,
  SchoolDescription,
  Notification,
  FAQ,
  NotificationView,
  Mypage,
} from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/school-description',
        element: <SchoolDescription />,
      },
      {
        path: '/notification',
        element: <Notification />,
      },
      {
        path: '/notification/:id',
        element: <NotificationView />,
      },
      {
        path: '/faq',
        element: <FAQ />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
    ],
  },
  {
    path: '*', // 404 페이지
    element: <Page404 />,
  },
]);
