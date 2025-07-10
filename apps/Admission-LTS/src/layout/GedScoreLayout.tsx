import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { colors, Flex, Text } from '@entry/design-token';
import { ScorePageNav } from '@entry/ui';

export const GedScoreLayout = () => {
  const datas = [
    {
      path: '/',
      name: '검정고시 점수',
    },
    {
      path: '/',
      name: '출석 및 봉사',
    },
  ];
  return (
    <Flex width="100%" height="fit-content" isColumn={true}>
      <TitleContainer>
        <Flex width="fit-content" height="fit-content" isColumn={true} gap={12}>
          <Text fontSize={32} fontWeight={600}>
            3학년 2학기
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
