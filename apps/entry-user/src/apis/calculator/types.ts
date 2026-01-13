export interface CalculatorScoreRequest {
  applicationType: string;
  educationalStatus: string;
  gradeInfo: {
    koreanGrade: string;
    socialGrade: string;
    historyGrade: string;
    mathGrade: string;
    scienceGrade: string;
    englishGrade: string;
    techAndHomeGrade: string;
    gedKorean: number;
    gedSocial: number;
    gedMath: number;
    gedScience: number;
    gedEnglish: number;
    gedHistory: number;
  };
  attendanceInfo: {
    absence: number;
    tardiness: number;
    earlyLeave: number;
    classExit: number;
    volunteer: number;
  };
  awardAndCertificateInfo: {
    algorithmAward: boolean;
    infoProcessingCert: boolean;
  };
}

export interface CalculatorScoreResponse {
  totalGradeScore: number;
  attendanceScore: number;
  extraScore: number;
  volunteerScore: number;
  totalScore: number;
}
