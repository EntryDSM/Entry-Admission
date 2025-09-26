import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { Button, CancelModal, ShowResultModal, PasswordModal, useModal } from '@entry/ui';
import { getUserInfo, IUserInfoResponseType, deleteUser } from '@entry/util-config';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface QuestionItem {
  id: number;
  category: string;
  content: string;
}

interface ApplicationStatus {
  type: string;
  status: string;
}

export const MyPage = () => {
  const [cancelSubmitOpen, setCancelSubmitOpen] = useState<boolean>(false);
  const [delOpen, setDelOpen] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [questions] = useState<QuestionItem[]>([
    { id: 1, category: '입학 문의', content: '지원서 작성 중 문의사항이 있습니다.' },
    { id: 2, category: '기타', content: '기숙사 관련 질문입니다.' },
    { id: 3, category: '진로', content: '입학 후 진로에 대해 궁금합니다.' },
  ]);

  const resultModal = useModal();

  // 사용자 정보 조회
  const { data: userInfo, isLoading: isUserLoading } = useQuery<IUserInfoResponseType>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });

  // 임시 지원 상태 (실제로는 API에서 가져와야 함)
  const [applicationStatus] = useState<ApplicationStatus>({
    type: '일반 전형',
    status: '제출 완료'
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

  const handleCancelSubmitClick = () => {
    // TODO: 제출 취소 API 연동
    console.log('제출 취소 API 호출');
  };

  const handleDelClick = () => {
    setDelOpen(true);
  };

  const handlePasswordConfirm = (password: string) => {
    deleteUserMutation.mutate({ password });
  };

  const handleCheckResult = () => {
    // TODO: 결과 확인 API 연동
    console.log('결과 확인 API 호출');
    resultModal.open();
  };

  const handleDownloadApplication = () => {
    // TODO: 원서 다운로드 API 연동
    console.log('원서 다운로드 API 호출');
  };

  const handleChangePassword = () => {
    // TODO: 비밀번호 변경 페이지로 이동
    console.log('비밀번호 변경 페이지로 이동');
  };

  const handleLogout = () => {
    // TODO: 로그아웃 API 연동
    console.log('로그아웃 API 호출');
    window.location.href = '/logout';
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

        <StatusTitle>지원 상태</StatusTitle>

        <StatusCard>
          <StatusRow>
            <StatusLabel>{applicationStatus.type}</StatusLabel>
          </StatusRow>
          <StatusDivider />
          <StatusRow>
            <StatusSubLabel>지원서 상태:</StatusSubLabel>
            <StatusValue>{applicationStatus.status}</StatusValue>
          </StatusRow>
        </StatusCard>

        <ButtonGroup>
          <Flex width="fit-content" height="fit-content" gap={12}>
            <Button onClick={handleDownloadApplication}>원서 다운로드</Button>
            <Button
              backgroundColor={colors.gray[50]}
              color={colors.orange[800]}
              borderColor={colors.orange[800]}
              hoverBackgroundColor="transparent"
              onClick={handleCheckResult}
            >
              발표 결과 확인
            </Button>
          </Flex>
          <Button
            backgroundColor={colors.gray[50]}
            color={colors.extra.error}
            borderColor={colors.extra.error}
            hoverBackgroundColor="transparent"
            onClick={() => setCancelSubmitOpen(true)}
          >
            원서 작성 제출 취소
          </Button>
        </ButtonGroup>

        <QuestionsTitle>작성한 질문</QuestionsTitle>

        <QuestionsTable>
          <TableHeader>
            <ColumnCategory>구분</ColumnCategory>
            <ColumnContent>제목</ColumnContent>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <ColumnCategory>{question.category}</ColumnCategory>
                <ColumnContent>{question.content}</ColumnContent>
              </TableRow>
            ))}
          </TableBody>
        </QuestionsTable>

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
        setIsOpen={setCancelSubmitOpen}
        isOpen={cancelSubmitOpen}
        title="제출 취소하시겠습니까?"
        content="제출 취소 시 모든 정보가 삭제되며, 다시 복구하실 수 없습니다."
        btnText="제출 취소"
        onClick={handleCancelSubmitClick}
      />
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

const StatusTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: inherit;
  margin: 24px 0 0 0;
`;

const StatusCard = styled.div`
  background-color: ${colors.gray[50]};
  border-radius: 8px;
  padding: 20px 40px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
`;

const StatusDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[300]};
  margin: 4px 0;
`;

const StatusLabel = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.gray[500]};
`;

const StatusSubLabel = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const StatusValue = styled.span`
  font-size: 24px;
  color: ${colors.orange[800]};
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: space-between;
  align-items: center;
`;

const QuestionsTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: inherit;
  margin: 137px 0 0 0;
`;

const QuestionsTable = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.gray[200]};
  margin-top: 40px;
  background-color: white;
`;

const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.gray[200]};
  padding: 16px 0;
  font-weight: 600;
  font-size: 24px;
  background-color: white;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${colors.gray[200]};
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: white;

  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const ColumnCategory = styled.div`
  width: 150px;
  text-align: center;
  color: ${colors.gray[500]};
  font-size: 24px;
`;

const ColumnContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: ${colors.gray[500]};
  font-size: 24px;
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
