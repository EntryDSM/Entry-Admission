import { useMutation } from '@tanstack/react-query';
import { IsignInRequestType } from '../apis/type';
import { loginUser } from '../apis';
import { setAccessToken, setRefreshToken } from '@entry/util-config';
import { toast } from 'react-toastify';

export const useUserLogin = () => {
  return useMutation({
    mutationFn: (userData: IsignInRequestType) => loginUser(userData),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      toast.success('로그인 성공!');
      window.location.href = 'https://entrydsm.kr/mypage';
    },
    onError: (error: unknown) => {
      let errorMessage = '로그인에 실패했습니다.';

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number } };

        switch (axiosError.response?.status) {
          case 401:
            errorMessage = '비밀번호가 일치하지 않습니다.';
            break;
          case 404:
            errorMessage = '존재하지 않는 전화번호입니다.';
            break;
          default:
            errorMessage = '로그인에 실패했습니다.';
        }
      }

      toast.error(errorMessage);
    },
  });
};
