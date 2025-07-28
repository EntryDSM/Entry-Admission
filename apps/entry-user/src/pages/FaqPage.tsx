import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { TabSection, PageNav } from '@entry/ui';
import { useNavigate } from 'react-router-dom';

interface FaqItem {
  id: number;
  title: string;
  content: string;
  category: 'admission' | 'career' | 'school' | 'dormitory' | 'etc';
}

const TAB_OPTIONS = [
  { key: 'all', label: '전체' },
  { key: 'admission', label: '입학 문의' },
  { key: 'career', label: '진로' },
  { key: 'school', label: '학교 생활' },
  { key: 'dormitory', label: '기숙사' },
  { key: 'etc', label: '기타' }
];

const CATEGORY_LABELS = {
  admission: '입학 문의',
  career: '진로',
  school: '학교 생활',
  dormitory: '기숙사',
  etc: '기타'
};

export const FaqPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'admission' | 'career' | 'school' | 'dormitory' | 'etc'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const navigate = useNavigate();
  
  const handleFaqClick = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'all' | 'admission' | 'career' | 'school' | 'dormitory' | 'etc');
    setCurrentPage(1);
  };
  
  const faqItems: FaqItem[] = [
    { id: 1, title: '입학 전형 일정은 어떻게 되나요?', content: '2025학년도 입학전형 일정은 다음과 같습니다. 원서접수: 9월 1일~15일, 1차 합격자 발표: 11월 15일, 최종 합격자 발표: 12월 20일입니다.', category: 'admission' },
    { id: 2, title: '기숙사 신청은 언제 하나요?', content: '기숙사 신청은 합격자 발표 후 별도 안내를 통해 진행됩니다. 선착순으로 배정되므로 빠른 신청을 권합니다.', category: 'etc' },
    { id: 3, title: '졸업 후 진로는 어떻게 되나요?', content: '졸업생들의 주요 진로는 대기업 취업, 공무원, 대학원 진학 등이 있으며 취업률은 90% 이상입니다.', category: 'career' },
    { id: 4, title: '동아리 활동은 어떤 것들이 있나요?', content: '학술, 문화, 체육, 봉사 등 다양한 분야의 50여개 동아리가 활동하고 있습니다.', category: 'school' },
    { id: 5, title: '기숙사 생활은 어떤가요?', content: '2인 1실 기준으로 운영되며, 식당, 독서실, 체육시설 등이 완비되어 있습니다.', category: 'dormitory' },
    { id: 6, title: '기숙사 비용은 얼마인가요?', content: '한 학기 기준 120만원이며, 식비는 별도입니다.', category: 'dormitory' },
    { id: 7, title: '기숙사 외박은 가능한가요?', content: '사전 신고를 통해 외박이 가능하며, 월 4회까지 허용됩니다.', category: 'dormitory' },
    { id: 8, title: '기숙사 인터넷은 잘 되나요?', content: '기가급 인터넷이 무료로 제공되며, 와이파이도 전 구역에서 사용 가능합니다.', category: 'dormitory' },
    { id: 9, title: '기숙사 세탁시설은 어떤가요?', content: '각 층마다 세탁기와 건조기가 구비되어 있으며, 무료로 이용 가능합니다.', category: 'dormitory' },
    { id: 10, title: '기숙사 주차는 가능한가요?', content: '신청을 통해 주차 공간을 배정받을 수 있으며, 월 3만원의 비용이 발생합니다.', category: 'dormitory' }
  ];

  const filteredFaqItems = activeTab === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeTab);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredFaqItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredFaqItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleSection>
          <Title>자주 묻는 질문</Title>
          <SubTitle>
            답변 내용은 2025학년도 신입생 전형에 적용되는 내용입니다
          </SubTitle>
        </TitleSection>

        <TabSection
          options={TAB_OPTIONS}
          activeType={activeTab}
          onTypeChange={handleTabChange}
        />

        <TableContainer>
          <TableHeader>
            <ColumnCategory>구분</ColumnCategory>
            <ColumnTitle>제목</ColumnTitle>
          </TableHeader>
          
          <TableBody>
            {currentItems.map((item) => (
              <FaqItemContainer key={item.id}>
                <TableRow 
                  isExpanded={expandedItems.includes(item.id)}
                  onClick={() => handleFaqClick(item.id)}
                >
                  <ColumnCategory>{CATEGORY_LABELS[item.category]}</ColumnCategory>
                  <ColumnTitle>{item.title}</ColumnTitle>
                </TableRow>
                {expandedItems.includes(item.id) && (
                  <AnswerSection>
                    <AnswerLabel>답변</AnswerLabel>
                    <AnswerContent>{item.content}</AnswerContent>
                  </AnswerSection>
                )}
              </FaqItemContainer>
            ))}
          </TableBody>
        </TableContainer>

        <PageNav
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
  margin-bottom: 56px;
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
  margin: 12px 0 0 0;
`;

const TableContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.gray[400]};
  margin: 40px 0 40px 0;
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

const FaqItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div<{ isExpanded: boolean }>`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${colors.gray[200]};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.isExpanded ? colors.orange[300] : 'white'};
  border-top: ${props => props.isExpanded ? `1px solid ${colors.orange[800]}` : 'none'};
  border-bottom: ${props => props.isExpanded ? `1px solid ${colors.orange[800]}` : `1px solid ${colors.gray[200]}`};

  &:hover {
    background-color: ${props => props.isExpanded ? colors.orange[300] : colors.gray[50]};
  }
`;

const AnswerSection = styled.div`
  background-color: ${colors.gray[50]};
  padding: 0;
  border-bottom: 1px solid ${colors.gray[200]};
  display: flex;
  min-height: 220px;
`;

const AnswerLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.gray[600]};
  width: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const AnswerContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.gray[700]};
  flex: 1;
  display: flex;
  align-items: flex-start;
  padding-left: 33px;
  padding-top: 24px;
`;

const ColumnCategory = styled.div`
  width: 150px;
  text-align: center;
  color: ${colors.gray[500]};
`;

const ColumnTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: ${colors.gray[500]};
`;