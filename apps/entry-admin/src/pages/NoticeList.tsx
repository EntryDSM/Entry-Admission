import { useState } from 'react';
import styled from '@emotion/styled';
import { colors, Flex, Text } from '@entry/design-token';
import { Button, TabSection } from '@entry/ui';
import { useNavigate } from 'react-router-dom';

interface NoticeItem {
  id: number;
  title: string;
  category: 'admission' | 'orientation';
  date: string;
}

const TAB_OPTIONS = [
  { key: 'admission', label: '입학 공지사항' },
  { key: 'orientation', label: '예비 신입생 안내' },
];

const mockNotices: NoticeItem[] = [
  {
    id: 1,
    title: '2025학년도 신입생 오리엔테이션 안내',
    category: 'admission',
    date: '2024-10-31',
  },
  {
    id: 2,
    title: '입학 관련 서류 제출 안내',
    category: 'admission',
    date: '2024-10-30',
  },
  {
    id: 3,
    title: '예비 신입생 사전 교육 일정',
    category: 'orientation',
    date: '2024-10-29',
  },
];

export const NoticeList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'admission' | 'orientation'>('admission');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'admission' | 'orientation');
  };

  const handleCreateClick = () => {
    navigate('/notice/create');
  };

  const handleEditClick = (id: number) => {
    navigate(`/notice/edit/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      console.log('Delete notice:', id);
    }
  };

  const filteredNotices = mockNotices.filter(notice => notice.category === activeTab);

  return (
    <Container>
      <Flex isColumn={true} gap={24} width="100%" height="fit-content">
        <HeaderSection>
          <Text fontSize={32} fontWeight={600} color={colors.gray[400]}>
            공지사항 관리
          </Text>
          <Button
            backgroundColor="#22c55e"
            hoverBackgroundColor="#16a34a"
            onClick={handleCreateClick}
          >
            공지사항 작성
          </Button>
        </HeaderSection>

        <TabSection
          isAdmin={true}
          activeType={activeTab}
          onTypeChange={handleTabChange}
          options={TAB_OPTIONS}
        />

        <NoticeTable>
          <TableHeader>
            <HeaderColumn width="80px">번호</HeaderColumn>
            <HeaderColumn flex={1} justifyLeft>제목</HeaderColumn>
            <HeaderColumn width="120px">작성일</HeaderColumn>
            <HeaderColumn width="140px">관리</HeaderColumn>
          </TableHeader>

          <TableBody>
            {filteredNotices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell width="80px">{notice.id}</TableCell>
                <TableCell flex={1} justifyLeft>
                  <TitleCell>
                    {notice.title}
                  </TitleCell>
                </TableCell>
                <TableCell width="120px">{notice.date}</TableCell>
                <TableCell width="140px">
                  <ActionButtons>
                    <ActionButton
                      onClick={() => handleEditClick(notice.id)}
                      color="#3b82f6"
                    >
                      수정
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleDeleteClick(notice.id)}
                      color="#ef4444"
                    >
                      삭제
                    </ActionButton>
                  </ActionButtons>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </NoticeTable>

        {filteredNotices.length === 0 && (
          <EmptyState>
            <Text fontSize={16} color={colors.gray[400]}>
              등록된 공지사항이 없습니다.
            </Text>
          </EmptyState>
        )}
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const NoticeTable = styled.div`
  width: 100%;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: flex;
  background-color: ${colors.gray[50]};
  border-bottom: 1px solid ${colors.gray[300]};
  padding: 16px;
`;

const HeaderColumn = styled.div<{ width?: string; flex?: number; justifyLeft?: boolean }>`
  ${({ width }) => width && `width: ${width};`}
  ${({ flex }) => flex && `flex: ${flex};`}
  display: flex;
  align-items: center;
  justify-content: ${({ justifyLeft }) => justifyLeft ? 'flex-start' : 'center'};
  font-size: 16px;
  font-weight: 600;
  color: ${colors.gray[400]};
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${colors.gray[200]};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const TableCell = styled.div<{ width?: string; flex?: number; justifyLeft?: boolean }>`
  ${({ width }) => width && `width: ${width};`}
  ${({ flex }) => flex && `flex: ${flex};`}
  display: flex;
  align-items: center;
  justify-content: ${({ justifyLeft }) => justifyLeft ? 'flex-start' : 'center'};
  font-size: 14px;
  color: ${colors.gray[400]};
`;

const TitleCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
  width: 100%;
  padding-left: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ color: string }>`
  padding: 6px 12px;
  background-color: white;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ color }) => color};
    color: white;
  }
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
`;
