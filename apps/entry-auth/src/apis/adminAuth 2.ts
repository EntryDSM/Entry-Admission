import { userInstance, getAdminId } from '@entry/util-config';
import { IAdminSignInRequestType, IAdminSignInResponseType } from './type';

// 어드민 로그인
export const loginAdmin = async (
  adminData: IAdminSignInRequestType
): Promise<IAdminSignInResponseType> => {
  const { data } = await userInstance.post<IAdminSignInResponseType>(
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
): Promise<IAdminSignInResponseType> => {
  const adminId = getAdminId();

  const { data } = await userInstance.put<IAdminSignInResponseType>(
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
