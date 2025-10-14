import styled from '@emotion/styled';
import { AttendanceForm } from '@entry/ui';
import { useCalculationPageData } from '../../contexts';

export const QEDScore = () => {
  const [scoreData, setScoreData] = useCalculationPageData('qeScore');

  const safeScoreData = scoreData || {};
  const safeSetScoreData = (data: typeof scoreData) => {
    setScoreData(data || {});
  };

  const handleKoreanChange = (value: string) => {
    safeSetScoreData({ ...safeScoreData, korean: value });
  };

  const handleSocialChange = (value: string) => {
    safeSetScoreData({ ...safeScoreData, social: value });
  };

  const handleHistoryChange = (value: string) => {
    safeSetScoreData({ ...safeScoreData, history: value });
  };

  const handleScienceChange = (value: string) => {
    safeSetScoreData({ ...safeScoreData, science: value });
  };

  const handleTechnologyChange = (value: string) => {
    safeSetScoreData({ ...safeScoreData, technology: value });
  };

  const handleMathChange = (value: string) => {
    safeSetScoreData({ ...safeScoreData, math: value });
  };

  const handleEnglishChange = (value: string) => {
    safeSetScoreData({ ...safeScoreData, english: value });
  };

  return (
    <Container>
      <Column>
        <AttendanceForm
          width={'100%'}
          title="국어"
          value={safeScoreData?.korean || ''}
          onChange={handleKoreanChange}
          suffix="점"
          defaultCount={100}
          maxScore={100}
        />
        <AttendanceForm
          width={'100%'}
          title="과학"
          value={safeScoreData?.science || ''}
          onChange={handleScienceChange}
          suffix="점"
          defaultCount={100}
          maxScore={100}
        />
      </Column>
      <Column>
        <AttendanceForm
          width={'100%'}
          title="사회"
          value={safeScoreData?.social || ''}
          onChange={handleSocialChange}
          suffix="점"
          defaultCount={100}
          maxScore={100}
        />
        <AttendanceForm
          width={'100%'}
          title="기술 · 가정"
          value={safeScoreData?.technology || ''}
          onChange={handleTechnologyChange}
          suffix="점"
          defaultCount={100}
          maxScore={100}
        />
        <AttendanceForm
          width={'100%'}
          title="영어"
          value={safeScoreData?.english || ''}
          onChange={handleEnglishChange}
          suffix="점"
          defaultCount={100}
          maxScore={100}
        />
      </Column>
      <Column>
        <AttendanceForm
          width={'100%'}
          title="역사"
          value={safeScoreData?.history || ''}
          onChange={handleHistoryChange}
          suffix="점"
          defaultCount={100}
          maxScore={100}
        />
        <AttendanceForm
          width={'100%'}
          title="수학"
          value={safeScoreData?.math || ''}
          onChange={handleMathChange}
          suffix="점"
          defaultCount={100}
          maxScore={100}
        />
      </Column>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  width: 100%;
  height: fit-content;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
