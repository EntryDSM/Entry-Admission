import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

interface IIdentityVerificationViewType {
  onNext: () => void;
}

export const IdentityVerification = ({
  onNext,
}: IIdentityVerificationViewType) => {
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleVerify = () => {
    console.log('pass 인증 처리 중...');

    // 인증 성공이라 가정하고 업데이트
    setIsVerified(true);
    console.log('pass 인증 완료');
  };

  // 다음 단계로 이동
  const handleNext = () => {
    if (!isVerified) {
      console.log('pass인증이 필요합니다.');
      handleVerify();
    } else {
      onNext();
    }
  };

  return (
    <Container>
      <Title>회원가입을 위한 본인 확인</Title>
      <Description>다음 버튼을 눌러 PASS인증을 받아주세요.</Description>
      <NextButton onClick={handleNext}>다음</NextButton>
    </Container>
  );
};

const NextButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: ${colors.orange[800]};
  color: ${colors.extra.realWhite};
  font-size: 14px;
  font-weight: 550;
  margin-top: 200px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${colors.orange[850]};
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 550;
  color: ${colors.orange[800]};
  margin: 0 15px;
`;

const Description = styled.div`
  font-size: 18px;
  color: ${colors.gray[500]};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 130px;
`;
