export interface IScheduleRequestType {
  type:
    | 'START_DATE'
    | 'FIRST_ANNOUNCEMENT'
    | 'INTERVIEW'
    | 'SECOND_ANNOUNCEMENT'
    | 'END_DATE';
}

export interface IScheduleResponseType {
  type:
    | 'START_DATE'
    | 'FIRST_ANNOUNCEMENT'
    | 'INTERVIEW'
    | 'SECOND_ANNOUNCEMENT'
    | 'END_DATE';
  date: string;
}

export interface IAllScheduleResponseType {
  schedules: IScheduleResponseType[];
  currentStatus: 'BEFORE_START' | 'RECRUITING' | 'FIRST_ANNOUNCEMENT' | 'INTERVIEW' | 'SECOND_ANNOUNCEMENT' | 'END';
}
