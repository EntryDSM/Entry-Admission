import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../instance';
import { toast } from 'react-toastify';
import { IUpdateScheduleRequest } from './types';

const path = "/schedule"


export const useGetSchedule = () => {
  return useQuery({
    queryKey: ['schedule'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}`);
      return data;
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(data: IUpdateScheduleRequest) => {
      const response = await instance.patch(`${path}`, data);
      return response.data;
    }, 
    onSuccess: () => {
      toast.success('수정이 완료되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['schedule'] }); //수정된 전체 일정 재로딩
    },
    onError: (error) => {
      console.log(error);
    }
  })
}
