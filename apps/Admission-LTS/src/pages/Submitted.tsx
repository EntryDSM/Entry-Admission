import { colors, Flex, Text } from '@entry/design-token';
import styled from '@emotion/styled';
import { Button } from '@entry/ui';
import { useEffect, useState } from 'react';
import { useGetSchedule } from '../apis';
import { BeatLoader } from 'react-spinners';

export const Submitted = () => {
  const [resultDate, setResultDate] = useState<string>('')
  
  const {data : scheduleData, isLoading} = useGetSchedule('FIRST_ANNOUNCEMENT')

  const formatDateKorean = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };


  useEffect(() => {
    if (scheduleData) {
      setResultDate(formatDateKorean(scheduleData.date));
    }
  },[scheduleData])


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
          <Text fontSize={20} color={colors.gray[400]}>1차 결과는 {resultDate}에 발표 예정입니다.</Text>
        </Flex>
        <Flex width='100%' height='fit-content' isColumn={true} gap={16}>
          <MsgWrapper>
            마이페이지에서 최종 원서를 출력해,<br/>
            서명과 직인을 찍은 뒤 반드시 본교로 등기우편 발송 또는 방문 접수하세요.
          </MsgWrapper>
          <MsgWrapper>
            마이페이지에서 지원 내역을 확인할 수 있습니다.
            <Button onClick={() => window.location.href = 'https://entrydsm.kr/mypage'}>마이페이지</Button>
          </MsgWrapper>
        </Flex>
        <Button width="100%" onClick={() => window.location.href = 'https://entrydsm.kr'}>홈으로 돌아가기</Button>
      </Flex>
      {isLoading && (
        <LoadingModal>
          <BeatLoader color={colors.orange[800]} />
        </LoadingModal>
      )}
    </Flex>
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
  z-index: 100;
`;


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
