import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <div>dd</div>,
      },
    ],
  },
]);
