import { userInstance, getAdminId } from '@entry/util-config';
import { IAdminSignInRequestType, ITokenResponseType } from '../type';

// 어드민 로그인
export const loginAdmin = async (
  adminData: IAdminSignInRequestType
): Promise<ITokenResponseType> => {
  const { data } = await userInstance.post<ITokenResponseType>(
    '/admin/auth',
    adminData,
    {
      headers: {
        'Request-User-Id': adminData.adminId,
        'Request-User-Role': 'ADMIN',
      },
    }
  );
  return data;
};

// 어드민 토큰 갱신
export const refreshAdminToken = async (
  refreshToken: string
): Promise<ITokenResponseType> => {
  const adminId = getAdminId();

  const { data } = await userInstance.put<ITokenResponseType>(
    '/admin/auth',
    {},
    {
      headers: {
        'X-Refresh-Token': refreshToken,
        'Request-User-Id': adminId,
        'Request-User-Role': 'ADMIN',
      },
    }
  );
  return data;
};
