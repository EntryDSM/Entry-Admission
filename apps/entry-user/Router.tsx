import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './src/layout';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
  },
]);
