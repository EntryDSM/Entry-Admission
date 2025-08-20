import { colors, Flex, Text } from '@entry/design-token';
import { Button } from '@entry/ui';
import { useNavigate } from 'react-router';

export const Page404 = () => {
  const navigate = useNavigate()
  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex
        width="100%"
        height="fit-content"
        isColumn={true}
        gap={154}
        alignItems="center"
      >
        <Flex
          width="fit-content"
          height="fit-content"
          isColumn={true}
          gap={40}
          alignItems="center"
        >
          <Text fontSize={120} fontWeight={900} color={colors.orange[800]}>
            404
          </Text>
          <Text fontSize={28} color={colors.gray[400]}>
            예기치 못한 오류가 발생했습니다.
          </Text>
        </Flex>
        <Button onClick={() => navigate(-1)}>이전 페이지로 나가기</Button>
      </Flex>
    </Flex>
  );
};
