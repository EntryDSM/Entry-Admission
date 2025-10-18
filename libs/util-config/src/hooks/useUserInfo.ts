import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserInfo, IUserInfoResponseType } from '../apis';
import { getAccessToken } from './cookies';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const useUserInfo = () => {
  const accessToken = getAccessToken();
  const queryClient = useQueryClient();

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
      // 401, 403은 인터셉터에서 처리하도록 재시도 허용, 404만 재시도 안함
      return status !== 404 && failureCount < 1;
    },
  });

  useEffect(() => {
    if (query.error) {
      const status = query.error.response?.status;
      const messages = {
        401: '인증되지 않은 사용자',
        403: '접근 권한이 없습니다',
        404: '사용자를 찾을 수 없음',
      } as const;

      console.error(
        '유저 정보 조회 실패:',
        messages[status as keyof typeof messages] || query.error.message
      );
    }
  }, [query.error]);

  // 토큰이 없을 때 React Query 캐시 리셋
  useEffect(() => {
    if (!accessToken) {
      queryClient.removeQueries({ queryKey: ['userInfo'] });
    }
  }, [accessToken, queryClient]);

  return query;
};
