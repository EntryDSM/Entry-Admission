import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { BeatLoader } from 'react-spinners';

interface IGlobalLoaderProps {
  isLoading: boolean;
}

export const GlobalLoader = ({ isLoading }: IGlobalLoaderProps) => {
  if (!isLoading) return null;

  return (
    <LoadingModal>
      <Flex isColumn={true} gap={20} alignItems="center" width="fit-content" height="fit-content">
        <BeatLoader color={colors.orange[800]} />
        <Text fontSize={18} fontWeight={500} color={colors.gray[600]}>로딩 중입니다..</Text>
      </Flex>
    </LoadingModal>
  );
};

const LoadingModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.08);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
