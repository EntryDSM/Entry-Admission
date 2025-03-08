import styled from '@emotion/styled';
import { colors, Flex } from '@entry/design-token';
import { Button, ModalPage, MypageGradient, Title } from '@entry/ui';
import { useState } from 'react';
import { AdmissionResult, SubmissionCanceled } from '../components';

export const Mypage = () => {
  const [isAcceptedShow, setIsAcceptedShow] = useState<boolean>(false);
  const [isRejectedShow, setIsRejectedShow] = useState<boolean>(false);
  const [isCanceledShow, setIsCanceledShow] = useState<boolean>(false);

  const [datas, setDatas] = useState<{
    name: string;
    tel: string;
    birth: string;
    score: string;
    admissionType: string;
    submissionStatus: string;
  }>({
    name: '김대덕',
    tel: '010-1234-1234',
    birth: '08.10.31',
    score: '300',
    admissionType: '일반 전형',
    submissionStatus: '지원서 제출 완료',
  });
  return (
    <Container>
      <Title>마이페이지</Title>
      <Flex gap={40} alignItems="center" width={'auto'}>
        <Flex isColumn={true} gap={24} width={'640px'}>
          <ContentContainer>
            <Flex gap={16} alignItems="center">
              <Img />
              <Flex isColumn={true} gap={4}>
                <Name>
                  <Name isBold={true}>{datas.name}</Name> 님
                </Name>
                <ProfileContent>{datas.tel}</ProfileContent>
                <ProfileContent>{datas.birth}</ProfileContent>
                <ProfileContent>성적 산출 점수: {datas.score}</ProfileContent>
              </Flex>
            </Flex>
          </ContentContainer>
          <ContentContainer>
            <Flex isColumn={true} gap={24}>
              <Flex isColumn={true} gap={12}>
                <ApplicationStatus>지원 상태</ApplicationStatus>
                <Line />
                <Flex isColumn={true} gap={8}>
                  <StatusContent>전형: {datas.admissionType}</StatusContent>
                  <StatusContent>{datas.submissionStatus}</StatusContent>
                </Flex>
              </Flex>
              <Flex gap={12}>
                <Button>원서 다운로드</Button>
                <Button>발표 결과 확인</Button>
                <Button>원서 제출 취소 하기</Button>
              </Flex>
            </Flex>
          </ContentContainer>
        </Flex>
        <Description>
          <DescriptionMain>대덕소프트웨어마이스터고등학교</DescriptionMain>는
          <br />
          내일을 빛낼 <DescriptionMain>인재</DescriptionMain>를 찾고있어요
          <MypageGradient top={'-200px'} right={'-200px'} />
        </Description>
      </Flex>
      <AdmissionResult
        congratulatoryMsg="축하드립니다"
        admissionStatus="합격"
        isShow={isAcceptedShow}
        setIsShow={setIsAcceptedShow}
      />
      <AdmissionResult
        congratulatoryMsg="아쉽지만"
        admissionStatus="불합격"
        isShow={isRejectedShow}
        setIsShow={setIsRejectedShow}
      />
      <SubmissionCanceled
        isShow={isCanceledShow}
        setIsShow={setIsCanceledShow}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
  padding: 50px 100px 60px 100px;
`;

const Description = styled.span`
  position: relative;
  font-size: 28px;
  color: ${colors.gray[800]};
`;
const DescriptionMain = styled.span`
  color: ${colors.orange[600]};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[100]};
`;

const ApplicationStatus = styled.div`
  font-size: 20px;
  color: ${colors.gray[900]};
`;

const StatusContent = styled.div`
  font-size: 16px;
  color: ${colors.gray[600]};
`;

const Img = styled.div`
  min-width: 167px;
  height: 200px;
  border-radius: 8px;
  background-color: ${colors.gray[300]};
`;

const Name = styled.span<{ isBold: boolean }>`
  font-size: 24px;
  font-weight: ${({ isBold }) => (isBold ? 700 : 500)};
  color: ${colors.extra.black};
`;

const ProfileContent = styled(Name)`
  font-size: 16px;
`;

const ContentContainer = styled.div`
  width: 640px;
  padding: 24px;
  border-radius: 16px;
  background-color: ${colors.gray[50]};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.07);
`;
