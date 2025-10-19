import { colors, Flex, Text } from '@entry/design-token';
import { Button, EntryLogo } from '@entry/ui';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllSchedule, useGetApplicationStatus } from '../apis';
import { getUserInfo } from '@entry/util-config';
import { toast } from 'react-toastify';
import { GlobalLoader } from '../components';

export const Landing = () => {

  const [networkLoading, setNetWorkLoading] = useState<boolean>(false)
  useEffect(() => {
    const handleOffline = () => {
      toast.error('네트워크 상태가 불안정합니다. 연결을 확인해주세요.');
      setNetWorkLoading(true)
    };

    const handleOnline = () => {
      toast.success('네트워크가 연결되었습니다.');
      setNetWorkLoading(false)
      window.location.reload()
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // 최초 로드 시 네트워크 상태 확인
    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const [name, setName] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [scheduleDatas, setScheduleDatas] = useState<{startDate: string, endDate: string, resultDate: string}>({
    startDate: '',
    endDate: '',
    resultDate: ''
  })
  const navigate = useNavigate();

  const {data : scheduleData, isLoading} = useGetAllSchedule()

  const {data : statusData, isLoading : statusLoading} = useGetApplicationStatus()
  
    useEffect(() => {
      if (!statusLoading && statusData?.isSubmitted) {
        alert('이미 제출된 원서가 있습니다.')
        window.location.href = 'https://entrydsm.kr/';
      }
    }, [statusData, statusLoading]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleStartClick = () => {
    if (!scheduleData?.schedules) {
      toast.error('일정 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const startDateSchedule = scheduleData.schedules.find(
      (s) => s.type === 'START_DATE'
    );
    const endDateSchedule = scheduleData.schedules.find(
      (s) => s.type === 'END_DATE'
    );

    if (!startDateSchedule || !endDateSchedule) {
      toast.error('일정 정보를 확인할 수 없습니다.');
      return;
    }

    const startDate = new Date(startDateSchedule.date);
    const endDate = new Date(endDateSchedule.date);
    const now = new Date();

    // 접수 시작 전
    if (now < startDate) {
      toast.error('아직 접수 기간이 아닙니다.');
      setTimeout(() => {
        window.location.href = 'https://entrydsm.kr/';
      }, 1500);
      return;
    }

    // 접수 마감 후
    if (now > endDate) {
      toast.error('접수 기간이 종료되었습니다.');
      setTimeout(() => {
        window.location.href = 'https://entrydsm.kr/';
      }, 1500);
      return;
    }

    // 접수 기간 내
    navigate('/application-classification');
  };

  
  const findDate = (type: string) =>
    scheduleData?.schedules.find((s: any) => s.type === type)?.date || "";
  
  const formatDate = (date: string) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  useEffect(() => {
    setScheduleDatas({
      startDate: formatDate(findDate('START_DATE')),
      endDate: formatDate(findDate('END_DATE')),
      resultDate: formatDate(findDate('FIRST_ANNOUNCEMENT'))
    });
  }, [scheduleData])


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setName(userInfo.name);
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        setName('지원자');
      }
    };

    fetchUserInfo();
  }, [])

  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          fontSize: '20px',
          color: '#333',
          textAlign: 'center',
        }}
      >
        모바일에서는 접근할 수 없습니다.
      </div>
    );
  }
  return (
    <Flex
      width="100%"
      height="calc(100vh - 70px)"
      isColumn={true}
      alignItems="center"
      gap={60}
      justifyContent="center"
    >
      <Flex
        width="560px"
        height="fit-content"
        isColumn={true}
        alignItems="center"
        gap={48}
      >
        <Flex
          isColumn={true}
          alignItems="center"
          width="fit-content"
          height="fit-content"
          gap={32}
        >
          <EntryLogo width={65} height={75} />
          <Text textAlign="center" width="450px" fontSize={32} fontWeight={700}>
            대덕소프트웨어마이스터고등학교 입학 원서 접수
          </Text>
        </Flex>
        <Flex
          isColumn={true}
          alignItems="center"
          width="fit-content"
          height="fit-content"
          gap={24}
        >
          <ContentContainer>
            <Text fontSize={18} fontWeight={500}>
              전형 정보-인적사항-자기소개서 및 학업계획서-성적 입력의 순서로
              진행됩니다.
            </Text>
          </ContentContainer>
          <ContentContainer>
            <Text fontSize={18} fontWeight={500}>
              원서 접수는{' '}
              <Text
                isSpan={true}
                fontSize={18}
                fontWeight={500}
                color={colors.orange[800]}
              >
                {scheduleDatas.startDate}
              </Text>
              부터{' '}
              <Text
                isSpan={true}
                fontSize={18}
                fontWeight={500}
                color={colors.orange[800]}
              >
                {scheduleDatas.endDate}
              </Text>
              까지 진행되며, 결과 발표는{' '}
              <Text
                isSpan={true}
                fontSize={18}
                fontWeight={500}
                color={colors.orange[800]}
              >
                {scheduleDatas.resultDate}{' '}
              </Text>
              입니다.
            </Text>
          </ContentContainer>
          <ContentContainer>
            <Text fontSize={18} fontWeight={500}>
              현재
              <Text
                isSpan={true}
                fontSize={18}
                fontWeight={500}
                color={colors.orange[800]}
              >
                {' '}
                {name}
              </Text>{' '}
              지원자님 계정으로 로그인되어 있습니다.
            </Text>
          </ContentContainer>
          <ContentContainer>
            <Text fontSize={18} fontWeight={500}>
              마이페이지에서 최종 원서를 출력해,<br/>
              서명과 직인을 찍은 뒤 반드시 본교로 등기우편 발송 또는 방문 접수하세요.
            </Text>
          </ContentContainer>
        </Flex>
        <Button width="100%" onClick={handleStartClick}>
          원서 접수 시작
        </Button>
      </Flex>
      <GlobalLoader isLoading={isLoading || statusLoading || networkLoading} />
    </Flex>
  );
};


const ContentContainer = styled.div`
  width: 100%;
  padding: 19px 70px;
  border-radius: 8px;
  background-color: ${colors.gray[50]};
`;