import { useMutation } from '@tanstack/react-query';
import { AdmissionUserInstance } from '@repo/util-config/meercat/axios';
import type { IPdfPreviewFailedRequest, IPdfPreviewSuccessRequest } from './types';

export const usePdfPreviewSuccessPost = () => {
  return useMutation({
    mutationFn: async (data: IPdfPreviewSuccessRequest) => {
      const response = await AdmissionUserInstance.post('/api/v1/pdf/preview-success', data);
      return response.data;
    },
  });
};

export const usePdfPreviewFailedPost = () => {
  return useMutation({
    mutationFn: async (data: IPdfPreviewFailedRequest) => {
      const response = await AdmissionUserInstance.post('/api/v1/pdf/preview-failed', data);
      return response.data;
    },
  });
};
