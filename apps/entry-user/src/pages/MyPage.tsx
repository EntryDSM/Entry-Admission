import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { Button, CancelModal, ShowResultModal, PasswordModal, ChangePasswordModal, useModal } from '@entry/ui';
import { getUserInfo, IUserInfoResponseType, deleteUser, changePassword, removeAccessToken, removeRefreshToken } from '@entry/util-config';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';


export const MyPage = () => {
  const [delOpen, setDelOpen] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState<boolean>(false);

  const resultModal = useModal();

  // 사용자 정보 조회
  const { data: userInfo, isLoading: isUserLoading } = useQuery<IUserInfoResponseType>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });


  // 회원 탈퇴 API
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('회원 탈퇴가 완료되었습니다.');
      setPasswordModalOpen(false);
      setDelOpen(false);
      // 로그아웃 처리
      window.location.href = '/logout';
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || '회원 탈퇴 중 오류가 발생했습니다.');
    },
  });

  // 비밀번호 변경 API
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
    // 원서 접수 페이지로 이동
    window.open('https://admission.entrydsm.kr', '_blank');
  };

  const handleDownloadApplication = async () => {
    // try {
    //   const response = await TestInstance.get('/application/pdf', {
    //     responseType: 'blob',
    //   });

    //   // Blob으로 파일 다운로드 처리
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', '입학원서.pdf');
    //   document.body.appendChild(link);
    //   link.click();
    //   link.remove();
    //   window.URL.revokeObjectURL(url);

    //   toast.success('원서가 다운로드되었습니다.');
    // } catch (error) {
    //   toast.error('원서 다운로드 중 오류가 발생했습니다.');
    //   console.error('원서 다운로드 에러:', error);
    // }
    toast.info('원서 다운로드 기능이 일시적으로 비활성화되었습니다.');
  };

  const handleChangePassword = () => {
    setChangePasswordModalOpen(true);
  };

  const handleLogout = () => {
    // TODO: 로그아웃 API 연동
    // console.log('로그아웃 API 호출');
    removeAccessToken()
    removeRefreshToken()
    window.location.href = 'https://entrydsm.kr/';
  };

  if (isUserLoading) {
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


        <ButtonGroup>
          <Flex width="fit-content" height="fit-content" gap={12}>
            <Button onClick={handleDownloadApplication}>원서 다운로드</Button>
            <Button
              backgroundColor={colors.gray[50]}
              color={colors.orange[800]}
              borderColor={colors.orange[800]}
              hoverBackgroundColor="transparent"
              onClick={handleApplicationSubmit}
            >
              원서 접수하기
            </Button>
          </Flex>
          <Button
            backgroundColor={colors.gray[100]}
            color={colors.gray[400]}
            borderColor={colors.gray[300]}
            hoverBackgroundColor={colors.gray[100]}
            disabled
          >
            원서 작성 제출 취소
          </Button>
        </ButtonGroup>

        <EmptyQuestionsArea />

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
            <SettingsLabel>제정</SettingsLabel>
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
      />

      <ShowResultModal
        isOpen={resultModal.isOpen}
        onClose={resultModal.close}
        isPass={true}
        step={1}
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

const QuestionsTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: inherit;
  margin: 137px 0 0 0;
`;


const SettingsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: inherit;
  margin: 142px 0 0 0;
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

const EmptyQuestionsArea = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  border: 1px solid white;
  border-radius: 8px;
  margin-top: 40px;
`;
