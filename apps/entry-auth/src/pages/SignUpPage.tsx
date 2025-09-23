import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import {
  EntryAuthTitle,
  SelectUser,
  ProgressIndicator,
  IdentityVerification,
} from '../components';

export const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 2;

  const handleNextStep = () => {
    if (currentStep < 2) setCurrentStep((prev) => prev + 1);
  };

  const handlePassVerificationComplete = (data: {
    phoneNumber: string;
    name: string;
  }) => {
    console.log('PASS 인증 완료:', data);
  };

  const containerWidth = () => (currentStep === 2 ? '45%' : '70%');
  const containerHeight = () => 'auto';

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <SelectUser onNext={handleNextStep} />;
      case 2:
        return <IdentityVerification onNext={handlePassVerificationComplete} />;
      default:
        return null;
    }
  };

  return (
    <BackGroundWrapper>
      <SignUpPageContainer
        $width={containerWidth()}
        $height={containerHeight()}
      >
        <EntryAuthTitle isAdmin={false} children="EntryDSM 회원가입" />
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
  margin-top: 40px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const SignUpPageContainer = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || '70%'};
  height: ${({ $height }) => $height || 'auto'};
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
  height: calc(100vh - 70px);
`;
