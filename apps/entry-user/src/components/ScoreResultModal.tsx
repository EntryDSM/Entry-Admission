import styled from '@emotion/styled';
import { Text } from '@entry/design-token';
import { Button, Cancel } from '@entry/ui';

interface ScoreResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScoreResult {
  name: string;
  score: string;
  total: string;
}

export const ScoreResultModal = ({ isOpen, onClose }: ScoreResultModalProps) => {
  if (!isOpen) return null;

  const results: ScoreResult[] = [
    { name: '일반 전형', score: '173.000', total: '173' },
    { name: '사회통합 전형', score: '104.000', total: '119' },
    { name: '마이스터 인재', score: '104.000', total: '119' }
  ];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* X 버튼 */}
        <CloseButton onClick={onClose}>
          <Cancel isClicked={true} />
        </CloseButton>

        {/* 제목 */}
        <Title>성적 산출 결과</Title>
        
        {/* 결과 목록 */}
        <ResultList>
          {results.map((result, index) => (
            <ResultItem key={index}>
              <Text fontSize={18} fontWeight={500}>
                {result.name}
              </Text>
              <Text fontSize={18} fontWeight={600} color="#FF6B35">
                {result.score} / {result.total}
              </Text>
            </ResultItem>
          ))}
        </ResultList>

        {/* 닫기 버튼 */}
        <StyledButton onClick={onClose}>
          닫기
        </StyledButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  width: 500px;
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #FF6B35;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: #E55A2B;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 0;
  color: #333;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 100%;
  background-color: #FF6B35;
  color: white;
  border: 1px solid #FF6B35;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: #E55A2B;
  }
`;
