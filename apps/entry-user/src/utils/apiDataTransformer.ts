import { CalculatorScoreRequest } from '../apis/calculator/types';

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

interface IActivityType {
  absences: string;
  earlyLeaves: string;
  lateArrivals: string;
  resultMissing: string;
  volunteerHours: string;
  dsmAlgorithm: 'O' | 'X' | null;
  infoProcessing: 'O' | 'X' | null;
}

interface IQEScoreType {
  korean: string;
  social: string;
  history: string;
  science: string;
  technology: string;
  math: string;
  english: string;
}

interface CalculationState {
  primaryThird: IScoreType;
  primarySecond: IScoreType;
  primaryFirst: IScoreType;
  primaryActivity: IActivityType;

  graduatedThird2: IScoreType;
  graduatedThird1: IScoreType;
  graduatedSecond2: IScoreType;
  graduatedSecond1: IScoreType;
  graduatedActivity: IActivityType;

  qeScore: IQEScoreType;
  qeActivity: IActivityType;
}

const gradeToNumber: { [key: string]: number } = {
  'A': 1,
  'B': 2,
  'C': 3,
  'D': 4,
  'E': 5,
  '✕': 5  // X는 5등급으로 처리
};

const convertGradeToNumber = (grade: string | null): number | undefined => {
  if (!grade) return undefined;
  return gradeToNumber[grade];
};

