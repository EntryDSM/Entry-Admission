import { useEffect, useState } from 'react';
import { Flex } from '@entry/design-token';
import { GradeManager } from '@entry/ui';
import { useCalculationPageData } from '../../contexts';

interface IScoreType {
  kor: string | null;
  soc: string | null;
  his: string | null;
  math: string | null;
  sci: string | null;
  tech: string | null;
  eng: string | null;
  [key: string]: string | null;
}

export const ScoreFirst = () => {
  const subjects = [
    '국어',
    '사회',
    '역사',
    '수학',
    '과학',
    '기술 · 가정',
    '영어',
  ];
  const [globalGrade, setGlobalGrade] = useState<string | null>(null);

  const getDataKey = (): 'primaryFirst' => {
    return 'primaryFirst';
  };

  const [subjectGrades, setSubjectGrades] = useCalculationPageData(
    getDataKey()
  );

  const safeSubjectGrades: Record<string, string | null> = subjectGrades || {};

  const handleSetSubjectGrades = (
    value: React.SetStateAction<Record<string, string | null>>
  ) => {
    if (typeof value === 'function') {
      const result = value(subjectGrades || {});
      setSubjectGrades(result as IScoreType);
    } else {
      setSubjectGrades(value as IScoreType);
    }
  };

  return (
    <Flex width="100%" height="100%" isColumn={true}>
      <GradeManager
        subjects={subjects}
        globalGrade={globalGrade}
        subjectGrades={safeSubjectGrades}
        setGlobalGrade={setGlobalGrade}
        setSubjectGrades={handleSetSubjectGrades}
      />
    </Flex>
  );
};
