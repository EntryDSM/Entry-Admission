import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import {
  EntryAuthTitle,
  SelectUser,
  ProgressIndicator,
  IdentityVerification,
  UserInfoInput,
} from '../components';

export const SignUpPage = () => {
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
        return '70%';
      case 2:
        return '45%';
      case 3:
        return '50%';
      default:
        return '70%';
    }
  };

  // 회원가입 완료 시 해당 컴포넌트 호출
  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <SelectUser onNext={handleNextStep} />;
      case 2:
        return <IdentityVerification onNext={handleNextStep} />;
      case 3:
        return <UserInfoInput />;
      default:
        return null;
    }
  };

  return (
    <BackGroundWrapper>
      <SignUpPageContainer $width={containerWidth()}>
        <EntryAuthTitle children="EntryDSM 회원가입" />
        {renderContent()}
        <ProgressIndicatorWrapper>
          <ProgressIndicator
            totalSteps={totalSteps}
            currentStep={currentStep}
          />
        </ProgressIndicatorWrapper>
      </SignUpPageContainer>
    </BackGroundWrapper>
  );
};

const ProgressIndicatorWrapper = styled.div`
  margin-top: 90px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const SignUpPageContainer = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width || '70%'};
  height: 80%;
  min-width: 400px;
  background-color: ${colors.extra.realWhite};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  margin-bottom: 30px;
`;

const BackGroundWrapper = styled.div`
  background-color: ${colors.gray[50]};
  padding-top: 35px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
`;
