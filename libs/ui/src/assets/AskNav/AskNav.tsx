import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { Question } from '@entry/ui';
import { useEffect, useState } from 'react';

interface INavType {
  tabTitle: string;
}

interface IQuestion {
  tabTitle: string;
  content: string;
  answer?: string;
}

interface IAskNavProps {
  tabs: INavType[];
  questions: IQuestion[];
  isQuestion?: boolean;
}

export const AskNav = ({ tabs, questions, isQuestion }: IAskNavProps) => {
  // nav 타이틀에 의해 필터된 질문들
  const [filteredQuestions, setFilteredQuestions] =
    useState<IQuestion[]>(questions);

  // 현재 nav 타이틀
  const [activeTitle, setActiveTitle] = useState<string>(tabs[0].tabTitle);

  useEffect(() => {
    if (activeTitle === '전체') {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(
        questions.filter((question) => question.tabTitle === activeTitle)
      );
    }
  }, [activeTitle, questions]);

  return (
    <Flex height="auto" width="100%" gap={10} isColumn={true}>
      <Flex width="100%" height="auto" alignItems="center">
        {/* 탭 네비게이션 */}
        {tabs.map((tab) => (
          <Tab
            $isActive={activeTitle === tab.tabTitle}
            onClick={() => setActiveTitle(tab.tabTitle)}
            key={tab.tabTitle}
          >
            {tab.tabTitle}
          </Tab>
        ))}
      </Flex>

      {/* 질문s */}
      {isQuestion && (
        <Flex
          width="80%"
          height="auto"
          isColumn={true}
          paddingTop="30px"
          style={{ minWidth: '500px' }}
        >
          <TitleElement>
            <Sortation>구분</Sortation>
            <Sortation>제목</Sortation>
          </TitleElement>
          <Flex width="100%" height="auto" isColumn={true}>
            {filteredQuestions.map((question, index) => (
              <Question
                key={`${question.tabTitle}-${index}`}
                tabTitle={question.tabTitle}
                content={question.content}
                answer={question.answer}
              />
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

const Sortation = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 18px;
  width: 130px;
  justify-content: center;
`;

const TitleElement = styled.div`
  border-block: 1px solid ${colors.gray[400]};
  display: flex;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  padding: 8px 16px;
  font-size: 18px;
  color: ${({ $isActive }) =>
    $isActive ? colors.orange[800] : colors.gray[300]};
  border-radius: 12px;
  background-color: ${({ $isActive }) =>
    $isActive ? colors.orange[300] : colors.extra.realWhite};
  transition: background-color 0.5s, color 0.5s;

  &:hover {
    background-color: ${colors.orange[300]};
    color: ${colors.orange[800]};
  }
`;
