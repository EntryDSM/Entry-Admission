import styled from '@emotion/styled';
import { Text } from '@entry/design-token';
import { Button } from '@entry/ui';
import { useCalculationData } from '../contexts/CalculationDataContext';
import { calculateScore } from '../apis/calculator';
import { transformCalculationDataToAPI } from '../utils/apiDataTransformer';
import { useState, useEffect } from 'react';
import {
  ADMISSION_TYPE_LABEL,
  ADMISSION_TYPE_MAX_SCORE,
  ADMISSION_TYPE_MAX_SCORE_GED,
} from '../constants/admissionType';

interface ScoreResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScoreResult {
  name: string;
  score: string;
  total: string;
}

export const ScoreResultModal = ({
  isOpen,
  onClose,
}: ScoreResultModalProps) => {
  const { state } = useCalculationData();
  const [results, setResults] = useState<ScoreResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchScores = async () => {
      setLoading(true);
      setError(null);

      try {
        // 세 가지 전형 타입에 대해 각각 API 호출
        const commonRequest = transformCalculationDataToAPI(state, 'COMMON');
        const socialRequest = transformCalculationDataToAPI(state, 'SOCIAL');
        const meisterRequest = transformCalculationDataToAPI(state, 'MEISTER');

        const educationalStatus = commonRequest.educanalStatus;

        const [commonResponse, socialResponse, meisterResponse] =
          await Promise.all([
            calculateScore(commonRequest),
            calculateScore(socialRequest),
            calculateScore(meisterRequest),
          ]);

        const maxScore =
          educationalStatus === 'QUALIFICATION_EXAM'
            ? ADMISSION_TYPE_MAX_SCORE_GED
            : ADMISSION_TYPE_MAX_SCORE;

        const newResults: ScoreResult[] = [
          {
            name: ADMISSION_TYPE_LABEL.COMMON,
            score: commonResponse.data.totalScore.toFixed(3),
            total: maxScore.COMMON.toString(),
          },
          {
            name: ADMISSION_TYPE_LABEL.SOCIAL,
            score: socialResponse.data.totalScore.toFixed(3),
            total: maxScore.SOCIAL.toString(),
          },
          {
            name: ADMISSION_TYPE_LABEL.MEISTER,
            score: meisterResponse.data.totalScore.toFixed(3),
            total: maxScore.MEISTER.toString(),
          },
        ];

        setResults(newResults);
      } catch (err) {
        console.error('Score calculation error:', err);
        setError('성적 계산 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [isOpen, state]);

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* 제목 */}
        <Title>성적 산출 결과</Title>

        {/* 로딩 및 에러 처리 */}
        {loading && (
          <ResultList>
            <Text fontSize={20} fontWeight={400}>
              성적을 계산하고 있습니다...
            </Text>
          </ResultList>
        )}

        {error && (
          <ResultList>
            <Text fontSize={20} fontWeight={400} color="#FF0000">
              {error}
            </Text>
          </ResultList>
        )}

        {/* 결과 목록 */}
        {!loading && !error && (
          <ResultList>
            {results.map((result, index) => (
              <ResultItem key={index}>
                <Text fontSize={24} fontWeight={400}>
                  {result.name}
                </Text>
                <ScoreText>
                  <Text fontSize={24} fontWeight={600} color="#FF6B35">
                    {result.score}
                  </Text>
                  <Text fontSize={24} fontWeight={400} color="#999999">
                    {' / '}
                  </Text>
                  <Text fontSize={24} fontWeight={400} color="#999999">
                    {result.total}
                  </Text>
                </ScoreText>
              </ResultItem>
            ))}
          </ResultList>
        )}

        {/* 닫기 버튼 */}
        <ButtonWrapper>
          <Button onClick={onClose}>닫기</Button>
        </ButtonWrapper>
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
  border-radius: 24px;
  padding: 32px 36px;
  width: 970px;
  height: 429px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  text-align: left;
  margin: 0;
  color: #333;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  flex: 1;
  justify-content: center;
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScoreText = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
