import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { colors, Text } from '@entry/design-token';
import { ScorePageNav } from '@entry/ui';

export const GedScoreLayout = () => {
  const datas = [
    {
      path: '/ged/score',
      name: '검정고시 점수',
    },
    {
      path: '/ged/attendance-volunteer',
      name: '출석 및 봉사',
    },
  ];

  const location = useLocation();
  const currentData = datas.find((data) =>
    location.pathname.includes(data.path)
  );

  return (
    <Container>
      <HeaderSection>
        <TitleContainer>
          <Text fontSize={32} fontWeight={600}>
            {currentData ? currentData.name : 'Error'}
          </Text>
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            관련 항목이 없는 경우 ✕ 로 기입하세요.
          </Text>
        </TitleContainer>
        <ScorePageNav datas={datas} />
      </HeaderSection>
      <ContentSection>
        <Outlet />
      </ContentSection>
    </Container>
  );
};

export const GraduateScoreLayout = () => {
  const datas = [
    { path: '/first-graduate', name: '3학년 2학기' },
    { path: '/second-graduate', name: '3학년 1학기' },
    { path: '/third-graduate', name: '2학년 2학기' },
    { path: '/fourth-graduate', name: '2학년 1학기' },
    { path: '/activity-graduate', name: '출석 및 봉사' },
  ];

  const location = useLocation();
  const currentData = datas.find((data) =>
    location.pathname.includes(data.path)
  );

  return (
    <Container>
      <HeaderSection>
        <TitleContainer>
          <Text fontSize={32} fontWeight={600}>
            {currentData ? currentData.name : 'Error'}
          </Text>
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            관련 항목이 없는 경우 ✕ 로 기입하세요.
          </Text>
        </TitleContainer>
        <ScorePageNav datas={datas} />
      </HeaderSection>
      <ContentSection>
        <Outlet />
      </ContentSection>
    </Container>
  );
};

export const ProspectiveGraduateScoreLayout = () => {
  const datas = [
    { path: '/first-prospective-graduate', name: '3학년 1학기' },
    { path: '/second-prospective-graduate', name: '직전 학기' },
    { path: '/third-prospective-graduate', name: '직직전 학기' },
    { path: '/activity-prospective-graduate', name: '출석 및 봉사' },
  ];

  const location = useLocation();
  const currentData = datas.find((data) =>
    location.pathname.includes(data.path)
  );

  return (
    <Container>
      <HeaderSection>
        <TitleContainer>
          <Text fontSize={32} fontWeight={600}>
            {currentData ? currentData.name : 'Error'}
          </Text>
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            관련 항목이 없는 경우 ✕ 로 기입하세요.
          </Text>
        </TitleContainer>
        <ScorePageNav datas={datas} />
      </HeaderSection>
      <ContentSection>
        <Outlet />
      </ContentSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const HeaderSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 36px 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContentSection = styled.div`
  width: 100%;
  padding-bottom: 60px;
`;
