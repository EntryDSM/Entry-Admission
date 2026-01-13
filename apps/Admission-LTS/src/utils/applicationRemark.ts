export type ApplicationRemark =
  | 'PRIVILEGED_ADMISSION'
  | 'NATIONAL_MERIT'
  | 'NOTHING';

export const getApplicationRemark = (
  specialNotes?: string
): ApplicationRemark => {
  if (specialNotes === '특례 입학 대상') return 'PRIVILEGED_ADMISSION';
  if (specialNotes === '국가 유공자') return 'NATIONAL_MERIT';
  return 'NOTHING';
};
