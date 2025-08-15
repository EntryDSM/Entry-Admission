import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { ApplicantsList, FormulaCalculator, NoticeList, NoticeCreate, NoticeEdit } from './pages';

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
