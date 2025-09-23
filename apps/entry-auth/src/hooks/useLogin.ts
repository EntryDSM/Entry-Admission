import { useMutation } from '@tanstack/react-query';
import { IsignInRequestType } from '../apis/type';
import { loginUser } from '../apis';
import { setAccessToken, setRefreshToken } from '@entry/util-config';
import { toast } from 'react-toastify';

export const useUserLogin = () => {
  return useMutation({
    mutationFn: (userData: IsignInRequestType) => loginUser(userData),
    onSuccess: (data) => {
      console.log('유저 로그인 성공!', data);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      toast.success('로그인 성공!');
    },
    onError: (error: unknown) => {
      console.error('유저 로그인 실패: ', error);

      let errorMessage = '로그인에 실패했습니다.';

      // error가 axios error인지 확인
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number } };

        if (axiosError.response?.status === 401) {
          errorMessage = '전화번호 또는 비밀번호가 잘못되었습니다.';
        }
      }

      toast.error(errorMessage);
    },
  });
};
