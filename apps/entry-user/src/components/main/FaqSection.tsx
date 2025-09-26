import styled from '@emotion/styled';
import { useState } from 'react';
import { colors } from '@entry/design-token';
import { upArrowIcon, downArrowIcon, MoveRightArrow } from '../../assets';
import { useNavigate } from 'react-router-dom';

const faqList = [
  {
    question: '다른 고등학교에서 전학 갈 수 있나요?',
    answer:
      '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
  },
  {
    question: '기숙사 탈출하면 벌점 몇 점인가요?',
    answer:
      '학교 내부 규정에 따라 상벌점이 책정되며, 기숙사 무단이탈 시 큰 벌점이 부여됩니다.',
  },
  {
    question: '내신 몇 %여야 합격할 수 있나요?',
    answer:
      '매년 변동이 있으나, 전교 상위권의 내신을 유지하는 것이 유리합니다.',
  },
  {
    question: '의이잉 어차피 멘티생기는데 디자인 해야하나요?',
    answer: '디자인 관련 프로젝트가 있을 수 있으므로, 준비해두면 좋습니다.',
  },
  {
    question: '공평하게 모두가 함께 디자인하는 거 어떻게 생각하시나요?',
    answer:
      '협업 능력을 중요하게 생각하며, 함께 디자인하는 과정을 통해 실력을 쌓을 수 있습니다.',
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <SectionWrapper>
      <QuestionMent>궁금한 점이 있다면?</QuestionMent>
      <TitleWrapper>
        <Title>자주 묻는 질문</Title>
        <MoveButton onClick={() => navigate('/faq')}>
          이동하기
          <MoveRightArrow />
        </MoveButton>
      </TitleWrapper>
      <FaqList>
        {faqList.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <FaqItem
              key={index}
              onClick={() => toggleIndex(index)}
              isOpen={isOpen}
            >
              <QuestionWrapper>
                <Question>
                  <Number isOpen={isOpen}>{`0${index + 1}`}</Number>
                  {faq.question}
                </Question>
                <Icon src={isOpen ? upArrowIcon : downArrowIcon} alt="toggle" />
              </QuestionWrapper>
              <AnswerWrapper isOpen={isOpen}>
                <Answer>{faq.answer}</Answer>
              </AnswerWrapper>
            </FaqItem>
          );
        })}
      </FaqList>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  max-width: 1050px;
  margin: 80px auto;
  padding: 0 20px;
`;

const QuestionMent = styled.div`
  font-size: 18px;
  color: ${colors.orange[800]};
  font-weight: 800;
  margin-bottom: 18px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.gray[500]};
  margin: 0;
`;

const MoveButton = styled.button`
  padding: 8px 16px;
  color: ${colors.gray[300]};
  background: none;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 7px;

  &:hover {
    color: ${colors.gray[400]};

    svg {
      fill: ${colors.gray[400]};
    }
  }

  svg {
    fill: ${colors.gray[300]};
    transition: fill 0.2s ease;
  }
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FaqItem = styled.div<{ isOpen: boolean }>`
  background-color: ${({ isOpen }) => (isOpen ? '#fff5f0' : colors.gray[100])};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1.5px solid ${colors.gray[100]};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ isOpen }) =>
      isOpen ? '#fff5f0' : colors.gray[200]};
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Question = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray[500]};
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const AnswerWrapper = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Answer = styled.div`
  padding-top: 16px;
  font-size: 15px;
  color: ${colors.gray[500]};
  line-height: 1.6;
  border-top: 1px solid ${colors.orange[400]};
  width: 93%;
  margin: 16px auto 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Number = styled.span<{ isOpen: boolean }>`
  color: ${({ isOpen }) => (isOpen ? colors.orange[800] : colors.gray[400])};
  font-weight: 700;
  font-size: 22px;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;
