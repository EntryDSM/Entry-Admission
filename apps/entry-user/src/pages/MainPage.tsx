import styled from '@emotion/styled';
import { banner, processLine } from '../assets';
import { colors } from '@entry/design-token';
import {
  BackgroundGradient,
  Button,
  ChatButtonContainer,
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

  const videoClick = () => {
    window.location.href = 'https://www.youtube.com/watch?v=d70Snj2wTmY';
  };
  return (
    <MainContainer>
      <BannerContainer imgUrl={banner}>
        <BannerContentContainer>
          <BannerTitleContainer>
            <BannerTitle>
              대덕소프트웨어마이스터고는 지금, <br /> IT 업계를 선도할
              <BannerMainTitle> 미래 인재</BannerMainTitle>를 모집하고 있어요!
            </BannerTitle>
            <Date>{datas.date}</Date>
          </BannerTitleContainer>
          <Button width="269px">아직 지원 기간이 아닙니다</Button>
        </BannerContentContainer>
        <ChatButtonContainer chatClick={'ㅇ'} videoClick={videoClick} />
      </BannerContainer>
      <ProcessContentContainer>
        <BackgroundGradient top="-1400px" left="10px" />
        <Title>
          대덕소프트웨어마이스터고등학교
          <MainTitle>2026 신입생 모집 절차</MainTitle>
        </Title>
        <ProcessImg src={processLine} />
      </ProcessContentContainer>
      <FAQContainer>
        <Title>
          <SubMainTitle>더 궁금한 점이 있다면?</SubMainTitle>
          자주 묻는 질문
        </Title>
        <FAQItemContainer>
          {datas.faq.map((data, index) => (
            <FAQItem
              key={index}
              number={(index + 1).toString().padStart(2, '0')}
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

const ProcessImg = styled.img`
  width: 100%;
`;

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 125px;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 52px;
`;

const BannerContainer = styled.div<{ imgUrl: string }>`
  width: 100%;
  height: 920px;
  background-image: url(${({ imgUrl }) => imgUrl});
`;

const ProcessContentContainer = styled.div`
  width: 100%;
  height: 841px;
  display: flex;
  flex-direction: column;
  gap: 52px;
  align-items: start;
`;

const BannerTitle = styled.span`
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
  left: 140px;
`;

const Title = styled.div<{ isSpan: boolean }>`
  display: flex;
  flex-direction: ${({ isSpan }) => (isSpan ? 'row' : 'column')};
  font-size: 36px;
  font-weight: 600;
  color: ${colors.gray[900]};
  padding: 0 100px;
`;

const MainTitle = styled(Title)`
  color: ${colors.orange[600]};
  padding: 0;
`;

const SubMainTitle = styled(MainTitle)`
  font-size: 24px;
`;
