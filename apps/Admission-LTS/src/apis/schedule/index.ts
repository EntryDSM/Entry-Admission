import { useQuery } from '@tanstack/react-query';
import { AdmissionUserInstance } from '@entry/util-config';

const path = "/schedule"


export const useGetSchedule = (type : string) => {
  return useQuery({
    queryKey: ['schedule', type],
    queryFn: async () => {
      const { data } = await AdmissionUserInstance.get(`${path}?type=${type}`);
      return data;
    },
  });
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