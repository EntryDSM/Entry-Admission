import styled from '@emotion/styled';
import { PinInputGroup } from './PinInputGroup';
import { colors } from '@entry/design-token';
import { useState } from 'react';

interface IPhoneInputType {
  onNext: () => void;
}

export const SmsCodeInput = ({ onNext }: IPhoneInputType) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleComplete = (code: string) => {
    // 인증 코드 더미값
    if (code === '12345678') {
      console.log('인증 성공');
      setErrorMessage('');
    } else {
      setErrorMessage('인증 번호가 올바르지 않습니다.');
    }
  };

  const handleNext = () => {
    if (!errorMessage) {
      onNext();
    }
  };

  return (
    <SmsCodeInputContainer>
      <Discription>문자로 전송된 인증 번호를 입력해주세요!</Discription>
      <PinInputGroup
        length={8}
        onComplete={handleComplete}
        onErrorClear={() => setErrorMessage('')}
        error={errorMessage}
      />
      <NextButton onClick={handleNext}>다음</NextButton>
    </SmsCodeInputContainer>
  );
};

const Discription = styled.div`
  font-size: 16px;
  color: ${colors.gray[400]};
`;

const NextButton = styled.button`
  width: 40%;
  min-width: 300px;
  height: 50px;
  border-radius: 12px;
  background-color: ${colors.orange[800]};
  color: ${colors.extra.realWhite};
  font-size: 14px;
  font-weight: 550;
  margin-top: 130px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${colors.orange[850]};
  }
`;

const SmsCodeInputContainer = styled.div`
  width: 100%;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1065px) {
    width: 70%;
  }
`;
