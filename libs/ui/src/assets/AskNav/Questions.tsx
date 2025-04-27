import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { useState } from 'react';

interface IQuestion {
  tabTitle: string;
  content: string;
  answer?: string;
}

export const Question = ({ tabTitle, content, answer }: IQuestion) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <QuestionContainer
        $clicked={clicked}
        onClick={() => setClicked(!clicked)}
      >
        <TitleContainer $clicked={clicked}>{tabTitle}</TitleContainer>
        <ContentContainer $clicked={clicked}>{content}</ContentContainer>
      </QuestionContainer>

      <AnswerWrapper $clicked={clicked}>
        <AnswerContainer $clicked={clicked}>
          <AnswerTitle>답변</AnswerTitle>
          <QuestionWrapper>{answer}</QuestionWrapper>
        </AnswerContainer>
      </AnswerWrapper>
    </>
  );
};

const QuestionWrapper = styled.div`
  padding: 1.2% 0;
  margin-left: 15px;
`;

const AnswerTitle = styled.div`
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
`;

const AnswerWrapper = styled.div<{ $clicked: boolean }>`
  max-height: ${({ $clicked }) => ($clicked ? '500px' : '0')};
  opacity: ${({ $clicked }) => ($clicked ? '1' : '0')};
  background-color: ${colors.gray[50]};
  transition: max-height 0.4s ease-in-out, opacity 0.3s ease-in-out;
  overflow: hidden;
  width: 100%;
`;

const AnswerContainer = styled.div<{ $clicked: boolean }>`
  display: flex;
  border-bottom: 1px solid ${colors.gray[200]};
`;

const TitleContainer = styled.div<{ $clicked: boolean }>`
  width: 130px;
  min-width: 130px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $clicked }) =>
    $clicked ? colors.orange[800] : colors.extra.realBlack};

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ContentContainer = styled.div<{ $clicked: boolean }>`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ $clicked }) =>
    $clicked ? colors.orange[800] : colors.extra.realBlack};
  transition: color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 0 5px;
  }
`;

const QuestionContainer = styled.div<{ $clicked: boolean }>`
  display: flex;
  width: 100%;
  height: 60px;
  border-block: 1px solid
    ${({ $clicked }) => ($clicked ? colors.orange[800] : colors.gray[200])};
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: ${({ $clicked }) =>
    $clicked ? colors.orange[300] : colors.extra.realWhite};
  cursor: pointer;

  &:hover {
    background-color: ${colors.orange[300]};
    & > * {
      color: ${colors.orange[800]};
    }
  }

  @media (max-width: 768px) {
    height: 50px;
  }

  @media (max-width: 480px) {
    height: 40px;
  }
`;
