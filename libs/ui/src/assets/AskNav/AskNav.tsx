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
  }, [activeTitle]);

  return (
    <Flex height="45px" gap={10} isColumn={true}>
      <Flex>
        {/* 탭 네비게이션 */}
        {tabs.map((tab) => (
          <Tab
            $clicked={activeTitle === tab.tabTitle}
            onClick={() => {
              setActiveTitle(tab.tabTitle);
            }}
            key={tab.tabTitle}
          >
            {tab.tabTitle}
          </Tab>
        ))}
      </Flex>

      {/* 질문s */}
      {isQuestion && (
        <QuestionContainer>
          <TitleElement>
            <Sortation>구분</Sortation>
            <Sortation>제목</Sortation>
          </TitleElement>
          {filteredQuestions.map((question) => (
            <Question
              key={question.tabTitle}
              tabTitle={question.tabTitle}
              content={question.content}
              answer={question.answer}
            />
          ))}
        </QuestionContainer>
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

const QuestionContainer = styled.div`
  margin-top: 30px;
  width: 80%;
  min-width: 500px;
`;

const Tab = styled.div<{ $clicked: boolean }>`
  padding: 8px 16px;
  font-size: 18px;
  color: ${colors.gray[400]};
  border-radius: 12px;
  background-color: ${({ $clicked }) =>
    $clicked ? colors.orange[300] : colors.extra.realWhite};
  color: ${({ $clicked }) =>
    $clicked ? colors.orange[800] : colors.gray[300]};

  &:hover {
    background-color: ${colors.orange[300]};
    color: ${colors.orange[800]};
    transition-duration: 0.5s;
  }
`;
