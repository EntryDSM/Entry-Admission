import { AdmissionAdminInstance } from '@entry/util-config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  INoticeListRequest,
  INoticeListResponse,
  INoticeDetailResponse,
  INoticeCreateRequest,
  INoticeUpdateRequest,
  INoticeImageUploadRequest,
  INoticeTitleListResponse,
} from './types';

// 종류별 공지사항 전체 조회
export const useGetNoticeList = (params: INoticeListRequest) => {
  return useQuery({
    queryKey: ['notices', params.type],
    queryFn: async () => {
      const { data } = await AdmissionAdminInstance.get<INoticeListResponse>(
        '/notice',
        { params }
      );
      return data;
    },
    enabled: !!params.type,
  });
};

// 공지사항 상세 조회
export const useGetNoticeDetail = (noticeId?: string) => {
  return useQuery({
    queryKey: ['noticeDetail', noticeId],
    queryFn: async () => {
      const { data } = await AdmissionAdminInstance.get<INoticeDetailResponse>(
        `/notice/${noticeId}`
      );
      return data;
    },
    enabled: !!noticeId,
    meta: {
      onError: () => {
        toast.error('공지사항 조회 중 오류가 발생했습니다.');
      },
    },
  });
};

// 공지사항 제목 조회
export const useGetNoticeTitleList = () => {
  return useQuery({
    queryKey: ['noticeTitles'],
    queryFn: async () => {
      const { data } =
        await AdmissionAdminInstance.get<INoticeTitleListResponse>(
          '/notice/title'
        );
      return data;
    },
  });
};

// 공지사항 생성
export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: INoticeCreateRequest) => {
      return await AdmissionAdminInstance.post('/notice', request);
    },
    onSuccess: () => {
      toast.success('공지사항이 생성되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      queryClient.invalidateQueries({ queryKey: ['noticeTitles'] });
    },
    onError: () => {
      toast.error('공지사항 생성 중 오류가 발생했습니다.');
    },
  });
};

// 공지사항 수정
export const useUpdateNotice = (noticeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: INoticeUpdateRequest) => {
      return await AdmissionAdminInstance.patch(`/notice/${noticeId}`, request);
    },
    onSuccess: () => {
      toast.success('공지사항이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      queryClient.invalidateQueries({ queryKey: ['noticeDetail', noticeId] });
      queryClient.invalidateQueries({ queryKey: ['noticeTitles'] });
    },
    onError: () => {
      toast.error('공지사항 수정 중 오류가 발생했습니다.');
    },
  });
};

// 공지사항 삭제
export const useDeleteNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noticeId: string) => {
      return await AdmissionAdminInstance.delete(`/notice/${noticeId}`);
    },
    onSuccess: () => {
      toast.success('공지사항이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      queryClient.invalidateQueries({ queryKey: ['noticeTitles'] });
    },
    onError: () => {
      toast.error('공지사항 삭제 중 오류가 발생했습니다.');
    },
  });
};

// 이미지 업로드
export const useUploadNoticeImage = () => {
  return useMutation({
    mutationFn: async (request: INoticeImageUploadRequest) => {
      const { data } = await AdmissionAdminInstance.post<{ imageURL: string }>(
        '/notice/image',
        request
      );
      return data;
    },
    onSuccess: () => {
      toast.success('이미지가 업로드되었습니다.');
    },
    onError: () => {
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
    },
  });
};
