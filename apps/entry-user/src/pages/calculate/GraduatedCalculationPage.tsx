import { useState } from 'react';
import { Flex, Text } from '@entry/design-token';
import { Button } from '@entry/ui';
import { ScoreThird, ScoreSecond, ScoreFirst, Activity } from './';
import { useCalculationData } from '../../contexts/CalculationDataContext';
import { calculateScore } from '../../apis/calculator';
import { transformCalculationDataToAPI } from '../../utils/apiDataTransformer';
import { CalculatorScoreResponse } from '../../apis/calculator/types';

const STEPS = [
  { key: 'third2', label: '3학년 2학기' },
  { key: 'third1', label: '3학년 1학기' },
  { key: 'second2', label: '2학년 2학기' },
  { key: 'second1', label: '2학년 1학기' },
  { key: 'activity', label: '출석 및 봉사' }
];

export const GraduatedCalculationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [results, setResults] = useState<{ name: string; data: CalculatorScoreResponse['data'] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = useCalculationData();

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

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const commonRequest = transformCalculationDataToAPI(state, 'COMMON');
      const socialRequest = transformCalculationDataToAPI(state, 'SOCIAL');
      const meisterRequest = transformCalculationDataToAPI(state, 'MEISTER');

      const [commonResponse, socialResponse, meisterResponse] = await Promise.all([
        calculateScore(commonRequest),
        calculateScore(socialRequest),
        calculateScore(meisterRequest),
      ]);

      setResults([
        { name: '일반 전형', data: commonResponse.data },
        { name: '사회통합 전형', data: socialResponse.data },
        { name: '마이스터 인재', data: meisterResponse.data },
      ]);
      setShowResultModal(true);
    } catch (err: any) {
      setError(err.message || '성적 계산 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
      case 1:
        return <ScoreThird />;
      case 2:
      case 3:
        return <ScoreSecond />;
      case 4:
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
            전체 학기의 성적을 X 로 기입하세요.
          </Text>
        </Flex>

        <Flex gap={12} flexWrap="wrap">
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
                <Flex width="30px" height="2px" backgroundColor="#E5E5E5" />
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex flex={1} paddingY="40px" width="100%">
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
          <Button onClick={handleComplete} isBlocked={isLoading}>
            {isLoading ? '계산 중...' : '완료'}
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

            {error && (
              <Text color="#FF0000" fontSize={14}>
                {error}
              </Text>
            )}

            <Flex isColumn={true} gap={16}>
              {results.map((result, index) => (
                <Flex key={index} justifyContent="space-between">
                  <Text>{result.name}</Text>
                  <Text color="#FF6B35" fontWeight={600}>
                    {result.data.totalScore.toFixed(3)} / {result.data.maxScore}
                  </Text>
                </Flex>
              ))}
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