export interface CalculatorScoreRequest {
  admissionType: string;
  scores: {
    [key: string]: string;
  };
  bonus: {
    dsmAlgorithm?: boolean;
    infoProcessing?: boolean;
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
