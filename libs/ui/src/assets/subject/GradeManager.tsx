import { AllSubjectSelector } from './AllSubjectSelector';
import { SubjectSelector } from './SubjectSelector';

interface IGradeManagerProps {
  subjects: string[];
  globalGrade: string | null;
  subjectGrades: Record<string, string | null>;
  setGlobalGrade: React.Dispatch<React.SetStateAction<string | null>>;
  setSubjectGrades: React.Dispatch<
    React.SetStateAction<Record<string, string | null>>
  >;
}

export const GradeManager = ({
  subjects,
  globalGrade,
  subjectGrades,
  setGlobalGrade,
  setSubjectGrades,
}: IGradeManagerProps) => {
  // 과목명을 영어 키로 매핑
  const subjectKeyMap: Record<string, string> = {
    국어: 'kor',
    사회: 'soc',
    역사: 'his',
    수학: 'math',
    과학: 'sci',
    '기술 · 가정': 'tech',
  };

  const handleGlobalGradeChange = (grade: string | null) => {
    setGlobalGrade(grade);
    const updatedGrades: Record<string, string | null> = {};
    subjects.forEach((subject) => {
      const key = subjectKeyMap[subject];
      updatedGrades[key] = grade;
    });
    setSubjectGrades(updatedGrades);
  };

  const handleSubjectGradeChange = (subject: string, grade: string | null) => {
    const key = subjectKeyMap[subject];
    const updatedGrades = {
      ...subjectGrades,
      [key]: grade,
    };

    setSubjectGrades(updatedGrades);

    // 모든 과목이 같은 성적인지 확인
    const subjectKeys = subjects.map((subj) => subjectKeyMap[subj]);
    const allSameGrade = subjectKeys.every(
      (subjKey) => updatedGrades[subjKey] === grade
    );

    if (
      allSameGrade &&
      subjectKeys.every((subjKey) => subjKey in updatedGrades)
    ) {
      setGlobalGrade(grade);
    } else if (globalGrade !== null) {
      setGlobalGrade(null);
    }
  };

  return (
    <>
      <AllSubjectSelector
        selected={globalGrade}
        onSelect={handleGlobalGradeChange}
      />
      {subjects.map((subject) => {
        const key = subjectKeyMap[subject];
        return (
          <SubjectSelector
            key={subject}
            subjectName={subject}
            selectedGrade={subjectGrades[key] ?? null}
            onSelectGrade={(grade) => handleSubjectGradeChange(subject, grade)}
          />
        );
      })}
    </>
  );
};
