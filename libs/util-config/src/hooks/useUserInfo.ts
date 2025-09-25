import { useQuery } from '@tanstack/react-query';
import { getUserInfo, IUserInfoResponseType } from '../apis';
import { getAccessToken } from '@entry/util-config';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const useUserInfo = () => {
  const accessToken = getAccessToken();

  const query = useQuery<IUserInfoResponseType, AxiosError>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount: number, error: AxiosError) => {
      const status = error.response?.status;
      return status !== 401 && status !== 404 && failureCount < 1;
    },
  });

  useEffect(() => {
    if (query.error) {
      const status = query.error.response?.status;
      const messages = {
        401: '인증되지 않은 사용자',
        404: '사용자를 찾을 수 없음',
      } as const;

      console.error(
        '유저 정보 조회 실패:',
        messages[status as keyof typeof messages] || query.error.message
      );
    }
  }, [query.error]);

  return query;
};
