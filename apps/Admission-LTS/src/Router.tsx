import { createBrowserRouter } from 'react-router-dom';
import {
  AppLayout,
  ApplicationLayout,
  GedScoreLayout,
  GraduateScoreLayout,
  ProspectiveGraduateScoreLayout,
  RootLayout,
} from './layout';
import {
  ActivityGraduate,
  ActivityProspectiveGraduate,
  First,
  Fourth,
  Landing,
  ScoreFirst,
  ScoreFirstProspectiveGraduate,
  ScoreFourth,
  ScoreSecond,
  ScoreSecondProspectiveGraduate,
  ScoreThird,
  ScoreThirdProspectiveGraduate,
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
                element: <GraduateScoreLayout />,
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
                    path: 'fourth-graduate',
                    element: <ScoreFourth />,
                  },
                  {
                    path: 'activity-graduate',
                    element: <ActivityGraduate />,
                  },
                ],
              },
              {
                path: '',
                element: <ProspectiveGraduateScoreLayout />,
                children: [
                  {
                    path: 'first-prospective-graduate',
                    element: <ScoreFirstProspectiveGraduate />,
                  },
                  {
                    path: 'second-prospective-graduate',
                    element: <ScoreSecondProspectiveGraduate />,
                  },
                  {
                    path: 'third-prospective-graduate',
                    element: <ScoreThirdProspectiveGraduate />,
                  },
                  {
                    path: 'activity-prospective-graduate',
                    element: <ActivityProspectiveGraduate />,
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
