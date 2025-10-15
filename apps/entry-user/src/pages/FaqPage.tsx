import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { TabSection, PageNav } from '@entry/ui';

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
  { key: 'etc', label: '기타' },
];

const CATEGORY_LABELS = {
  admission: '입학 문의',
  career: '진로',
  school: '학교 생활',
  dormitory: '기숙사',
  etc: '기타',
};

export const FaqPage = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'admission' | 'career' | 'school' | 'dormitory' | 'etc'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const handleFaqClick = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(
      tab as 'all' | 'admission' | 'career' | 'school' | 'dormitory' | 'etc'
    );
    setCurrentPage(1);
  };

  const faqItems: FaqItem[] = [
    {
      id: 1,
      title: '입학 전형 일정은 어떻게 되나요?',
      content:
        '2026학년도 입학전형 일정은 다음과 같습니다. 원서접수: 10월 20일 오전 9시부터 ~ 23일 오후 5시, 1차 합격자 발표: 10월 27일 오후 3시, 2차 전형 면접: 10월 31일, 최종 합격자 발표: 11월 6일 오전 10시 입니다.',
      category: 'admission',
    },
    {
      id: 2,
      title: '합격자 등록은 어떻게 하나요?',
      content:
        '입학동의서를 11월 7일부터 14일 오후 5시 본교 등록 또는 등기 우편으로 제출하면 됩니다. (본교 접수 시간은 오전 10시부터 오후 5시입니다.)',
      category: 'admission',
    },
    {
      id: 3,
      title: '졸업 후 진로는 어떻게 되나요?',
      content:
        '저희 학교와 MOU를 맺은 기업수가 480개가 넘습니다. 졸업생들의 주요 진로는 웹, 앱, 보안, 게임, 임베디드 등 다양한 분야의 스타트업 취업, 대기업 계열사, 공무원, 공기업으로 진출하고 있습니다. 2023년 2월 졸업생 취업률 100%, 2024년 2월 졸업생 취업률 97%, 2025년 2월 졸업생 취업률 70% 입니다.',
      category: 'career',
    },
    {
      id: 4,
      title: '동아리 활동은 어떤 것들이 있나요?',
      content:
        '학술, 문화, 체육, 봉사 등 다양한 분야의 50여개 동아리가 활동하고 있습니다.',
      category: 'school',
    },
    {
      id: 5,
      title: '기숙사 생활은 어떤가요?',
      content: '2인 1실 기준으로 운영되며, 헬스장 등이 완비되어 있습니다.',
      category: 'dormitory',
    },
    {
      id: 6,
      title: '기숙사 비용은 얼마인가요?',
      content: '기숙사 비용은 무료입니다.',
      category: 'dormitory',
    },
    {
      id: 7,
      title: '기숙사 외박은 가능한가요?',
      content: '사전 신고를 통해 외박이 가능합니다.',
      category: 'dormitory',
    },
    {
      id: 8,
      title: '기숙사 인터넷은 잘 되나요?',
      content:
        '인터넷이 무료로 제공되며, 와이파이도 전 구역에서 사용 가능합니다.',
      category: 'dormitory',
    },
    {
      id: 9,
      title: '기숙사 세탁시설은 어떤가요?',
      content:
        '기숙사 건물 2층에 세탁기와 건조기가 구비되어 있으며, 무료로 이용 가능합니다.',
      category: 'dormitory',
    },
    {
      id: 10,
      title: '대학 진학률은 어떻게 되나요?',
      content:
        '저희 학교는 마이스터고등학교로 대학 진학을 위한 커리큘럼이 존재하지 않습니다. 대신 취업 후 3년의 경력을 쌓은 다음 재직자 특별 전형을 이용하여 대학 진학을 준비하기도 합니다. ',
      category: 'career',
    },
  ];

  const filteredFaqItems =
    activeTab === 'all'
      ? faqItems
      : faqItems.filter((item) => item.category === activeTab);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredFaqItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredFaqItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleSection>
          <Title>자주 묻는 질문</Title>
          <SubTitle>
            답변 내용은 2026학년도 신입생 전형에 적용되는 내용입니다
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
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <FaqItemContainer key={item.id}>
                  <TableRow
                    isExpanded={expandedItems.includes(item.id)}
                    onClick={() => handleFaqClick(item.id)}
                  >
                    <ColumnCategory>
                      {CATEGORY_LABELS[item.category]}
                    </ColumnCategory>
                    <ColumnTitle>{item.title}</ColumnTitle>
                  </TableRow>
                  {expandedItems.includes(item.id) && (
                    <AnswerSection>
                      <AnswerLabel>답변</AnswerLabel>
                      <AnswerContent>{item.content}</AnswerContent>
                    </AnswerSection>
                  )}
                </FaqItemContainer>
              ))
            ) : (
              <NoDataRow>자주 묻는 질문이 없습니다.</NoDataRow>
            )}
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

const NoDataRow = styled.div`
  padding: 40px 0;
  text-align: center;
  color: ${colors.gray[400]};
`;

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
  background-color: ${(props) =>
    props.isExpanded ? colors.orange[300] : 'white'};
  border-top: ${(props) =>
    props.isExpanded ? `1px solid ${colors.orange[800]}` : 'none'};
  border-bottom: ${(props) =>
    props.isExpanded
      ? `1px solid ${colors.orange[800]}`
      : `1px solid ${colors.gray[200]}`};

  &:hover {
    background-color: ${(props) =>
      props.isExpanded ? colors.orange[300] : colors.gray[50]};
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
  color: ${colors.gray[500]};
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
  color: ${colors.gray[500]};
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
