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
  const handleGlobalGradeChange = (grade: string | null) => {
    setGlobalGrade(grade);
    const updatedGrades: Record<string, string | null> = {};
    subjects.forEach((subject) => {
      updatedGrades[subject] = grade;
    });
    setSubjectGrades(updatedGrades);
  };

  const handleSubjectGradeChange = (subject: string, grade: string | null) => {
    const updatedGrades = {
      ...subjectGrades,
      [subject]: grade,
    };

    setSubjectGrades(updatedGrades);

    const allSameGrade = subjects.every(
      (subj) => updatedGrades[subj] === grade
    );
    if (allSameGrade && subjects.every((subj) => subj in updatedGrades)) {
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
