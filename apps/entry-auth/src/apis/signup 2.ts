import { userInstance } from '@entry/util-config';
import { IsignUpRequestType, IsignUpResponseType } from './type';

export const signUpUser = async (
  useData: IsignUpRequestType
): Promise<IsignUpResponseType> => {
  const { data } = await userInstance.post<IsignUpResponseType>(
    '/user',
    useData
  );
  return data;
};
