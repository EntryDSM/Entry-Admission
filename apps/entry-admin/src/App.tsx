import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';

export const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
};