export const transformCalculationDataToAPI = (
  state: CalculationState,
  applicationType: 'COMMON' | 'MEISTER' | 'SOCIAL'
): CalculatorScoreRequest => {
  // 어떤 타입의 데이터가 있는지 판단
  const hasAnyData = (scores: IScoreType | IQEScoreType) =>
    Object.values(scores).some(value => value !== null && value !== '');

  const hasPrimaryData = hasAnyData(state.primaryFirst) || hasAnyData(state.primarySecond) || hasAnyData(state.primaryThird);
  const hasGraduatedData = hasAnyData(state.graduatedSecond1) || hasAnyData(state.graduatedSecond2) ||
                          hasAnyData(state.graduatedThird1) || hasAnyData(state.graduatedThird2);
  const hasQEData = hasAnyData(state.qeScore);

  let educationalStatus: 'PROSPECTIVE_GRADUATE' | 'GRADUATE' | 'QUALIFICATION_EXAM';
  let activity: IActivityType;

  // 검정고시인 경우
  if (hasQEData) {
    educationalStatus = 'QUALIFICATION_EXAM';
    activity = state.qeActivity;

    return {
      applicationType,
      educationalStatus,
      scores: {
        // 검정고시는 검정고시 점수만 보냄 (출석 및 봉사 제외)
        qualificationKorean: parseFloat(state.qeScore.korean) || undefined,
        qualificationSocial: parseFloat(state.qeScore.social) || undefined,
        qualificationHistory: parseFloat(state.qeScore.history) || undefined,
        qualificationMath: parseFloat(state.qeScore.math) || undefined,
        qualificationScience: parseFloat(state.qeScore.science) || undefined,
        qualificationEnglish: parseFloat(state.qeScore.english) || undefined,
        qualificationTech: parseFloat(state.qeScore.technology) || undefined,
      },
      bonus: {
        dsmAlgorithm: activity.dsmAlgorithm === 'O',
        infoProcessing: activity.infoProcessing === 'O',
      }
    };
  }

  // 졸업예정자인 경우
  if (hasPrimaryData) {
    educationalStatus = 'PROSPECTIVE_GRADUATE';
    activity = state.primaryActivity;

    return {
      applicationType,
      educationalStatus,
      scores: {
        // 3학년 1학기 (primaryThird)
        korean_3_1: convertGradeToNumber(state.primaryThird.kor),
        social_3_1: convertGradeToNumber(state.primaryThird.soc),
        history_3_1: convertGradeToNumber(state.primaryThird.his),
        math_3_1: convertGradeToNumber(state.primaryThird.math),
        science_3_1: convertGradeToNumber(state.primaryThird.sci),
        tech_3_1: convertGradeToNumber(state.primaryThird.tech),
        english_3_1: convertGradeToNumber(state.primaryThird.eng),
        // 직전 학기 (primarySecond)
        korean_2_2: convertGradeToNumber(state.primarySecond.kor),
        social_2_2: convertGradeToNumber(state.primarySecond.soc),
        history_2_2: convertGradeToNumber(state.primarySecond.his),
        math_2_2: convertGradeToNumber(state.primarySecond.math),
        science_2_2: convertGradeToNumber(state.primarySecond.sci),
        tech_2_2: convertGradeToNumber(state.primarySecond.tech),
        english_2_2: convertGradeToNumber(state.primarySecond.eng),
        // 직직전 학기 (primaryFirst)
        korean_2_1: convertGradeToNumber(state.primaryFirst.kor),
        social_2_1: convertGradeToNumber(state.primaryFirst.soc),
        history_2_1: convertGradeToNumber(state.primaryFirst.his),
        math_2_1: convertGradeToNumber(state.primaryFirst.math),
        science_2_1: convertGradeToNumber(state.primaryFirst.sci),
        tech_2_1: convertGradeToNumber(state.primaryFirst.tech),
        english_2_1: convertGradeToNumber(state.primaryFirst.eng),
        // 출석 및 봉사
        absence: parseInt(activity.absences) || undefined,
        tardiness: parseInt(activity.lateArrivals) || undefined,
        earlyLeave: parseInt(activity.earlyLeaves) || undefined,
        classExit: parseInt(activity.resultMissing) || undefined,
        volunteer: parseInt(activity.volunteerHours) || undefined,
        algorithmAward: activity.dsmAlgorithm === 'O',
        infoProcessingCert: activity.infoProcessing === 'O',
      }
    };
  }

  // 졸업자인 경우
  educationalStatus = 'GRADUATE';
  activity = state.graduatedActivity;

  return {
    applicationType,
    educationalStatus,
    scores: {
      // 3학년 2학기
      korean_3_2: convertGradeToNumber(state.graduatedThird2.kor),
      social_3_2: convertGradeToNumber(state.graduatedThird2.soc),
      history_3_2: convertGradeToNumber(state.graduatedThird2.his),
      math_3_2: convertGradeToNumber(state.graduatedThird2.math),
      science_3_2: convertGradeToNumber(state.graduatedThird2.sci),
      tech_3_2: convertGradeToNumber(state.graduatedThird2.tech),
      english_3_2: convertGradeToNumber(state.graduatedThird2.eng),
      // 3학년 1학기
      korean_3_1: convertGradeToNumber(state.graduatedThird1.kor),
      social_3_1: convertGradeToNumber(state.graduatedThird1.soc),
      history_3_1: convertGradeToNumber(state.graduatedThird1.his),
      math_3_1: convertGradeToNumber(state.graduatedThird1.math),
      science_3_1: convertGradeToNumber(state.graduatedThird1.sci),
      tech_3_1: convertGradeToNumber(state.graduatedThird1.tech),
      english_3_1: convertGradeToNumber(state.graduatedThird1.eng),
      // 2학년 2학기
      korean_2_2: convertGradeToNumber(state.graduatedSecond2.kor),
      social_2_2: convertGradeToNumber(state.graduatedSecond2.soc),
      history_2_2: convertGradeToNumber(state.graduatedSecond2.his),
      math_2_2: convertGradeToNumber(state.graduatedSecond2.math),
      science_2_2: convertGradeToNumber(state.graduatedSecond2.sci),
      tech_2_2: convertGradeToNumber(state.graduatedSecond2.tech),
      english_2_2: convertGradeToNumber(state.graduatedSecond2.eng),
      // 2학년 1학기
      korean_2_1: convertGradeToNumber(state.graduatedSecond1.kor),
      social_2_1: convertGradeToNumber(state.graduatedSecond1.soc),
      history_2_1: convertGradeToNumber(state.graduatedSecond1.his),
      math_2_1: convertGradeToNumber(state.graduatedSecond1.math),
      science_2_1: convertGradeToNumber(state.graduatedSecond1.sci),
      tech_2_1: convertGradeToNumber(state.graduatedSecond1.tech),
      english_2_1: convertGradeToNumber(state.graduatedSecond1.eng),
      // 출석 및 봉사
      absence: parseInt(activity.absences) || undefined,
      tardiness: parseInt(activity.lateArrivals) || undefined,
      earlyLeave: parseInt(activity.earlyLeaves) || undefined,
      classExit: parseInt(activity.resultMissing) || undefined,
      volunteer: parseInt(activity.volunteerHours) || undefined,
      algorithmAward: activity.dsmAlgorithm === 'O',
      infoProcessingCert: activity.infoProcessing === 'O',
    }
  };
};
