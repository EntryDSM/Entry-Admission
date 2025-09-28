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
  ApplicationClassification,
  MiddleSchoolInfo,
  PersonalStatements,
  Landing,
  ScoreFirst,
  ScoreFirstProspectiveGraduate,
  ScoreFourth,
  ScoreSecond,
  ScoreSecondProspectiveGraduate,
  ScoreThird,
  ScoreThirdProspectiveGraduate,
  ApplicantInfo,
  SubmitCheck,
  Submitted,
  GuardianInfo,
  Page404,
} from './pages';
import { ApplicationPreview } from './pages/applicationCheck';
import { AttendanceVolunteer, GedScore } from './pages/ged';


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
                  {
                    path: 'attendance-volunteer',
                    element: <AttendanceVolunteer />,
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
                path: 'application-classification',
                element: <ApplicationClassification />,
              },
              {
                path: 'applicant-info',
                element: <ApplicantInfo />,
              },
              {
                path: 'guardian-info',
                element: <GuardianInfo />,
              },
              {
                path: 'middle-school-info',
                element: <MiddleSchoolInfo />,
              },
              {
                path: 'personal-statements',
                element: <PersonalStatements />,
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
        ],
      },
      {
        path: 'submitted',
        element: <Submitted />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404/>,
  },
]);