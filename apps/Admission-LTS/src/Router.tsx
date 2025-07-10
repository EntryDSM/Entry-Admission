import { createBrowserRouter } from 'react-router-dom';
import {
  AppLayout,
  ApplicationLayout,
  GedScoreLayout,
  RootLayout,
  ScoreLayout,
} from './layout';
import {
  Activity,
  First,
  Fourth,
  Landing,
  ScoreFirst,
  ScoreSecond,
  ScoreThird,
  Second,
  SubmitCheck,
  Submitted,
  Third,
} from './pages';
import { ApplicationPreview } from './pages/applicationCheck';
import { Page404 } from '@entry/ui';
import { GedScore } from './pages/ged';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
      {
        path: '',
        element: <AppLayout />,
        children: [
          {
            path: '',
            element: <ApplicationLayout />,
            children: [
              {
                path: 'ged',
                element: <GedScoreLayout />,
                children: [
                  {
                    path: 'score',
                    element: <GedScore />,
                  },
                ],
              },
              {
                path: '',
                element: <ScoreLayout />,
                children: [
                  {
                    path: 'first-graduate',
                    element: <ScoreFirst />,
                  },
                  {
                    path: 'second-graduate',
                    element: <ScoreSecond />,
                  },
                  {
                    path: 'third-graduate',
                    element: <ScoreThird />,
                  },
                  {
                    path: 'activity',
                    element: <Activity />,
                  },
                ],
              },
              {
                path: 'first',
                element: <First />,
              },
              {
                path: 'second',
                element: <Second />,
              },
              {
                path: 'third',
                element: <Third />,
              },
              {
                path: 'fourth',
                element: <Fourth />,
              },
            ],
          },
          {
            path: 'submit-check',
            element: <SubmitCheck />,
          },
          {
            path: 'application-preview',
            element: <ApplicationPreview />,
          },
        ],
      },
      {
        path: 'submitted',
        element: <Submitted />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);
