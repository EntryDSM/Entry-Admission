import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { AdmissionsQuota, AdmissionsSchedule, ApplicantsList, FormulaCalculator } from './pages';

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
      {
        path: 'admissions-schedule',
        element : <AdmissionsSchedule/>
      },
      {
        path: 'admissions-quota',
        element: <AdmissionsQuota/>
      }
    ],
  },
]);
