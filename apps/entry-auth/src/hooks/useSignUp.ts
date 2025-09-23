import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IErrorResponseType, IsignUpRequestType, signUpUser } from '../apis';

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: IsignUpRequestType) => signUpUser(userData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      console.log('회원가입 성공', data);
    },
    onError: (error: IErrorResponseType) => {
      console.error('회원가입 실패', error);
    },
  });
};
