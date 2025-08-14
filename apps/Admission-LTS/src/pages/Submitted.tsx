import { colors, Flex, Text } from '@entry/design-token';
import styled from '@emotion/styled';
import { Button } from '@entry/ui';

export const Submitted = () => {
  return (
    <Flex
      width="100%"
      height="calc(100vh - 100px)"
      justifyContent="center"
      alignItems="center"
    >
      <Flex width='40%' height='fit-content' isColumn={true} gap={60}>
        <Flex isColumn={true} gap={16} width='fit-content' height='fit-content'>
          <Text fontSize={32} fontWeight={600}>지원서 제출이 완료되었습니다!</Text>
          <Text fontSize={20} color={colors.gray[400]}>1차 결과는 10월 24일 18:00에 발표 예정입니다.</Text>
        </Flex>
        <Flex width='100%' height='fit-content' isColumn={true} gap={16}>
          <MsgWrapper>
            최종 원서를 출력해,<br/>
            서명과 직은을 찍은 뒤 반드시 본교로 발송 또는 방문 접수하세요.
          </MsgWrapper>
          <MsgWrapper>
            마이페이지에서 지원 내역을 확인할 수 있습니다.
            <Button>마이페이지</Button>
          </MsgWrapper>
        </Flex>
        <Button width="100%">홈으로 돌아가기</Button>
      </Flex>
    </Flex>
  );
};

const MsgWrapper = styled.div `
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${colors.gray[50]};
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
