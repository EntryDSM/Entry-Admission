export const convertGradeToScore = (grade: string | null) => {
  const upperGrade = grade?.toUpperCase();
  
  switch (upperGrade) {
    case 'A':
      return 5;
    case 'B':
      return 4;
    case 'C':
      return 3;
    case 'D':
      return 2;
    case 'E':
      return 1;
    case 'X':
      return null;
    default:
      return null; // 잘못된 입력의 경우
  }
};
