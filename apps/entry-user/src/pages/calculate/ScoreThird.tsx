import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex } from '@entry/design-token';
import { GradeManager } from '@entry/ui';
import { useCalculationPageData } from '../../contexts';

export const ScoreThird = () => {
  const location = useLocation();
  const subjects = ['국어', '사회', '역사', '수학', '과학', '기술 · 가정', '영어'];
  const [globalGrade, setGlobalGrade] = useState<string | null>(null);
  
  // 경로에 따라 다른 키 사용
  const getDataKey = (): 'graduatedThird2' | 'graduatedThird1' | 'primaryThird' => {
    if (location.pathname.includes('third2')) return 'graduatedThird2';
    if (location.pathname.includes('third1')) return 'graduatedThird1';
    return 'primaryThird';
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
