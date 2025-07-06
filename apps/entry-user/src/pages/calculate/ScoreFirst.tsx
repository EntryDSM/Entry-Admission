import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex } from '@entry/design-token';
import { GradeManager, usePageData } from '@entry/ui';

export const ScoreFirst = () => {
  const location = useLocation();
  const subjects = ['국어', '사회', '역사', '수학', '과학', '기술 · 가정'];
  const [globalGrade, setGlobalGrade] = useState<string | null>(null);
  
  // 경로에 따라 다른 키 사용
  const getDataKey = () => {
    if (location.pathname.includes('qe/score')) return 'qeScore';
    return 'firstGraduate'; // 기본값 (primary 플로우용)
  };
  
  const [subjectGrades, setSubjectGrades] = usePageData(getDataKey());
  
  // 초기값이 없으면 빈 객체로 설정
  const safeSubjectGrades = subjectGrades || {};
  const safeSetSubjectGrades = (grades: any) => {
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
