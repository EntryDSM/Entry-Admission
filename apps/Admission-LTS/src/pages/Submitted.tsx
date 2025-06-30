import { colors, Flex, Text } from '@entry/design-token';
import styled from '@emotion/styled';

export const Submitted = () => {
  return (
    <Flex
      width="100%"
      height="100vh"
      paddingTop="100px"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        width="fit-content"
        height="584px"
        isColumn={true}
        justifyContent="space-between"
      >
        <Flex
          width="fit-content"
          height="fit-content"
          isColumn={true}
          alignItems="center"
          gap={140}
        >
          <Flex
            width="fit-content"
            height="fit-content"
            isColumn={true}
            alignItems="center"
            gap={16}
          >
            <Text fontSize={32} fontWeight={700}>
              지원서 제출이 완료되었습니다!
            </Text>
            <Text fontSize={20} color={colors.gray[400]}>
              마이페이지에서 지원 내역을 확인할 수 있습니다
            </Text>
          </Flex>
          <Flex
            width="fit-content"
            height="fit-content"
            isColumn={true}
            alignItems="center"
            gap={4}
          >
            <Text fontSize={20} color={colors.gray[400]}>
              1차 결과는 10월 24일 18:00에 발표 예정입니다.
            </Text>
            <Text fontSize={20} color={colors.orange[800]}>
              최종 원서를 출력해 서명과 직인을 찍은 뒤 반드시 본교로 발송 또는
              방문 접수하세요.
            </Text>
          </Flex>
        </Flex>
        <Button>마이페이지로 이동</Button>
      </Flex>
    </Flex>
  );
};

const Button = styled.button`
  border-radius: 12px;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.orange[800]};
  color: ${colors.orange[800]};
  font-size: 20px;
  background-color: ${colors.extra.realWhite};
  cursor: pointer;
`;
