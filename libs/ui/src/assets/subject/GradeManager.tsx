import { useState } from 'react';
import { AllSubjectSelector } from './AllSubjectSelector';
import { SubjectSelector } from './SubjectSelector';

export const GradeManager = () => {
  const [globalGrade, setGlobalGrade] = useState<string | null>(null);
  const [subjectGrades, setSubjectGrades] = useState<
    Record<string, string | null>
  >({});

  const subjects = ['기술 가정', '사회', '역사', '수학'];

  // 전체 선택 처리하는 함수
  const handleGlobalGradeChange = (grade: string | null) => {
    setGlobalGrade(grade);

    // 전체 선택 시 모든 과목에 동일한 등급 적용
    const updatedGrades: Record<string, string | null> = {};
    subjects.forEach((subject) => {
      updatedGrades[subject] = grade;
    });
    setSubjectGrades(updatedGrades);
  };

  // 개별 과목 등급 변경 처리
  const handleSubjectGradeChange = (subject: string, grade: string | null) => {
    const updatedGrades = {
      ...subjectGrades,
      [subject]: grade,
    };

    setSubjectGrades(updatedGrades);

    // 모든 과목의 등급이 같으면 전체 선택 등급도 업데이트
    const allSameGrade = subjects.every(
      (subj) => updatedGrades[subj] === grade
    );
    if (allSameGrade && subjects.every((subj) => subj in updatedGrades)) {
      setGlobalGrade(grade);
    } else if (globalGrade !== null) {
      // 다른 등급이 있으면 전체 선택 해제
      setGlobalGrade(null);
    }
  };

  return (
    <>
      <AllSubjectSelector
        selected={globalGrade}
        onSelect={handleGlobalGradeChange}
      />
      {subjects.map((subject) => (
        <SubjectSelector
          key={subject}
          subjectName={subject}
          selectedGrade={subjectGrades[subject] ?? null}
          onSelectGrade={(grade) => handleSubjectGradeChange(subject, grade)}
        />
      ))}
    </>
  );
};
