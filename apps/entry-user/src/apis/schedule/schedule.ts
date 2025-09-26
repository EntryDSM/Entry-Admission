import { AdmissionUserInstance } from '@entry/util-config';
import { IScheduleRequestType, IScheduleResponseType } from './type';

export const fetchSchedule = async (
  type: IScheduleRequestType
): Promise<IScheduleResponseType> => {
  const res = await AdmissionUserInstance.get('/schedule', { params: type });
  return res.data;
};
