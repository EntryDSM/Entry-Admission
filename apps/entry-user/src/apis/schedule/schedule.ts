import { AdmissionUserInstance } from '@entry/util-config';
import { IScheduleRequestType, IScheduleResponseType } from './type';
import { useQuery } from '@tanstack/react-query';

const path = "/schedule"


export const fetchSchedule = async (
  type: IScheduleRequestType
): Promise<IScheduleResponseType> => {
  const res = await AdmissionUserInstance.get('/schedule', { params: type });
  return res.data;
};



export const useGetAllSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: async () => {
      const { data } = await AdmissionUserInstance.get(`${path}/all`);
      return data;
    },
  });
};