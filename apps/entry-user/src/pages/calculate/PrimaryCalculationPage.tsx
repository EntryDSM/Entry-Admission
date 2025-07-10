import { useState } from 'react';
import { Flex, Text } from '@entry/design-token';
import { Button } from '@entry/ui';
import { ScoreThird, Activity } from '../';

const STEPS = [
  { key: 'current', label: '3학년 1학기' },
  { key: 'previous', label: '직전 학기' },
  { key: 'beforePrevious', label: '직전전 학기' },
  { key: 'activity', label: '출석 및 봉사' }
];

export const PrimaryCalculationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setShowResultModal(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
      case 1:
      case 2:
        return <ScoreThird />;
      case 3:
        return <Activity />;
      default:
        return null;
    }
  };

  return (
    <Flex isColumn={true} width="100%" height="100%" padding="40px">
      <Flex isColumn={true} gap={32}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize={28} fontWeight={700}>
            {STEPS[currentStep].label}
          </Text>
          <Text fontSize={14} color="#666">
            과목이 없는 경우 X 로 기입하세요.
          </Text>
        </Flex>

        <Flex gap={16}>
          {STEPS.map((step, index) => (
            <Flex key={step.key} alignItems="center" gap={8}>
              <Flex
                width="32px"
                height="32px"
                borderRadius="50%"
                backgroundColor={index === currentStep ? "#FF6B35" : index < currentStep ? "#FF6B35" : "#E5E5E5"}
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize={14} fontWeight={600} color={index <= currentStep ? "#FFFFFF" : "#999"}>
                  {index + 1}
                </Text>
              </Flex>
              <Text fontSize={14} fontWeight={index === currentStep ? 600 : 400}>
                {step.label}
              </Text>
              {index < STEPS.length - 1 && (
                <Flex width="40px" height="2px" backgroundColor="#E5E5E5" />
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex flex={1} paddingY="40px">
        {renderStepContent()}
      </Flex>

      <Flex justifyContent="space-between">
        <Button
          onClick={handlePrevious}
          backgroundColor={currentStep === 0 ? '#E5E5E5' : 'transparent'}
          color={currentStep === 0 ? '#999' : '#666'}
          borderColor="#E5E5E5"
          isBlocked={currentStep === 0}
        >
          이전
        </Button>
        
        {currentStep === STEPS.length - 1 ? (
          <Button onClick={handleComplete}>
            완료
          </Button>
        ) : (
          <Button onClick={handleNext}>
            다음
          </Button>
        )}
      </Flex>

      {showResultModal && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex={1000}
        >
          <Flex
            backgroundColor="white"
            borderRadius="12px"
            padding="32px"
            width="500px"
            isColumn={true}
            gap={24}
          >
            <Text fontSize={20} fontWeight={600}>
              성적 산출 결과
            </Text>
            
            <Flex isColumn={true} gap={16}>
              <Flex justifyContent="space-between">
                <Text>일반 전형</Text>
                <Text color="#FF6B35" fontWeight={600}>173.000 / 173</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>사회통합 전형</Text>
                <Text color="#FF6B35" fontWeight={600}>104.000 / 119</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>마이스터 인재</Text>
                <Text color="#FF6B35" fontWeight={600}>104.000 / 119</Text>
              </Flex>
            </Flex>

            <Button onClick={() => setShowResultModal(false)}>
              닫기
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};