import { useQuery } from '@tanstack/react-query';
import {
  fetchSchedule,
  IScheduleRequestType,
  IScheduleResponseType,
} from '../apis';

export const useSchedule = (data: IScheduleRequestType) => {
  return useQuery<IScheduleResponseType>({
    queryKey: ['schedule', data.type],
    queryFn: () => fetchSchedule(data),
    enabled: !!data.type,
  });
};
