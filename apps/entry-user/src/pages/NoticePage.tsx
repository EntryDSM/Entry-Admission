import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { NoticePinIcon, TabSection } from '@entry/ui';
import { useNavigate } from 'react-router-dom';
import { useGetAllNotice } from '../apis';

interface NoticeItem {
  id: number;
  title: string;
  createdAt: string;
  isPinned: boolean;
  type: 'GUIDE' | 'NOTICE';
}

const TAB_OPTIONS = [
  { key: 'NOTICE', label: '입학 공지사항' },
  { key: 'GUIDE', label: '예비 신입생 안내' },
];

const formatDate = (dateString: string) => dateString.split('T')[0];

export const NoticePage = () => {
  const [activeTab, setActiveTab] = useState<'NOTICE' | 'GUIDE'>('NOTICE');
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllNotice(activeTab);

  const handleNoticeClick = (id: number) => navigate(`/notice/${id}`);
  const handleTabChange = (tab: string) =>
    setActiveTab(tab as 'NOTICE' | 'GUIDE');

  const noticeItems = useMemo(() => {
    return (
      data?.notices?.map((notice: NoticeItem) => ({
        ...notice,
        createdAt: formatDate(notice.createdAt),
      })) ?? []
    );
  }, [data]);

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleSection>
          <Title>공지 사항</Title>
          <SubTitle>학교에서 게시한 입학 공지사항을 확인하세요</SubTitle>
        </TitleSection>

        <Flex gap={40} isColumn={true} width="100%" height="auto">
          <TabSection
            options={TAB_OPTIONS}
            activeType={activeTab}
            onTypeChange={handleTabChange}
          />

          <TableContainer>
            <TableHeader>
              <ColumnNum>구분</ColumnNum>
              <ColumnTitle>제목</ColumnTitle>
              <ColumnDate>작성일</ColumnDate>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <LoadingRow>로딩 중...</LoadingRow>
              ) : noticeItems.length > 0 ? (
                noticeItems.map((item: NoticeItem) => (
                  <TableRow
                    key={item.id}
                    onClick={() => handleNoticeClick(item.id)}
                  >
                    <ColumnNum>공지</ColumnNum>
                    <ColumnTitle>
                      {item.isPinned && (
                        <NewIconWrapper>
                          <NoticePinIcon />
                        </NewIconWrapper>
                      )}
                      {item.title}
                    </ColumnTitle>
                    <ColumnDate>{item.createdAt}</ColumnDate>
                  </TableRow>
                ))
              ) : (
                <NoDataRow>공지사항이 없습니다.</NoDataRow>
              )}
            </TableBody>
          </TableContainer>
        </Flex>
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

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: inherit;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: ${colors.gray[400]};
  margin: 12px 0 40px 0;
`;

const TableContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.gray[400]};
`;

const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.gray[400]};
  padding: 16px 0;
  font-weight: 600;
  font-size: 15px;
  background-color: white;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${colors.gray[200]};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const LoadingRow = styled.div`
  padding: 40px 0;
  text-align: center;
  color: ${colors.gray[400]};
`;

const NoDataRow = styled.div`
  padding: 40px 0;
  text-align: center;
  color: ${colors.gray[400]};
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

const NewIconWrapper = styled.span`
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
`;
