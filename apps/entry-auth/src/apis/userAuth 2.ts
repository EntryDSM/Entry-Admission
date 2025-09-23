import { userInstance } from '@entry/util-config';
import { IsignInRequestType, IsignInResponseType } from './type';

// 유저 로그인
export const loginUser = async (
  userData: IsignInRequestType
): Promise<IsignInResponseType> => {
  const { data } = await userInstance.post<IsignInResponseType>(
    '/user/auth',
    userData
  );
  return data;
};

// 유저 토큰 갱신
export const refreshUserToken = async (
  refreshToken: string
): Promise<IsignInResponseType> => {
  const { data } = await userInstance.put<IsignInResponseType>(
    '/user/auth',
    {},
    {
      headers: { 'X-Refresh-Token': refreshToken },
    }
  );
  return data;
};
