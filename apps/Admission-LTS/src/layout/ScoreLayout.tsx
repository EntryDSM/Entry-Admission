import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { colors, Flex, Text } from '@entry/design-token';
import { ScorePageNav } from '@entry/ui';

export const ScoreLayout = () => {
  const datas = [
    {
      path: '/first-expected-graduate',
      name: '3학년 1학기',
    },
    {
      path: '/second-expected-graduate',
      name: '직전 학기',
    },
    {
      path: '/third-expected-graduate',
      name: '직직전 학기',
    },
    {
      path: '/activity',
      name: '출석 및 봉사',
    },
  ];

  const location = useLocation();

  const currentData = datas.find((data) =>
    location.pathname.includes(data.path)
  );

  return (
    <Flex width="100%" height="fit-content" isColumn={true}>
      <TitleContainer>
        <Flex width="fit-content" height="fit-content" isColumn={true} gap={12}>
          <Text fontSize={32} fontWeight={600}>
            {currentData ? currentData.name : 'Error'}
          </Text>
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            관련 항목이 없는 경우 ✕ 로 기입하세요.
          </Text>
        </Flex>
        <ScorePageNav datas={datas} />
      </TitleContainer>
      <Main>
        <Outlet />
      </Main>
    </Flex>
  );
};

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 36px 0px;
`;

const Main = styled.main`
  width: 100%;
  margin: 40px 0 60px 0;
`;
