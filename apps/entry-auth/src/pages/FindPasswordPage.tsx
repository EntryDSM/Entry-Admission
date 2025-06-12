import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import {
  ChangePassword,
  EntryAuthTitle,
  PhoneInput,
  ProgressIndicator,
  SmsCodeInput,
} from '../components';

export const FindPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 각 컴포넌트 width 설정
  const containerWidth = (): string => {
    switch (currentStep) {
      case 1:
        return '50%';
      case 2:
        return '50%';
      case 3:
        return "45%"
      default:
        return '70%';
    }
  };

  // 각 컴포넌트 height 설정
  const containerHeight = (): string => {
    switch (currentStep) {
      case 1:
        return '90%';
      case 2:
        return '100%';
      case 3:
        return '110%';
      default:
        return '90%';
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <PhoneInput onNext={handleNextStep} />;
      case 2:
        return <SmsCodeInput onNext={handleNextStep} />;
      case 3:
        return <ChangePassword />;
      default:
        return null;
    }
  };

  return (
    <BackGroundWrapper>
      <FindPWPageContainer
        $width={containerWidth()}
        $height={containerHeight()}
      >
        <EntryAuthTitle children="EntryDSM 비밀번호 찾기" />
        {renderContent()}
        <ProgressIndicatorWrapper>
          <ProgressIndicator
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
        </ProgressIndicatorWrapper>
      </FindPWPageContainer>
    </BackGroundWrapper>
  );
};

const ProgressIndicatorWrapper = styled.div`
  margin-top: 90px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const FindPWPageContainer = styled.div<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width || '70%'};
  height: ${({ $height }) => $height || '90%'};
  min-width: 400px;
  background-color: ${colors.extra.realWhite};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  margin-top: 35px;
  margin-bottom: 30px;
  padding-bottom: 20px;
`;

const BackGroundWrapper = styled.div`
  position: relative;
  background-color: ${colors.gray[50]};
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  width: 100%;
`;
