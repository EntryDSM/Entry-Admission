import type { IPdfPreviewFailedRequest, IPdfPreviewSuccessRequest } from './types';

// PDF 미리보기 성공 로그를 Meerkat에 전송 (에러 발생 시 메인 애플리케이션에 영향 없음)
export const sendPdfPreviewSuccess = async (data: IPdfPreviewSuccessRequest) => {
  try {
    await fetch('https://meeeeercat.ncloud.sbs/v1/pdf/preview-success', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    // 로깅 실패해도 무시 (메인 애플리케이션에 영향 없음)
    console.error('PDF preview success logging failed:', error);
  }
};

// PDF 미리보기 실패 로그를 Meerkat에 전송 (에러 발생 시 메인 애플리케이션에 영향 없음)
export const sendPdfPreviewFailed = async (data: IPdfPreviewFailedRequest) => {
  try {
    await fetch('https://meeeeercat.ncloud.sbs/v1/pdf/preview-failed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (error) {
    // 로깅 실패해도 무시 (메인 애플리케이션에 영향 없음)
    console.error('PDF preview failed logging failed:', error);
  }
};
