import { AdmissionAdminInstance } from '@entry/util-config';

// 자기소개서 PDF (1차 합격자 전체) 다운로드
export const getIntroductionPdf = async (): Promise<Blob> => {
  const response = await AdmissionAdminInstance.get('/api/v1/admin/pdf/introduction', {
    responseType: 'blob',
    headers: { Accept: 'application/pdf' },
  });
  return response.data as Blob;
};


