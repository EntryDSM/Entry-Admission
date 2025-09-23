import { userInstance } from '@entry/util-config';
import { IsignUpRequestType, ITokenResponseType } from '../type';

export const signUpUser = async (
  useData: IsignUpRequestType
): Promise<ITokenResponseType> => {
  const { data } = await userInstance.post<ITokenResponseType>(
    '/user',
    useData
  );
  return data;
};
