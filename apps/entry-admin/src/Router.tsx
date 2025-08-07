import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { ApplicantsList, FormulaCalculator } from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <div>dd</div>,
      },
      {
        path: 'formula-calculator',
        element: <FormulaCalculator />,
      },
      {
        path: 'applicants-list',
        element: <ApplicantsList />,
      },
    ],
  },
]);
