import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { AdmissionsQuota, AdmissionsSchedule, ApplicantsList, FormulaCalculator, NoticeList, NoticeCreate, NoticeEdit, StatisticsLandingPage } from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <StatisticsLandingPage />,
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
      },
      {
        path: 'notice',
        element: <NoticeList />,
      },
      {
        path: 'notice/create',
        element: <NoticeCreate />,
      },
      {
        path: 'notice/edit/:id',
        element: <NoticeEdit />,
      },
    ],
  },
]);
