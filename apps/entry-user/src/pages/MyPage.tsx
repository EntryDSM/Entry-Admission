import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface QuestionItem {
  id: number;
  category: string;
  content: string;
}

export const MyPage = () => {
  const [questions] = useState<QuestionItem[]>([
    { id: 1, category: '입학 문의', content: '안녕하세요' },
    { id: 2, category: '기타', content: '안녕하세요' },
    { id: 3, category: '진로', content: '안녕하세요' }
  ]);

  return (
    <PageContainer>
      <ContentWrapper>
        <UserName>홍길동님</UserName>
        <PhoneNumber>010-0000-0000</PhoneNumber>
        
        <StatusTitle>지원 상태</StatusTitle>
        
        <StatusCard>
          <StatusRow>
            <StatusLabel>일반 전형</StatusLabel>
          </StatusRow>
          <StatusDivider />
          <StatusRow>
            <StatusLabel>지원서 상태:</StatusLabel>
            <StatusValue>제출 완료</StatusValue>
          </StatusRow>
        </StatusCard>

        <ButtonGroup>
          <PrimaryButton>원서 다운로드</PrimaryButton>
          <SecondaryButton>발표 결과 확인</SecondaryButton>
          <CancelButton>원서 작성 제출 취소</CancelButton>
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
            <SettingsButton>비밀번호 변경</SettingsButton>
          </SettingsRow>
          
          <SettingsRow>
            <SettingsLabel>제정</SettingsLabel>
            <SettingsButtonGroup>
              <SettingsButton>로그아웃</SettingsButton>
              <DeleteButton>회원 탈퇴</DeleteButton>
            </SettingsButtonGroup>
          </SettingsRow>
        </SettingsSection>
      </ContentWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 40px 0;
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
  color: ${colors.gray[600]};
`;

const StatusValue = styled.span`
  font-size: 24px;
  color: ${colors.orange[800]};
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: space-between;
  align-items: center;
`;

const PrimaryButton = styled.button`
  background-color: ${colors.orange[800]};
  color: white;
  border: 2px solid ${colors.orange[800]};
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: ${colors.orange[900]};
  }
`;

const SecondaryButton = styled.button`
  background-color: white;
  color: ${colors.orange[800]};
  border: 2px solid ${colors.orange[800]};
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: ${colors.orange[50]};
  }
`;

const CancelButton = styled.button`
  background-color: white;
  color: ${colors.orange[800]};
  border: 2px solid ${colors.orange[800]};
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-left: auto;
  
  &:hover {
    background-color: ${colors.orange[50]};
  }
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

const SettingsButton = styled.button`
  background-color: white;
  color: ${colors.gray[700]};
  border: 2px solid black;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const SettingsButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const DeleteButton = styled.button`
  background-color: white;
  color: ${colors.orange[800]};
  border: 2px solid ${colors.orange[800]};
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: ${colors.orange[50]};
  }
`;
