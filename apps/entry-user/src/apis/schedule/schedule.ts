import { AdmissionPublicInstance } from '@entry/util-config';
import { IScheduleRequestType, IScheduleResponseType, IAllScheduleResponseType } from './type';
import { useQuery } from '@tanstack/react-query';

const path = "/schedule"


export const fetchSchedule = async (
  type: IScheduleRequestType
): Promise<IScheduleResponseType> => {
  const res = await AdmissionPublicInstance.get('/schedule', { params: type });
  return res.data;
};



export const useGetAllSchedule = () => {
  return useQuery<IAllScheduleResponseType>({
    queryKey: ['schedule'],
    queryFn: async () => {
      const { data } = await AdmissionPublicInstance.get(`${path}/all`);
      return data;
    },
  });
};