import styled from '@emotion/styled';
import { useState } from 'react';
import { colors } from '@entry/design-token';
import { upArrowIcon, downArrowIcon, MoveRightArrow } from '../../assets';
import { useNavigate } from 'react-router-dom';

const faqList = [
  {
    question: '입학 전형 일정은 어떻게 되나요?',
    answer:
      '2026학년도 입학전형 일정은 다음과 같습니다. 원서접수: 10월 20일 오전 9시부터 ~ 23일 오후 5시, 1차 합격자 발표: 10월 27일 오후 3시, 2차 전형 면접: 10월 31일, 최종 합격자 발표: 11월 6일 오전 10시 입니다.',
  },
  {
    question: '합격자 등록은 어떻게 하나요?',
    answer:
      '입학동의서를 11월 7일부터 14일 오후 5시 본교 등록 또는 등기 우편으로 제출하면 됩니다. (본교 접수 시간은 오전 10시부터 오후 5시입니다.)',
  },
  {
    question: '졸업 후 진로는 어떻게 되나요?',
    answer:
      '저희 학교와 MOU를 맺은 기업수가 480개가 넘습니다. 졸업생들의 주요 진로는 웹, 앱, 보안, 게임, 임베디드 등 다양한 분야의 스타트업 취업, 대기업 계열사, 공무원, 공기업으로 진출하고 있습니다. 2023년 2월 졸업생 취업률 100%, 2024년 2월 졸업생 취업률 97%, 2025년 2월 졸업생 취업률 70% 입니다.',
  },
  {
    question: '동아리 활동은 어떤 것들이 있나요?',
    answer:
      '학술, 문화, 체육, 봉사 등 다양한 분야의 50여개 동아리가 활동하고 있습니다.',
  },
  {
    question: '기숙사 생활은 어떤가요?',
    answer: '2인 1실 기준으로 운영되며, 헬스장 등이 완비되어 있습니다.',
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
