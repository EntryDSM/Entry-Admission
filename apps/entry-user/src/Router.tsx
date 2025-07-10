import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout, CalculateLayout } from './layout';
import { Main, NoticeDetailPage, ScoreFirst, ScoreSecond, ScoreThird, Activity, QEDScore } from './pages';
import { NoticePage } from './pages/NoticePage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/notice',
        element: <NoticePage/>
      },
      {
        path: '/notice/:id',
        element: <NoticeDetailPage/>
      },
      {
        path: '/calculate',
        element: <CalculateLayout />,
        children: [
          // 기본 리다이렉트
          {
            path: '',
            element: <Navigate to="/calculate/primary/first-graduate" replace />
          },
          // 가듨예정자 플로우
          {
            path: 'primary/first-graduate',
            element: <ScoreFirst />
          },
          {
            path: 'primary/second-graduate', 
            element: <ScoreSecond />
          },
          {
            path: 'primary/third-graduate',
            element: <ScoreThird />
          },
          {
            path: 'primary/activity',
            element: <Activity />
          },
          // 가듨자 플로우
          {
            path: 'graduated/third2',
            element: <ScoreThird />
          },
          {
            path: 'graduated/third1',
            element: <ScoreThird />
          },
          {
            path: 'graduated/second2',
            element: <ScoreSecond />
          },
          {
            path: 'graduated/second1', 
            element: <ScoreSecond />
          },
          {
            path: 'graduated/activity',
            element: <Activity />
          },
          // 검정고시 플로우
          {
            path: 'qe/score',
            element: <QEDScore />
          },
          {
            path: 'qe/activity',
            element: <Activity />
          }
        ]
      }
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);
