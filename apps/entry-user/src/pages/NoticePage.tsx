import { useState } from 'react';
import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { MainButton, SubButton } from '@entry/ui';

// 데이터 타입 정의
interface NoticeItem {
  id: number;
  title: string;
  date: string;
  isNew: boolean;
}

export const NoticePage = () => {
  const [activeTab, setActiveTab] = useState<'admission' | 'orientation'>('admission');
  
  // 목업 데이터
  const noticeItems: NoticeItem[] = [
    { id: 1, title: '안녕하세요', date: '2024-10-31', isNew: true },
    { id: 2, title: '안녕하세요', date: '2024-10-31', isNew: true },
    { id: 3, title: '안녕하세요', date: '2024-10-31', isNew: true },
    { id: 4, title: '안녕하세요', date: '2024-10-31', isNew: false },
    { id: 5, title: '안녕하세요', date: '2024-10-31', isNew: false },
    { id: 6, title: '안녕하세요', date: '2024-10-31', isNew: false },
    { id: 7, title: '안녕하세요', date: '2024-10-31', isNew: false },
    { id: 8, title: '안녕하세요', date: '2024-10-31', isNew: false },
    { id: 9, title: '안녕하세요', date: '2024-10-31', isNew: false },
    { id: 10, title: '안녕하세요', date: '2024-10-31', isNew: false },
  ];

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleSection>
          <Text fontSize={28} fontWeight={700}>공지 사항</Text>
          <SubTitle fontSize={14} color={colors.gray[400]}>
            학교에서 게시한 입학 공지사항을 확인하세요
          </SubTitle>
        </TitleSection>

        <TabSection>
          <TabButton 
            isActive={activeTab === 'admission'} 
            onClick={() => setActiveTab('admission')}
          >
            입학 공지사항
          </TabButton>
          <TabButton 
            isActive={activeTab === 'orientation'} 
            onClick={() => setActiveTab('orientation')}
          >
            예비 신입생 안내
          </TabButton>
        </TabSection>

        <TableContainer>
          <TableHeader>
            <ColumnNum>구분</ColumnNum>
            <ColumnTitle>제목</ColumnTitle>
            <ColumnDate>작성일</ColumnDate>
          </TableHeader>
          
          <TableBody>
            {noticeItems.map((item) => (
              <TableRow key={item.id}>
                <ColumnNum>{item.id}</ColumnNum>
                <ColumnTitle>
                  {item.isNew && <NewIcon>🔸</NewIcon>}
                  {item.title}
                </ColumnTitle>
                <ColumnDate>{item.date}</ColumnDate>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
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
  width: 1200px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
`;

const TitleSection = styled.div`
  margin-bottom: 16px;
`;

const TabSection = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const TabButton = styled.div<{ isActive: boolean }>`
  padding: 12px 24px;
  background-color: ${({ isActive }) => isActive ? colors.orange[800] : colors.gray[100]};
  color: ${({ isActive }) => isActive ? colors.extra.realWhite : colors.gray[400]};
  border-radius: 8px 8px 0 0;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ isActive }) => isActive ? colors.orange[850] : colors.gray[200]};
  }
`;

const TableContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.gray[200]};
`;

const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.gray[200]};
  padding: 16px 0;
  font-weight: 600;
  font-size: 15px;
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

const ColumnNum = styled.div`
  width: 100px;
  text-align: center;
  color: ${colors.gray[500]};
`;

const ColumnTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: ${colors.gray[500]};
`;

const ColumnDate = styled.div`
  width: 150px;
  text-align: center;
  color: ${colors.gray[400]};
`;

const NewIcon = styled.span`
  color: ${colors.orange[800]};
  margin-right: 8px;
  font-size: 14px;
`;

const SubTitle = styled(Text)`
  margin-top: 8px;
`;
