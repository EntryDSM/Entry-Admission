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

const normalizeGradeChar = (grade: string | null | undefined): string => {
  if (!grade) return 'X';
  if (grade === '✕') return 'X';
  return grade.toUpperCase();
};

const buildGradeString = (grades: Array<string | null | undefined>) =>
  grades.map(normalizeGradeChar).join('');

// Preserve 0 as a valid value; return undefined only when not a number
const safeParseInt = (value: string | null | undefined): number | undefined => {
  if (value === null || value === undefined || value === '') return undefined;
  const parsed = parseInt(value as string, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const safeParseFloat = (value: string | null | undefined): number | undefined => {
  if (value === null || value === undefined || value === '') return undefined;
  const parsed = parseFloat(value as string);
  return Number.isNaN(parsed) ? undefined : parsed;
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
      gradeInfo: {
        koreanGrade: 'XXXX',
        socialGrade: 'XXXX',
        historyGrade: 'XXXX',
        mathGrade: 'XXXX',
        scienceGrade: 'XXXX',
        englishGrade: 'XXXX',
        techAndHomeGrade: 'XXXX',
        gedKorean: safeParseFloat(state.qeScore.korean) ?? 0,
        gedSocial: safeParseFloat(state.qeScore.social) ?? 0,
        gedMath: safeParseFloat(state.qeScore.math) ?? 0,
        gedScience: safeParseFloat(state.qeScore.science) ?? 0,
        gedEnglish: safeParseFloat(state.qeScore.english) ?? 0,
        gedHistory: safeParseFloat(state.qeScore.history) ?? 0,
      },
      attendanceInfo: {
        absence: safeParseInt(activity.absences) ?? 0,
        tardiness: safeParseInt(activity.lateArrivals) ?? 0,
        earlyLeave: safeParseInt(activity.earlyLeaves) ?? 0,
        classExit: safeParseInt(activity.resultMissing) ?? 0,
        volunteer: safeParseInt(activity.volunteerHours) ?? 0,
      },
      awardAndCertificateInfo: {
        algorithmAward: activity.dsmAlgorithm === 'O',
        infoProcessingCert: activity.infoProcessing === 'O',
      },
    };
  }

  // 졸업예정자인 경우
  if (hasPrimaryData) {
    educationalStatus = 'PROSPECTIVE_GRADUATE';
    activity = state.primaryActivity;

    return {
      applicationType,
      educationalStatus,
      gradeInfo: {
        koreanGrade: buildGradeString([
          'X',
          state.primaryThird.kor,
          state.primarySecond.kor,
          state.primaryFirst.kor,
        ]),
        socialGrade: buildGradeString([
          'X',
          state.primaryThird.soc,
          state.primarySecond.soc,
          state.primaryFirst.soc,
        ]),
        historyGrade: buildGradeString([
          'X',
          state.primaryThird.his,
          state.primarySecond.his,
          state.primaryFirst.his,
        ]),
        mathGrade: buildGradeString([
          'X',
          state.primaryThird.math,
          state.primarySecond.math,
          state.primaryFirst.math,
        ]),
        scienceGrade: buildGradeString([
          'X',
          state.primaryThird.sci,
          state.primarySecond.sci,
          state.primaryFirst.sci,
        ]),
        englishGrade: buildGradeString([
          'X',
          state.primaryThird.eng,
          state.primarySecond.eng,
          state.primaryFirst.eng,
        ]),
        techAndHomeGrade: buildGradeString([
          'X',
          state.primaryThird.tech,
          state.primarySecond.tech,
          state.primaryFirst.tech,
        ]),
        gedKorean: 0,
        gedSocial: 0,
        gedMath: 0,
        gedScience: 0,
        gedEnglish: 0,
        gedHistory: 0,
      },
      attendanceInfo: {
        absence: safeParseInt(activity.absences) ?? 0,
        tardiness: safeParseInt(activity.lateArrivals) ?? 0,
        earlyLeave: safeParseInt(activity.earlyLeaves) ?? 0,
        classExit: safeParseInt(activity.resultMissing) ?? 0,
        volunteer: safeParseInt(activity.volunteerHours) ?? 0,
      },
      awardAndCertificateInfo: {
        algorithmAward: activity.dsmAlgorithm === 'O',
        infoProcessingCert: activity.infoProcessing === 'O',
      },
    };
  }

  // 졸업자인 경우
  educationalStatus = 'GRADUATE';
  activity = state.graduatedActivity;

  return {
    applicationType,
    educationalStatus,
    gradeInfo: {
      koreanGrade: buildGradeString([
        state.graduatedThird2.kor,
        state.graduatedThird1.kor,
        state.graduatedSecond2.kor,
        state.graduatedSecond1.kor,
      ]),
      socialGrade: buildGradeString([
        state.graduatedThird2.soc,
        state.graduatedThird1.soc,
        state.graduatedSecond2.soc,
        state.graduatedSecond1.soc,
      ]),
      historyGrade: buildGradeString([
        state.graduatedThird2.his,
        state.graduatedThird1.his,
        state.graduatedSecond2.his,
        state.graduatedSecond1.his,
      ]),
      mathGrade: buildGradeString([
        state.graduatedThird2.math,
        state.graduatedThird1.math,
        state.graduatedSecond2.math,
        state.graduatedSecond1.math,
      ]),
      scienceGrade: buildGradeString([
        state.graduatedThird2.sci,
        state.graduatedThird1.sci,
        state.graduatedSecond2.sci,
        state.graduatedSecond1.sci,
      ]),
      englishGrade: buildGradeString([
        state.graduatedThird2.eng,
        state.graduatedThird1.eng,
        state.graduatedSecond2.eng,
        state.graduatedSecond1.eng,
      ]),
      techAndHomeGrade: buildGradeString([
        state.graduatedThird2.tech,
        state.graduatedThird1.tech,
        state.graduatedSecond2.tech,
        state.graduatedSecond1.tech,
      ]),
      gedKorean: 0,
      gedSocial: 0,
      gedMath: 0,
      gedScience: 0,
      gedEnglish: 0,
      gedHistory: 0,
    },
    attendanceInfo: {
      absence: safeParseInt(activity.absences) ?? 0,
      tardiness: safeParseInt(activity.lateArrivals) ?? 0,
      earlyLeave: safeParseInt(activity.earlyLeaves) ?? 0,
      classExit: safeParseInt(activity.resultMissing) ?? 0,
      volunteer: safeParseInt(activity.volunteerHours) ?? 0,
    },
    awardAndCertificateInfo: {
      algorithmAward: activity.dsmAlgorithm === 'O',
      infoProcessingCert: activity.infoProcessing === 'O',
    },
  };
};
