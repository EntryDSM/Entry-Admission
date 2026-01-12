import { getAdminId, AdmissionAdminInstance } from '@entry/util-config';
import { IAdminSignInRequestType, ITokenResponseType } from '../type';

// 어드민 로그인
export const loginAdmin = async (
  adminData: IAdminSignInRequestType
): Promise<ITokenResponseType> => {
  const { data } = await AdmissionAdminInstance.post<ITokenResponseType>(
    '/admin/auth',
    adminData
  );
  return data;
};

// 어드민 토큰 갱신
export const refreshAdminToken = async (
  refreshToken: string
): Promise<ITokenResponseType> => {
  
  const { data } = await AdmissionAdminInstance.put<ITokenResponseType>(
    '/admin/auth',
    {},
    {
      headers: {
        'X-Refresh-Token': refreshToken,
      },
    }
  );
  return data;
};
