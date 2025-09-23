import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUpUser } from '../apis/signup';
import { IErrorResponseType, IsignUpRequestType } from '../apis/type';
import { toast } from 'react-toastify';

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: IsignUpRequestType) => signUpUser(userData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('회원가입 성공!');
      console.log('회원가입 성공', data);
    },
    onError: (error: IErrorResponseType) => {
      toast.error('회원가입 실패');
      console.error('회원가입 실패', error);
    },
  });
};
