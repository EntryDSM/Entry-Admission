export type AdmissionType = 'COMMON' | 'MEISTER' | 'SOCIAL';

export const ADMISSION_TYPE_LABEL: Record<AdmissionType, string> = {
  COMMON: '일반전형',
  MEISTER: '마이스터인재전형',
  SOCIAL: '사회통합전형',
};

export const ADMISSION_TYPE_MAX_SCORE: Record<AdmissionType, number> = {
  COMMON: 173,
  SOCIAL: 119,
  MEISTER: 119,
};
