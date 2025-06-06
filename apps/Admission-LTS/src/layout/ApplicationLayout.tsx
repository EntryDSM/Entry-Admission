import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { PreviousButton } from '@entry/ui';
import { Flex, Text } from '@entry/design-token';

export const ApplicationLayout = () => {
  return (
    <Flex width="100%" height="fit-content">
      <Main>
        <Flex isColumn={true} gap={125} height="fit-content" width="100%">
          <Flex
            isColumn={true}
            gap={60}
            width="100%"
            alignItems="fit-content"
            height="fit-content"
          >
            <Flex
              width="100%"
              height="fit-content"
              justifyContent="space-between"
            >
              <Text fontSize={32} fontWeight={600}>
                지원자 전형 구분
              </Text>
              <PreviousButton>임시 저장</PreviousButton>
            </Flex>
            <Outlet />
          </Flex>
        </Flex>
      </Main>
    </Flex>
  );
};

const Main = styled.main`
  margin-top: 70px;
  width: 100%;
`;
