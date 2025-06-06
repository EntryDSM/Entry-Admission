import styled from '@emotion/styled';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export const ProgressIndicator = ({
  totalSteps,
  currentStep,
}: ProgressIndicatorProps) => {
  return (
    <ProgressWrapper>
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        return <ProgressDot key={step} isActive={currentStep === step} />;
      })}
    </ProgressWrapper>
  );
};

const ProgressWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: fit-content;
  height: fit-content;
  justify-content: center;
  margin: 20px auto;
`;

const ProgressDot = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  width: 54px;
  height: 4px;
  background-color: ${({ isActive }) => (isActive ? '#FF7A45' : '#E8E8E8')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in;
`;
