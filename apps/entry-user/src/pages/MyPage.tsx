import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { Button, CancelModal, ShowResultModal, PasswordModal, ChangePasswordModal, useModal } from '@entry/ui';
import { getUserInfo, IUserInfoResponseType, deleteUser, changePassword, removeAccessToken, removeRefreshToken } from '@entry/util-config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { usePassVerification } from '../hooks/usePassVerification';
import { getFinalApplicationPdf, deleteApplication, getApplicationStatus, getFirstRoundPass, getSecondRoundPass } from '../apis';
import { useGetAllSchedule } from '../apis/schedule/schedule';
import { ADMISSION_TYPE_LABEL } from '../constants/admissionType';


export const MyPage = () => {
  const [delOpen, setDelOpen] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState<boolean>(false);
  const [cancelApplicationOpen, setCancelApplicationOpen] = useState<boolean>(false);
  const [isPass, setIsPass] = useState<boolean>(false);
  const [announcementStep, setAnnouncementStep] = useState<1 | 2>(1);
  const [remainingTime, setRemainingTime] = useState<string>('');

  const queryClient = useQueryClient();
  const resultModal = useModal();
  const { startVerification, isLoading: isPassLoading, isVerified, verifyData, reset } = usePassVerification();

  const { data: userInfo, isLoading: isUserLoading } = useQuery<IUserInfoResponseType>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  const { data: applicationStatus, isLoading: isApplicationLoading } = useQuery({
    queryKey: ['applicationStatus'],
    queryFn: async () => {
      try {
        return await getApplicationStatus();
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
  });

  const { data: scheduleData } = useGetAllSchedule();

  // 30초마다 일정을 자동으로 조회하여 상태 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
    }, 30000); // 30초마다 갱신

    return () => clearInterval(interval);
  }, [queryClient]);

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('회원 탈퇴가 완료되었습니다.');
      setPasswordModalOpen(false);
      setDelOpen(false);
      window.location.href = 'https://auth.entrydsm.kr';
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || '회원 탈퇴 중 오류가 발생했습니다.');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('비밀번호가 성공적으로 변경되었습니다.');
      setChangePasswordModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.');
    },
  });

  const cancelApplicationMutation = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      toast.success('원서 접수가 취소되었습니다.');
      setCancelApplicationOpen(false);
      // 원서 상태를 다시 조회하여 UI 업데이트
      queryClient.invalidateQueries({ queryKey: ['applicationStatus'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || '원서 취소 중 오류가 발생했습니다.');
    },
  });


  const handleDelClick = () => {
    setDelOpen(true);
  };

  const handlePasswordConfirm = (password: string) => {
    deleteUserMutation.mutate({ password });
  };

  const handleChangePasswordConfirm = (phoneNumber: string, newPassword: string) => {
    changePasswordMutation.mutate({ phoneNumber, newPassword });
  };

  const handleApplicationSubmit = () => {
    window.open('https://admission.entrydsm.kr', '_blank');
  };

  const handleDownloadApplication = async () => {
    try {
      const blob = await getFinalApplicationPdf();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '입학원서.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('원서가 다운로드되었습니다.');
    } catch (error) {
      toast.error('원서 다운로드 중 오류가 발생했습니다.');
      console.error('원서 다운로드 에러:', error);
    }
  };

  const handleCancelApplication = () => {
    cancelApplicationMutation.mutate();
  };

  const handleChangePassword = () => {
    startVerification();
  };

  const handleCheckFirstRoundResult = async () => {
    try {
      const result = await getFirstRoundPass();
      setIsPass(result.isFirstRoundPass);
      setAnnouncementStep(1);
      resultModal.open();
    } catch (error) {
      toast.error('1차 합격 여부 조회 중 오류가 발생했습니다.');
    }
  };

  const handleCheckSecondRoundResult = async () => {
    try {
      const result = await getSecondRoundPass();
      setIsPass(result.finalPass);
      setAnnouncementStep(2);
      resultModal.open();
    } catch (error) {
      toast.error('2차 합격 여부 조회 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (isVerified && verifyData) {
      setChangePasswordModalOpen(true);
    }
  }, [isVerified, verifyData]);

  const handleLogout = () => {
    removeAccessToken()
    removeRefreshToken()
    window.location.href = 'https://entrydsm.kr/';
  };

  // 접수 가능 여부를 시간 기반으로 확인
  const [isApplicationAvailable, setIsApplicationAvailable] = useState<boolean>(false);

  // 접수 종료 시간까지 남은 시간 계산 (1초마다 업데이트)
  useEffect(() => {
    if (!scheduleData?.schedules || applicationStatus) return;

    const calculateRemainingTime = () => {
      const firstAnnouncementSchedule = scheduleData.schedules.find(
        (s) => s.type === 'FIRST_ANNOUNCEMENT'
      );

      if (!firstAnnouncementSchedule) {
        setIsApplicationAvailable(false);
        return;
      }

      const endDate = new Date(firstAnnouncementSchedule.date);
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        setRemainingTime('접수 마감');
        setIsApplicationAvailable(false);
        return;
      }

      // 접수 마감 전이면 접수 가능
      setIsApplicationAvailable(true);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setRemainingTime(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
      } else {
        setRemainingTime(`${hours}시간 ${minutes}분 ${seconds}초`);
      }
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [scheduleData, applicationStatus]);

  if (isUserLoading || isApplicationLoading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <div>로딩 중...</div>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <UserName>{userInfo?.name || '사용자'}님</UserName>
        <PhoneNumber>{userInfo?.phoneNumber || '전화번호 없음'}</PhoneNumber>

        <ApplicationStatusSection>
          <StatusTitle>지원 상태</StatusTitle>
          <StatusBox>
            <ApplicationType>{applicationStatus ? ADMISSION_TYPE_LABEL[applicationStatus.applicationType] : '미지원'}</ApplicationType>
            <Divider />
            <StatusInfo>
              <StatusLabel>지원서 상태 : </StatusLabel>
              <StatusValue isSubmitted={applicationStatus?.isSubmitted || false}>
                {applicationStatus
                  ? (applicationStatus.isPrintedArrived
                      ? '제출 완료 및 원서 학교 도착'
                      : (applicationStatus.isSubmitted ? '제출 완료' : '미제출'))
                  : '미지원'}
              </StatusValue>
              {!applicationStatus && remainingTime && (
                <RemainingTimeText>
                  (접수 마감까지 {remainingTime})
                </RemainingTimeText>
              )}
            </StatusInfo>
          </StatusBox>
        </ApplicationStatusSection>

        <ButtonGroup>
          <Flex width="fit-content" height="fit-content" gap={12}>
            <Button 
              backgroundColor={colors.orange[800]}
              color="#FFFFFF"
              borderColor={colors.orange[800]}
              hoverBackgroundColor={colors.orange[800]}
              onClick={handleDownloadApplication}
            >
              원서 다운로드
            </Button>
            {scheduleData?.currentStatus === 'FIRST_ANNOUNCEMENT' || scheduleData?.currentStatus === 'INTERVIEW' ? (
              <Button
                backgroundColor={colors.gray[50]}
                color={colors.orange[800]}
                borderColor={colors.orange[800]}
                hoverBackgroundColor="transparent"
                onClick={handleCheckFirstRoundResult}
              >
                1차 결과 확인
              </Button>
            ) : scheduleData?.currentStatus === 'SECOND_ANNOUNCEMENT' || scheduleData?.currentStatus === 'END' ? (
              <Button
                backgroundColor={colors.gray[50]}
                color={colors.orange[800]}
                borderColor={colors.orange[800]}
                hoverBackgroundColor="transparent"
                onClick={handleCheckSecondRoundResult}
              >
                2차 결과 확인
              </Button>
            ) : null}
          </Flex>
          {applicationStatus ? (
            <Button
              backgroundColor={colors.gray[50]}
              color={colors.extra.error}
              borderColor={colors.extra.error}
              hoverBackgroundColor="transparent"
              onClick={() => setCancelApplicationOpen(true)}
            >
              원서 최종 제출 취소
            </Button>
          ) : (
            <Button
              backgroundColor={isApplicationAvailable ? colors.gray[50] : colors.gray[200]}
              color={isApplicationAvailable ? colors.orange[800] : colors.gray[400]}
              borderColor={isApplicationAvailable ? colors.orange[800] : colors.gray[400]}
              hoverBackgroundColor="transparent"
              onClick={isApplicationAvailable ? handleApplicationSubmit : undefined}
              disabled={!isApplicationAvailable}
            >
              원서 접수하기
            </Button>
          )}
        </ButtonGroup>

        <SettingsTitle>설정</SettingsTitle>

        <SettingsSection>
          <SettingsRow>
            <SettingsLabel>비밀번호</SettingsLabel>
            <Button
              backgroundColor={colors.gray[50]}
              color={colors.gray[500]}
              borderColor={colors.gray[500]}
              hoverBackgroundColor="transparent"
              onClick={handleChangePassword}
            >
              비밀번호 변경
            </Button>
          </SettingsRow>

          <SettingsRow>
            <SettingsLabel>계정</SettingsLabel>
            <SettingsButtonGroup>
              <Button
                backgroundColor={colors.gray[50]}
                color={colors.gray[500]}
                borderColor={colors.gray[500]}
                hoverBackgroundColor="transparent"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
              <Button
                backgroundColor={colors.gray[50]}
                color={colors.extra.error}
                borderColor={colors.extra.error}
                hoverBackgroundColor="transparent"
                onClick={() => setDelOpen(true)}
              >
                회원 탈퇴
              </Button>
            </SettingsButtonGroup>
          </SettingsRow>
        </SettingsSection>
      </ContentWrapper>
      <CancelModal
        setIsOpen={setDelOpen}
        isOpen={delOpen}
        title="탈퇴하시겠습니까?"
        content="탈퇴 시 모든 정보가 삭제되며, 다시 복구하실 수 없습니다."
        btnText="탈퇴하기"
        onClick={() => {
          setDelOpen(false);
          setPasswordModalOpen(true);
        }}
      />

      <PasswordModal
        setIsOpen={setPasswordModalOpen}
        isOpen={passwordModalOpen}
        title="비밀번호 확인"
        content="회원 탈퇴를 위해 비밀번호를 입력해주세요."
        btnText="탈퇴하기"
        onConfirm={handlePasswordConfirm}
        isLoading={deleteUserMutation.isPending}
      />

      <ChangePasswordModal
        setIsOpen={setChangePasswordModalOpen}
        isOpen={changePasswordModalOpen}
        onConfirm={handleChangePasswordConfirm}
        isLoading={changePasswordMutation.isPending}
        userPhoneNumber={userInfo?.phoneNumber || ''}
        passVerifiedPhoneNumber={verifyData?.phoneNumber || ''}
      />

      <CancelModal
        setIsOpen={setCancelApplicationOpen}
        isOpen={cancelApplicationOpen}
        title="원서 접수를 취소하시겠습니까?"
        content="취소 시 제출된 원서가 삭제되며, 다시 복구하실 수 없습니다."
        btnText="접수 취소"
        onClick={handleCancelApplication}
      />

      <ShowResultModal
        isOpen={resultModal.isOpen}
        onClose={resultModal.close}
        isPass={isPass}
        step={announcementStep}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 40px 0 200px 0;
`;

const ContentWrapper = styled.div`
  width: 1540px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: inherit;
`;

const PhoneNumber = styled.div`
  font-size: 16px;
  color: ${colors.gray[400]};
  margin-top: 12px;
`;


const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const SettingsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: inherit;
  margin: 80px 0 0 0;
`;

const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;

const SettingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SettingsLabel = styled.span`
  font-size: 20px;
  color: inherit;
`;

const SettingsButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ApplicationStatusSection = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatusTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[500]};
  margin: 0;
`;

const StatusBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 40px;
  background-color: ${colors.gray[100]};
  border-radius: 12px;
`;

const ApplicationType = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[300]};
`;

const StatusInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusLabel = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[500]};
`;

const StatusValue = styled.span<{ isSubmitted: boolean }>`
  font-size: 24px;
  font-weight: 600;
  color: ${({ isSubmitted }) => (isSubmitted ? colors.orange[800] : colors.gray[400])};
`;

const RemainingTimeText = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.orange[800]};
  margin-left: 8px;
`;
