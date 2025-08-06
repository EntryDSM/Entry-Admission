import styled from '@emotion/styled';
import { ApplicationNav, usePageData } from '@entry/ui';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [datas, _] = usePageData('first');

  const pageGraduateRoutes = [
    '/first',
    '/second',
    '/third',
    '/fourth',
    '/fifth',
    '/first-graduate',
    '/second-graduate',
    '/third-graduate',
    '/fourth-graduate',
    '/activity-graduate',
    '/application-preview',
    '/submit-check',
  ];

  const pageProspectiveGraduateRoutes = [
    '/first',
    '/second',
    '/third',
    '/fourth',
    '/fifth',
    '/first-prospective-graduate',
    '/second-prospective-graduate',
    '/third-prospective-graduate',
    '/activity-prospective-graduate',
    '/application-preview',
    '/submit-check',
  ];

  const gedPageRoutes = [
    '/first',
    '/second',
    '/third',
    '/fourth',
    '/fifth',
    '/ged/score',
    '/ged/attendance-volunteer',
    '/application-preview',
    '/submit-check',
  ];

  const { graduationType } = datas;

  const routes = (() => {
    if (graduationType === '검정고시 (중학교 졸업 학력)') {
      return gedPageRoutes;
    }
    if (graduationType === '졸업 예정') {
      return pageProspectiveGraduateRoutes;
    }
    if (graduationType === '졸업') {
      return pageGraduateRoutes;
    }
    return [];
  })();

  const currentPath = location.pathname;
  const currentIndex = routes.findIndex((path) => currentPath.includes(path));
  const [currentPage, setCurrentPage] = useState(currentIndex + 1 || 1);

  useEffect(() => {
    const path = routes[currentPage - 1];
    if (path && !currentPath.includes(path)) {
      navigate(path);
    }
  }, [currentPage, routes, currentPath, navigate]);

  return (
    <Main>
      <Outlet />
      <ApplicationNav
        totalPages={routes.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        graduationType={graduationType}
      />
    </Main>
  );
};

const Main = styled.div`
  width: 100vw;
  padding: 40px 160px;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
`;
