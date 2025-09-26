import { useMutation } from '@tanstack/react-query';
import { IAdminSignInRequestType } from '../apis/type';
import { loginAdmin } from '../apis';
import { setAdminAccessToken, setAdminRefreshToken, setAdminId } from '@entry/util-config';
import { toast } from 'react-toastify';

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: (adminData: IAdminSignInRequestType) => loginAdmin(adminData),
    onSuccess: (data, variables) => {
      setAdminAccessToken(data.accessToken);
      setAdminRefreshToken(data.refreshToken);
      setAdminId(variables.adminId);
      window.location.href = 'https://admin.entrydsm.kr';
    },
    onError: (error: unknown) => {
      let errorMessage = '로그인에 실패했습니다.';

      // error가 axios error인지 확인
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number } };

        if (axiosError.response?.status === 401) {
          errorMessage = '비밀번호가 일치하지 않습니다.';
        } else if (axiosError.response?.status === 404) {
          errorMessage = '존재하지 않는 관리자 ID입니다.';
        }
      }

      toast.error(errorMessage);
    },
  });
};
