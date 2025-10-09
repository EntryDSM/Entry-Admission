import { AdmissionUserInstance } from '@entry/util-config';
import { DeleteApplicationResponse, IApplicationStatusResponse } from './types';

/**
 * 최종 원서 PDF 조회
 * GET /api/v1/application/pdf/final
 */
export const getFinalApplicationPdf = async (): Promise<Blob> => {
  const { data } = await AdmissionUserInstance.get('/api/v1/application/pdf/final', {
    responseType: 'blob',
  });
  return data;
};

/**
 * 원서 접수 취소
 * DELETE /api/v1/applications
 */
export const deleteApplication = async (): Promise<DeleteApplicationResponse> => {
  const { data } = await AdmissionUserInstance.delete<DeleteApplicationResponse>(
    '/api/v1/applications'
  );
  return data;
};

/**
 * 지원정보 상태 조회
 * GET /application/status
 */
export const getApplicationStatus = async (): Promise<IApplicationStatusResponse> => {
  const { data } = await AdmissionUserInstance.get<IApplicationStatusResponse>(
    '/application/status'
  );
  return data;
};
