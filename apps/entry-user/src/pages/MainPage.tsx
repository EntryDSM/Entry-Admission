import styled from '@emotion/styled';
import { banner, processLine } from '../assets';
import { colors } from '@entry/design-token';
import {
  BackgroundGradient,
  Button,
  FAQItem,
  ProcessContainer,
} from '@entry/ui';
import { useState } from 'react';

export const MainPage = () => {
  const [datas, setDatas] = useState<{
    date: string;
    faq: [{ title: string; content: string }];
  }>({
    date: '24.10.14 (월) ~ 10.17 (목) 17:00',
    faq: [
      {
        title: '다른 고등학교에서 전학 갈 수 있나요?',
        content:
          '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
      },
      {
        title: '다른 고등학교에서 전학 갈 수 있나요?',
        content:
          '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
      },
      {
        title: '다른 고등학교에서 전학 갈 수 있나요?',
        content:
          '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
      },
      {
        title: '다른 고등학교에서 전학 갈 수 있나요?',
        content:
          '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
      },
      {
        title: '다른 고등학교에서 전학 갈 수 있나요?',
        content:
          '본교는 전입학을 허용하지 않습니다. 즉, 일반계 고등학교 뿐만 아니라 다른 마이스터 고등학교 재학생이라도 전학을 받아주지 않습니다. 따라서 본교에는 신입생으로만 입학할 수 있습니다.',
      },
    ],
  });
  return (
    <MainContainer>
      <BannerContainer imgUrl={banner}>
        <BannerContentContainer>
          <BannerTitleContainer>
            <BannerTitle>
              대덕소프트웨어마이스터고는 지금, IT 업계를 선도할
              <BannerMainTitle>미래 인재</BannerMainTitle>를 모집하고 있어요!
            </BannerTitle>
            <Date>{datas.date}</Date>
          </BannerTitleContainer>
          <Button width="269px">아직 지원 기간이 아닙니다</Button>
        </BannerContentContainer>
      </BannerContainer>
      <ProcessContentContainer>
        <BackgroundGradient top="-1400px" left="10px" />
        <ProcessLine src={processLine} />
        <ProcessContainer
          title="원서 접수"
          time="17:00"
          date="24.10.14 (월) ~ 10.17 (목)"
          iconType="application"
          top="200px"
          left="280px"
        />
        <ProcessContainer
          title="1차 합격자 발표"
          time="15:00"
          date="24.10.21 (월)"
          iconType="firstStageResults"
          top="200px"
          left="800px"
        />
        <ProcessContainer
          title="적성검사, 심층 면접"
          date="24.10.25 (금)"
          iconType="interview"
          top="530px"
          left="1100px"
        />
        <ProcessContainer
          title="최종 합격자 발표"
          time="10:00"
          date="24.10.31 (목)"
          iconType="finalResults"
          top="530px"
          left="600px"
        />
        <ProcessContainer
          title="합격자 등록"
          time="17:00"
          date="24.11.1 (금) ~ 11.8 (금)"
          iconType="registration"
          top="830px"
          left="900px"
        />
        <ProcessContainer
          title="건강검진 결과 제출"
          date="24.11.1 (금) ~ 11.16 (토)"
          iconType="healthCheck"
          top="830px"
          left="400px"
        />
        <Title>
          대덕소프트웨어마이스터고등학교
          <MainTitle>2026 신입생 모집 절차</MainTitle>
        </Title>
      </ProcessContentContainer>
      <FAQContainer>
        <Title>
          <SubMainTitle>더 궁금한 점이 있다면?</SubMainTitle>
          자주 묻는 질문
        </Title>
        <FAQItemContainer>
          {datas.faq.map((data, index) => (
            <FAQItem
              number={'0' + (index + 1)}
              title={data.title}
              content={data.content}
            />
          ))}
        </FAQItemContainer>
      </FAQContainer>
      <ViewMoreContainer>
        <BackgroundGradient top="-1000px" right="200px" />
        <Title isSpan={true}>
          <MainTitle>대덕소프트웨어마이스터고</MainTitle>가 더 궁금하다면?
        </Title>
        <Button width="312px">학교 설명 보러 가기</Button>
      </ViewMoreContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const ViewMoreContainer = styled.div`
  position: relative;
  margin: 125px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const FAQItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 100px;
`;

const FAQContainer = styled.div`
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 52px;
`;

const ProcessLine = styled.img`
  position: absolute;
  z-index: 1;
  top: 300px;
`;

const BannerContainer = styled.div<{ imgUrl: string }>`
  width: 100%;
  height: 794px;
  background-image: url(${({ imgUrl }) => imgUrl});
  margin-bottom: 125px;
`;

const ProcessContentContainer = styled.div`
  width: 100%;
  height: 841px;
  position: relative;
`;

const BannerTitle = styled.div`
  font-size: 54px;
  font-weight: 700;
  color: ${colors.gray[50]};
`;

const BannerMainTitle = styled(BannerTitle)`
  color: ${colors.orange[500]};
`;

const Date = styled.div`
  font-size: 20px;
  font-weight: 300;
  color: ${colors.gray[50]};
`;

const BannerTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;

const BannerContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
  position: absolute;
  top: 176px;
  left: 240px;
`;

const Title = styled.div<{ isSpan: boolean }>`
  display: flex;
  flex-direction: ${({ isSpan }) => !isSpan && 'column'};
  margin-left: 120px;
  font-size: 36px;
  font-weight: 600;
  color: ${colors.gray[900]};
`;

const MainTitle = styled(Title)`
  color: ${colors.orange[600]};
  margin-left: 0;
`;

const SubMainTitle = styled(MainTitle)`
  font-size: 24px;
  margin-bottom: 8px;
`;
