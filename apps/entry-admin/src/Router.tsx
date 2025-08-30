import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import {  AdmissionsSchedule, ApplicantsList, FormulaCalculator, NoticeList, NoticeCreate, NoticeEdit, StatisticsLandingPage, Page404 } from './pages';

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
  {
    path: '*',
    element: <Page404/>,
  },
]);
