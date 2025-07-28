import styled from '@emotion/styled';
import { ApplicationNav, usePageData } from '@entry/ui';
import { Flex } from '@entry/design-token';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [datas, _] = usePageData('first');

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname]);

  const pageGraduateRoutes = [
    '/first',
    '/second',
    '/third',
    '/fourth',
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
    <Main ref={mainRef}>
      <Flex isColumn gap={125} height="calc(100vh - 70px)" width="100%">
        <Flex
          isColumn
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          height="100%"
        >
          <Outlet />
          <ApplicationNav
            totalPages={routes.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            graduationType={graduationType}
          />
        </Flex>
      </Flex>
    </Main>
  );
};

const Main = styled.main`
  width: 100vw;
  padding: 40px 160px;
  height: 100%;
  overflow-y: auto;
`;
