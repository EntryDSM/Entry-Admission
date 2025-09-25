import { userInstance } from '@entry/util-config';
import { IUserInfoResponseType } from './type';

// 유저 정보 조회 API
export const getUserInfo = async (): Promise<IUserInfoResponseType> => {
  const { data } = await userInstance.get<IUserInfoResponseType>('/user/info');
  return data;
};
