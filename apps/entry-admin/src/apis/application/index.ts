import { AdmissionAdminInstance } from '@entry/util-config';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  IApplicationAllListRequest,
  IApplicationAllListResponse,
  IApplicationDetailResponse,
} from './types';
import {} from 'axios';
import { toast } from 'react-toastify';

// 원서 전체 조회
export const useGetApplicationAllList = (
  params?: IApplicationAllListRequest
) => {
  return useQuery({
    queryKey: ['applications', params],
    queryFn: async () => {
      const { data } =
        await AdmissionAdminInstance.get<IApplicationAllListResponse>(
          '/api/v1/applications',
          params ? { params } : {}
        );
      return data;
    },
    networkMode: 'always',
    enabled: true,
  });
};

// 상세 조회
export const useGetApplicationDetail = (applicationId?: string) => {
  return useQuery({
    queryKey: ['applicationDetail', applicationId],
    queryFn: async () => {
      const { data } =
        await AdmissionAdminInstance.get<IApplicationDetailResponse>(
          `/api/v1/applications/${applicationId}`
        );
      return data.data;
    },
    enabled: !!applicationId, // id 있을 때만 요청
    meta: {
      onError: () => {
        toast.error('원서 상세 조회 중 오류가 발생했습니다.');
      },
    },
  });
};

// 수험번호 일괄 부여
export const usePostExamNumber = () => {
  return useMutation({
    mutationFn: () => AdmissionAdminInstance.post('/api/v1/exam-code'),
    onSuccess: () => toast.success('수험번호가 일괄 부여되었습니다.'),
    onError: () => toast.error('수험번호 부여 중 오류가 발생했습니다.'),
  });
};

// 서류 도착 수정
export const usePatchPrintsNotArrived = () => {
  return useMutation({
    mutationFn: async (receiptCode: number) => {
      return await AdmissionAdminInstance.patch(
        `/admin/status/prints-not-arrived/${receiptCode}`
      );
    },
    onSuccess: () => toast.success('서류 도착 상태가 수정되었습니다.'),
    onError: () => toast.error('서류 도착 상태 수정 중 오류가 발생했습니다.'),
  });
};

// 서류 도착 확인
export const usePatchPrintsArrived = () => {
  return useMutation({
    mutationFn: async (receiptCode: number) => {
      return AdmissionAdminInstance.patch(
        `/admin/status/prints-arrived/${receiptCode}`
      );
    },
    onSuccess: () => toast.success('서류 도착이 확인되었습니다.'),
    onError: () => toast.error('서류 도착 확인 중 오류가 발생했습니다.'),
  });
};
