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

const gradeToScore: { [key: string]: number } = {
  'A': 30,
  'B': 26,
  'C': 22,
  'D': 18,
  'E': 14,
  '✕': 10
};

const subjectWeights = {
  kor: 1.0,
  math: 1.0,
  sci: 1.0,
  eng: 1.0,
  soc: 0.8,
  his: 0.8,
  tech: 0.6
};

const calculateSubjectScore = (scores: IScoreType): number => {
  let totalScore = 0;
  let totalWeight = 0;

  Object.entries(scores).forEach(([subject, grade]) => {
    if (grade && subject !== undefined && subjectWeights[subject as keyof typeof subjectWeights]) {
      const score = gradeToScore[grade] || 0;
      const weight = subjectWeights[subject as keyof typeof subjectWeights];
      totalScore += score * weight;
      totalWeight += weight;
    }
  });

  return totalWeight > 0 ? (totalScore / totalWeight) * (150 / 30) : 0;
};

const calculateActivityScore = (activity: IActivityType): number => {
  let score = 50;

  const absences = parseInt(activity.absences) || 0;
  const earlyLeaves = parseInt(activity.earlyLeaves) || 0;
  const lateArrivals = parseInt(activity.lateArrivals) || 0;
  const volunteerHours = parseInt(activity.volunteerHours) || 0;

  score -= absences * 2;
  score -= earlyLeaves * 0.5;
  score -= lateArrivals * 0.3;

  if (volunteerHours >= 30) score += 10;
  else if (volunteerHours >= 20) score += 7;
  else if (volunteerHours >= 10) score += 5;

  if (activity.dsmAlgorithm === 'O') score += 5;
  if (activity.infoProcessing === 'O') score += 5;

  return Math.max(0, Math.min(50, score));
};

const calculateQEScore = (qeScore: IQEScoreType): number => {
  const subjects = [
    qeScore.korean,
    qeScore.math,
    qeScore.science,
    qeScore.social,
    qeScore.history,
    qeScore.technology,
    qeScore.english
  ];

  const validScores = subjects.filter(score => score && !isNaN(parseFloat(score)));

  if (validScores.length === 0) return 0;

  const totalScore = validScores.reduce((sum, score) => sum + parseFloat(score), 0);
  const averageScore = totalScore / validScores.length;

  return Math.min(150, (averageScore / 100) * 150);
};

export const calculateTotalScore = (data: CalculationState, type: 'primary' | 'graduated' | 'qe'): number => {
  let subjectScore = 0;
  let activityScore = 0;

  switch (type) {
    case 'primary':
      const primaryScores = [data.primaryFirst, data.primarySecond, data.primaryThird];
      const validPrimaryScores = primaryScores.filter(scores =>
        Object.values(scores).some(grade => grade !== null)
      );

      if (validPrimaryScores.length > 0) {
        const avgSubjectScore = validPrimaryScores.reduce((sum, scores) =>
          sum + calculateSubjectScore(scores), 0
        ) / validPrimaryScores.length;
        subjectScore = avgSubjectScore;
      }

      activityScore = calculateActivityScore(data.primaryActivity);
      break;

    case 'graduated':
      const graduatedScores = [data.graduatedSecond1, data.graduatedSecond2, data.graduatedThird1, data.graduatedThird2];
      const validGraduatedScores = graduatedScores.filter(scores =>
        Object.values(scores).some(grade => grade !== null)
      );

      if (validGraduatedScores.length > 0) {
        const avgSubjectScore = validGraduatedScores.reduce((sum, scores) =>
          sum + calculateSubjectScore(scores), 0
        ) / validGraduatedScores.length;
        subjectScore = avgSubjectScore;
      }

      activityScore = calculateActivityScore(data.graduatedActivity);
      break;

    case 'qe':
      subjectScore = calculateQEScore(data.qeScore);
      activityScore = calculateActivityScore(data.qeActivity);
      break;
  }

  return Math.round((subjectScore + activityScore) * 100) / 100;
};

export const calculateAllScores = (data: CalculationState) => {
  const hasAnyData = (scores: IScoreType | IQEScoreType) =>
    Object.values(scores).some(value => value !== null && value !== '');

  const hasPrimaryData = hasAnyData(data.primaryFirst) || hasAnyData(data.primarySecond) || hasAnyData(data.primaryThird);
  const hasGraduatedData = hasAnyData(data.graduatedSecond1) || hasAnyData(data.graduatedSecond2) ||
                          hasAnyData(data.graduatedThird1) || hasAnyData(data.graduatedThird2);
  const hasQEData = hasAnyData(data.qeScore);

  let totalScore = 0;

  if (hasPrimaryData) {
    totalScore = calculateTotalScore(data, 'primary');
  } else if (hasGraduatedData) {
    totalScore = calculateTotalScore(data, 'graduated');
  } else if (hasQEData) {
    totalScore = calculateTotalScore(data, 'qe');
  }

  const generalScore = totalScore;
  const socialScore = Math.round(totalScore * 0.6 * 100) / 100;
  const meisterScore = Math.round(totalScore * 0.6 * 100) / 100;

  return {
    general: {
      score: generalScore.toFixed(3),
      total: '200'
    },
    social: {
      score: socialScore.toFixed(3),
      total: '120'
    },
    meister: {
      score: meisterScore.toFixed(3),
      total: '120'
    }
  };
};