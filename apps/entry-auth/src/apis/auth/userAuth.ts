import { userInstance } from '@entry/util-config';
import { IsignInRequestType, ITokenResponseType } from '../type';

// 유저 로그인
export const loginUser = async (
  userData: IsignInRequestType
): Promise<ITokenResponseType> => {
  const { data } = await userInstance.post<ITokenResponseType>(
    '/user/auth',
    userData
  );
  return data;
};

// 유저 토큰 갱신
export const refreshUserToken = async (
  refreshToken: string
): Promise<ITokenResponseType> => {
  const { data } = await userInstance.put<ITokenResponseType>(
    '/user/auth',
    {},
    {
      headers: { 'X-Refresh-Token': refreshToken },
    }
  );
  return data;
};
