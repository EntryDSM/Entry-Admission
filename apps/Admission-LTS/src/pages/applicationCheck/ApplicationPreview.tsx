import { colors, Flex, Skeleton, Text } from '@entry/design-token';
import { useState } from 'react';
import styled from '@emotion/styled';

export const ApplicationPreview = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <Container>
      <Flex width="fit-content" height="fit-content" isColumn={true} gap={12}>
        <Text fontSize={20} fontWeight={400} color={colors.gray[400]}>
          대덕소프트웨어마이스터고등학교
        </Text>
        <Text fontSize={32} fontWeight={600}>
          지원서 미리보기
        </Text>
      </Flex>
      {isLoading ? (
        <ApplicationLoadingContainer>
          <Text fontSize={20} color={colors.gray[400]}>
            지원서 페이지를 로딩중입니다..
          </Text>
        </ApplicationLoadingContainer>
      ) : (
        <Flex width="100%" height="fit-content" isColumn={true}>
          <ApplicationTitle>입학원서 미리보기</ApplicationTitle>
          <ApplicationContainer>
            <ApplicationContent></ApplicationContent>
          </ApplicationContainer>
        </Flex>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
`;

const ApplicationTitle = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${colors.gray[500]};
  padding-left: 48px;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: ${colors.extra.realWhite};
`;
const ApplicationContainer = styled.div`
  width: 100%;
  background-color: ${colors.gray[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 104px 140px;
  box-sizing: border-box;
`;

const ApplicationContent = styled.div`
  width: 100%;
  max-width: 794px;
  aspect-ratio: 210 / 297;
  background-color: ${colors.extra.realWhite};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 1024px) {
    max-width: 100%;
    aspect-ratio: auto;
    height: auto;
  }
`;

const ApplicationLoadingContainer = styled(Skeleton)`
  width: 100%;
  height: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
