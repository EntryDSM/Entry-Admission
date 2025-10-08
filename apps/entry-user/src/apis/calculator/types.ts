export interface CalculatorScoreRequest {
  applicationType: 'COMMON' | 'MEISTER' | 'SOCIAL';
  educationalStatus: 'PROSPECTIVE_GRADUATE' | 'GRADUATE' | 'QUALIFICATION_EXAM';
  scores: {
    // 3학년 2학기
    korean_3_2?: number;
    social_3_2?: number;
    history_3_2?: number;
    math_3_2?: number;
    science_3_2?: number;
    tech_3_2?: number;
    english_3_2?: number;
    // 3학년 1학기
    korean_3_1?: number;
    social_3_1?: number;
    history_3_1?: number;
    math_3_1?: number;
    science_3_1?: number;
    tech_3_1?: number;
    english_3_1?: number;
    // 2학년 2학기
    korean_2_2?: number;
    social_2_2?: number;
    history_2_2?: number;
    math_2_2?: number;
    science_2_2?: number;
    tech_2_2?: number;
    english_2_2?: number;
    // 2학년 1학기
    korean_2_1?: number;
    social_2_1?: number;
    history_2_1?: number;
    math_2_1?: number;
    science_2_1?: number;
    tech_2_1?: number;
    english_2_1?: number;
    // 검정고시
    qualificationKorean?: number;
    qualificationSocial?: number;
    qualificationHistory?: number;
    qualificationMath?: number;
    qualificationScience?: number;
    qualificationEnglish?: number;
    qualificationTech?: number;
    // 출석 및 봉사
    absence?: number;
    tardiness?: number;
    earlyLeave?: number;
    classExit?: number;
    volunteer?: number;
    algorithmAward?: boolean;
    infoProcessingCert?: boolean;
  };
}

export interface CalculatorScoreResponse {
  success: boolean;
  data: {
    subjectScore: number;
    attendanceScore: number;
    volunteerScore: number;
    bonusScore: number;
    totalScore: number;
    maxScore: number;
    scorePercentage: number;
  };
}
