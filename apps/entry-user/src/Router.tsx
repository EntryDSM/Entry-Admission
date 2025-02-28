import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
  },
]);
