import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { INoticeCreateType, INoticeUpdateType } from './types';
import { AdmissionUserInstance } from '@entry/util-config';

const path = '/notice';

export const useUpdateNotice = () => {
  return useMutation({
    mutationFn: async (data: INoticeUpdateType) => {
      const response = await AdmissionUserInstance.patch(
        `${path}/${data.noticeId}`,
        data.data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('수정이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error('에러가 발생하였습니다.');
    },
  });
};

export const useCreateNotice = () => {
  return useMutation({
    mutationFn: async (data: INoticeCreateType) => {
      const response = await AdmissionUserInstance.post(`${path}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('생성이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error('에러가 발생하였습니다.');
    },
  });
};

export const useGetAllNotice = (type: 'GUIDE' | 'NOTICE') => {
  return useQuery({
    queryKey: ['notice', type],
    queryFn: async () => {
      const { data } = await AdmissionUserInstance.get(`${path}`, {
        params: { type },
      });
      return data;
    },
  });
};

export const useGetDetailNotice = (noticeId: string) => {
  return useQuery({
    queryKey: ['notice', noticeId],
    queryFn: async () => {
      const { data } = await AdmissionUserInstance.get(`${path}/${noticeId}`);
      return data;
    },
  });
};
