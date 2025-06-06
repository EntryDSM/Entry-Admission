import { useState } from 'react';
import { Flex } from '@entry/design-token';
import { GradeManager } from '@entry/ui';

export const Score = () => {
  const subjects = ['국어', '사회', '역사', '수학', '과학', '기술 · 가정'];
  const [globalGrade, setGlobalGrade] = useState<string | null>(null);
  const [subjectGrades, setSubjectGrades] = useState<
    Record<string, string | null>
  >({
    kor: null, // 국어
    soc: null, // 사회
    his: null, // 역사
    math: null, // 수학
    sci: null, // 과학
    tech: null, // 기술 · 가정
  });

  console.log(subjectGrades);
  console.log(globalGrade);

  return (
    <Flex width="100%" height="100%" isColumn={true}>
      <GradeManager
        subjects={subjects}
        globalGrade={globalGrade}
        subjectGrades={subjectGrades}
        setGlobalGrade={setGlobalGrade}
        setSubjectGrades={setSubjectGrades}
      />
    </Flex>
  );
};
