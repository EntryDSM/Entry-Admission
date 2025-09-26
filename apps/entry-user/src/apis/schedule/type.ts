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
