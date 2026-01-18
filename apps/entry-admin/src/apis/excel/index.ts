import { useMutation } from '@tanstack/react-query';
import { AdmissionAdminInstance } from '@entry/util-config';
import { toast, type Id } from 'react-toastify';
import { AxiosError } from 'axios';

// 지원서 점검표 출력
export const useDownloadCheckListExcel = () => {
  return useMutation({
    mutationKey: ['download-check-list'],
    mutationFn: async () => {
      const toastId: Id = toast.info('지원서 점검표 다운로드를 시작합니다...', {
        autoClose: false,
        closeButton: false,
      });

      const start = Date.now();

      const interval = setInterval(() => {
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        toast.update(toastId, {
          render: `다운로드 중... ${elapsed}s 경과`,
        });
      }, 1000);

      try {
        const response = await AdmissionAdminInstance.get(
          '/admin/application/excel/applicants/check-list',
          { responseType: 'blob' }
        );

        clearInterval(interval);

        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `check-list-${
          new Date().toISOString().split('T')[0]
        }.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        const total = ((Date.now() - start) / 1000).toFixed(1);
        toast.update(toastId, {
          render: `다운로드 완료! (${total}s 소요)`,
          type: 'success',
          autoClose: 3000,
          closeButton: true,
        });

        return total;
      } catch (error) {
        clearInterval(interval);
        toast.update(toastId, {
          render: '다운로드 실패: 서버 오류 또는 네트워크 문제',
          type: 'error',
          autoClose: 4000,
          closeButton: true,
        });
        throw error;
      }
    },
  });
};

// 전형 자료 출력
export const useDownloadApplicationInfoExcel = () => {
  return useMutation({
    mutationKey: ['download-application-info'],
    mutationFn: async () => {
      const toastId: Id = toast.info('전형자료 다운로드를 시작합니다...', {
        autoClose: false,
        closeButton: false,
      });

      const start = Date.now();

      const interval = setInterval(() => {
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        toast.update(toastId, {
          render: `전형자료 다운로드 중... ${elapsed}s 경과`,
        });
      }, 1000);

      try {
        const response = await AdmissionAdminInstance.get(
          '/admin/application/excel/applicants',
          { responseType: 'blob' }
        );

        clearInterval(interval);

        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `application-info-${
          new Date().toISOString().split('T')[0]
        }.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        const total = ((Date.now() - start) / 1000).toFixed(1);
        toast.update(toastId, {
          render: `전형자료 다운로드 완료! (${total}s 소요)`,
          type: 'success',
          autoClose: 3000,
          closeButton: true,
        });

        return total;
      } catch (error) {
        clearInterval(interval);
        toast.update(toastId, {
          render: '다운로드 실패: 서버 오류 또는 네트워크 문제',
          type: 'error',
          autoClose: 4000,
          closeButton: true,
        });
        throw error;
      }
    },
  });
};

// 1차 합격자 목록 출력
export const useDownloadApplicantCodesExcel = () => {
  return useMutation({
    mutationKey: ['download-applicant-codes'],
    mutationFn: async () => {
      const toastId: Id = toast.info(
        '1차 합격자 목록 다운로드를 시작합니다...',
        {
          autoClose: false,
          closeButton: false,
        }
      );

      const start = Date.now();

      const interval = setInterval(() => {
        const elapsed = ((Date.now() - start) / 1000).toFixed(1);
        toast.update(toastId, {
          render: `1차 합격자 목록 다운로드 중... ${elapsed}s 경과`,
        });
      }, 1000);

      try {
        const response = await AdmissionAdminInstance.get(
          '/admin/application/excel/applicants/code',
          { responseType: 'blob' }
        );

        clearInterval(interval);

        // 다운로드 처리
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `1차-합격자-목록-${
          new Date().toISOString().split('T')[0]
        }.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        const total = ((Date.now() - start) / 1000).toFixed(1);
        toast.update(toastId, {
          render: `1차 합격자 목록 다운로드 완료 (${total}s 소요)`,
          type: 'success',
          autoClose: 3000,
          closeButton: true,
        });

        return total;
      } catch (err) {
        clearInterval(interval);

        const error = err as AxiosError;

        // 합격자 없는 경우
        if (error?.response?.status === 404) {
          toast.update(toastId, {
            render: '1차 합격자가 없습니다.',
            type: 'warning',
            autoClose: 4000,
            closeButton: true,
          });
          return;
        }

        toast.update(toastId, {
          render: '1차 합격자 목록 다운로드 실패 (서버 오류)',
          type: 'error',
          autoClose: 4000,
          closeButton: true,
        });

        throw error;
      }
    },
  });
};

// 수험표 출력
export const useDownloadAdmissionTicketExcel = () => {
  return useMutation({
    mutationFn: async () => {
      const startTime = Date.now();
      const toastId = toast.loading('수험표 파일 생성 중입니다...');

      try {
        const response = await AdmissionAdminInstance.get(
          '/admin/application/excel/admission-ticket',
          { responseType: 'blob' }
        );

        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);

        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `admission-ticket-${
          new Date().toISOString().split('T')[0]
        }.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.update(toastId, {
          render: `다운로드 완료! (${duration}초 소요)`,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });

        return 'success';
      } catch (error) {
        toast.update(toastId, {
          render: '다운로드 실패: 서버 오류가 발생했습니다.',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
        throw error;
      }
    },
  });
};
