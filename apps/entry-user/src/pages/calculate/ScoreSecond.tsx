import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex } from '@entry/design-token';
import { GradeManager } from '@entry/ui';
import { useCalculationPageData } from '../../contexts';

export const ScoreSecond = () => {
  const location = useLocation();
  const subjects = ['국어', '사회', '역사', '수학', '과학', '기술 · 가정'];
  const [globalGrade, setGlobalGrade] = useState<string | null>(null);
  
  // 경로에 따라 다른 키 사용
  const getDataKey = (): 'graduatedSecond2' | 'graduatedSecond1' | 'primarySecond' => {
    if (location.pathname.includes('second2')) return 'graduatedSecond2';
    if (location.pathname.includes('second1')) return 'graduatedSecond1';
    return 'primarySecond';
  };
  
  const [subjectGrades, setSubjectGrades] = useCalculationPageData(getDataKey());
  
  const safeSubjectGrades = subjectGrades || {};
  const safeSetSubjectGrades = (grades: typeof subjectGrades) => {
    setSubjectGrades(grades || {});
  };

  return (
    <Flex width="100%" height="100%" isColumn={true}>
      <GradeManager
        subjects={subjects}
        globalGrade={globalGrade}
        subjectGrades={safeSubjectGrades}
        setGlobalGrade={setGlobalGrade}
        setSubjectGrades={safeSetSubjectGrades}
      />
    </Flex>
  );
};
