import React from 'react';
import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import {
  BackgroundGradient,
  Button,
  Department,
  EducationalGoal,
} from '@entry/ui';
import { prizeContent } from '../assets';
import { MouImgSlide } from '../components';

export const SchoolDescription = () => {
  return (
    <>
      <Container>
        <Flex gap={52} isColumn={true} position="relative">
          <BackgroundGradient top="-1000px" right="-340px" />
          <TitleContainer>
            <Title isSpan={true}>
              대덕소프트웨어마이스터고등학교만의
              <MainTitle>&nbsp;교육 목표</MainTitle>
            </Title>
            <ContentTitle>
              저희는 열정과 도전으로 가득찬 혁신가를 키웁니다
            </ContentTitle>
          </TitleContainer>
          <BlurContainer>
            <LeftContainer />
            <GoalContentContainer>
              <EducationalGoal
                title="열정"
                content="대덕소프트웨어마이스터고등학교에서는 모든 학생이
코딩과 개발에 자신만의 열정으로 몰입할 수 있도록 합니다"
                iconType="passion"
              />
              <EducationalGoal
                title="도전 정신"
                content="실패를 두려워하지 않는 용기로 실전 프로젝트에 도전하며,
배움과 개선을 통해 성장합니다"
                iconType="challenge"
              />
              <EducationalGoal
                title="자기주도적학습"
                content="빠르게 변화하는 IT 환경에서 스스로 문제를 정의하고
지식을 탐색하며 성장하는 자기주도적 학습자가 됩니다"
                iconType="learning"
              />
              <EducationalGoal
                title="전문성과 창의성"
                content="기술적 전문성과 창의적 문제 해결 능력을 키워
산업 현장에서 혁신적인 솔루션을 제시합니다"
                iconType="creativity"
              />
            </GoalContentContainer>
            <RightContainer />
          </BlurContainer>
        </Flex>
        <Flex gap={52} isColumn={true}>
          <TitleContainer>
            <Title isSpan={true}>
              미래 it인재를 키우기 위한
              <MainTitle>&nbsp;학과 소개</MainTitle>
            </Title>
            <ContentTitle>
              탄탄한 기초 제공으로 실력을 키워나가는 학생들을 육성합니다
            </ContentTitle>
          </TitleContainer>
          <DepartmentMainContainer>
            <Department
              isSide={true}
              title="공통교육과정"
              grade="1학년"
              content="컴퓨터 구조, 프로그래밍(C), 웹 기초, 자료구조, AI 프로그래밍을 배우며 소프트웨어 기본 역량을 키울 수 있습니다"
            />
            <DepartmentSubContainer>
              <Department
                isSide={false}
                title="소프트웨어개발과"
                grade="2학년, 3학년"
                content="SW에 대한 기본적인 이해를 바탕으로 SW 개발 도구 및 기법을 활용해 SW분석, 설계, 구현, 시험, 유지/보수 등의 업무를 수행할 수 있는 응용 SW 개발자 양성을 목표로 한다."
              />
              <Department
                isSide={false}
                title="임베디드소프트웨어과"
                grade="2학년, 3학년"
                content="SW 및 HW에 대한 기본적인 이해를 바탕으로 임베디드SW 구현을 위한 펌웨어/OS시스템/플랫폼/응용 SW의 개발, 시험, 유지･보수를 수행할 수 있는 임베디드SW 개발자 양성을 목표로 합니다"
              />
              <Department
                isSide={false}
                title="인공지능소프트웨어과"
                grade="2학년, 3학년"
                content="인공지능과 빅데이터에 대한 기본적인 이해를 바탕으로 관련 분야 산업수요의 최신 기술을 공부해 주도적인 인공지능 소프트웨어개발자 양성을 목표로 합니다"
              />
            </DepartmentSubContainer>
          </DepartmentMainContainer>
        </Flex>
        <Flex gap={52} isColumn={true}>
          <BackgroundGradient top="1200px" right="340px" />
          <TitleContainer>
            <Title isSpan={true}>지금도 멈추지 않고</Title>
            <Title isSpan={true}>
              꿈을 이루고 있는
              <MainTitle>&nbsp;대덕소프트웨어마이스터고등학교</MainTitle>
            </Title>
            <ContentTitle>
              대덕sw고등학교 학생들은 꾸준히 노력해 높은 취업률을 달성하고,
              <br /> 여러 대회에서 입상해 성장해가고 있습니다
            </ContentTitle>
          </TitleContainer>
          <PrizeContent src={prizeContent} alt="prizeContent" />
        </Flex>
        <Flex gap={52} isColumn={true}>
          <TitleContainer>
            <Title isSpan={true}>대덕소프트웨어마이스터고의</Title>
            <Title isSpan={true}>
              든든한
              <MainTitle>&nbsp;MOU 기업들</MainTitle>
            </Title>
            <ContentTitle>
              350여개에 달하는 기업이 본교에 취업을 의뢰했으며,
              <br /> 매년 학생들의 취업으로 이어지고 있습니다
            </ContentTitle>
          </TitleContainer>
          <MouImgSlide />
        </Flex>
        <Flex
          gap={24}
          isColumn={true}
          alignItems={'center'}
          position="relative"
        >
          <BackgroundGradient top="-1000px" right="-340px" />
          <Flex isColumn={true} alignItems="center">
            <Title isSpan={true}>
              <MainTitle>대덕소프트웨어마이스터고등학교</MainTitle>는&nbsp;
              <MainTitle> 열정</MainTitle>과&nbsp;
              <MainTitle>도전 정신</MainTitle>
              으로 무장한 소프트웨어 인재를 양성합니다.
            </Title>
            <Title isSpan={true}>
              학생들은 기술의 한계를 뛰어넘어&nbsp;
              <MainTitle> 디지털 미래</MainTitle>를 창조할 준비가 되어 있습니다
            </Title>
          </Flex>
          <Button width="312px">학교 설명 보러 가기</Button>
        </Flex>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  padding: 250px 60px;
  gap: 250px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: auto;
`;

const RightContainer = styled.div`
  border-radius: 20px;
  width: 200px;
  height: 190px;
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
`;
const LeftContainer = styled.div`
  border-radius: 20px;
  width: 200px;
  height: 190px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
`;

const PrizeContent = styled.img`
  width: 1200px;
`;

const DepartmentMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const DepartmentSubContainer = styled.div`
  width: auto;
  flex-wrap: wrap;
  display: flex;
  gap: 24px;
  align-items: start;
`;

const GoalContentContainer = styled.div`
  overflow-x: scroll;
  display: flex;
  gap: 24px;
  align-items: center;
`;

const BlurContainer = styled.div`
  position: relative;
`;

const Title = styled.div<{ isSpan: boolean }>`
  display: flex;
  flex-direction: ${({ isSpan }) => (isSpan ? 'row' : 'column')};
  font-size: 32px;
  font-weight: 600;
  color: ${colors.gray[900]};
`;

const MainTitle = styled(Title)`
  color: ${colors.orange[600]};
`;

const ContentTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${colors.gray[500]};
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
`;
