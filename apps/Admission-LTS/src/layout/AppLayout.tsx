import styled from '@emotion/styled';
import { canProceedToNext, ApplicationNav, usePageData, useApplicationData } from '@entry/ui';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [datas] = usePageData('applicationClassification');
  const { state } = useApplicationData(); // 전체 상태 가져오기

  const pageGraduateRoutes = [
    '/application-classification','/applicant-info','/guardian-info','/middle-school-info','/personal-statements',
    '/first-graduate','/second-graduate','/third-graduate','/fourth-graduate','/activity-graduate',
    '/application-preview','/submit-check',
  ];

  const pageProspectiveGraduateRoutes = [
    '/application-classification','/applicant-info','/guardian-info','/middle-school-info','/personal-statements',
    '/first-prospective-graduate','/second-prospective-graduate','/third-prospective-graduate','/activity-prospective-graduate',
    '/application-preview','/submit-check',
  ];

  const gedPageRoutes = [
    '/application-classification','/applicant-info','/guardian-info','/personal-statements',
    '/ged/score','/ged/attendance-volunteer','/application-preview','/submit-check',
  ];

  const graduationType = datas?.graduationType;

  const routes = (() => {
    if (graduationType === '검정고시 (중학교 졸업 학력)') return gedPageRoutes;
    if (graduationType === '졸업 예정') return pageProspectiveGraduateRoutes;
    if (graduationType === '졸업') return pageGraduateRoutes;
    return [];
  })();

  const currentPath = location.pathname;
  const currentIndex = routes.findIndex(path => currentPath.includes(path));
  const [currentPage, setCurrentPage] = useState(currentIndex >= 0 ? currentIndex + 1 : 1);

  useEffect(() => {
    const path = routes[currentPage - 1];
    if (path && !currentPath.includes(path)) {
      navigate(path);
    }
  }, [currentPage, routes, currentPath, navigate]);

  // 페이지 유효성 검사
  const validateCurrentPage = (targetPage: number) => {
    const currentRoute = routes[currentPage - 1];
    if (!currentRoute) return { canProceed: true };
    return canProceedToNext(state, currentRoute);
  };

  return (
    <Main>
      <Outlet />
      <ApplicationNav
        totalPages={routes.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        graduationType={graduationType}
        validateCurrentPage={validateCurrentPage}
        toast={(msg) => toast.error(msg)}
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