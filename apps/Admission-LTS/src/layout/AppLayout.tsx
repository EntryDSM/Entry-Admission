import styled from '@emotion/styled';
import { ApplicationNav, usePageData } from '@entry/ui';
import { Flex } from '@entry/design-token';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [datas, setDatas] = usePageData('first');

  //page 전환 시 스크롤 상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const pageRoutes = [
    '/first',
    '/second',
    '/third',
    '/fourth',
    '/first-graduate',
    '/second-graduate',
    '/third-graduate',
    '/activity',
    '/application-preview',
    '/submit-check',
  ];

  const gedPageRoutes = [
    '/first',
    '/second',
    '/third',
    '/fourth',
    '/ged/score',
    '/application-preview',
    '/submit-check',
  ];

  console.log(datas.graduationType);
  const useGedRoutes = datas.graduationType === '검정고시 (중학교 졸업 학력)';
  const routes = useGedRoutes ? gedPageRoutes : pageRoutes;

  const currentPath = location.pathname;
  const currentIndex = routes.findIndex((path) => currentPath.includes(path));

  const [currentPage, setCurrentPage] = useState(currentIndex + 1 || 1);

  useEffect(() => {
    const path = routes[currentPage - 1];
    if (path && !currentPath.includes(path)) {
      navigate(path);
    }
  }, [currentPage]);

  return (
    <Main>
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
            totalPages={pageRoutes.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Flex>
      </Flex>
    </Main>
  );
};

const Main = styled.main`
  width: 100vw;
  padding: 40px 160px;
`;
