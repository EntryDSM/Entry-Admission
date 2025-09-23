import { useEffect } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { usePassVerification } from '../../hooks/usePassVerification';

interface IIdentityVerificationViewType {
  onNext: (verifyData: { phoneNumber: string; name: string }) => void;
}

export const IdentityVerification = ({
  onNext,
}: IIdentityVerificationViewType) => {
  const { startVerification, isLoading, isVerified, verifyData } =
    usePassVerification();

  useEffect(() => {
    if (isVerified && verifyData) {
      console.log('PASS 인증 완료, 자동으로 다음 단계로 이동:', verifyData);
      onNext(verifyData);
    }
  }, [isVerified, verifyData, onNext]);

  return (
    <Container>
      <Title>회원가입을 위한 본인 확인</Title>
      <Description>다음 버튼을 눌러 PASS 인증을 받아주세요.</Description>
      <NextButton
        onClick={startVerification}
        disabled={isLoading || isVerified}
      >
        {isLoading ? '인증 중...' : '다음'}
      </NextButton>
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
  margin-top: 60px;
  overflow: hidden;
`;
