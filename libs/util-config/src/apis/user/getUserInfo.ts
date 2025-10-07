import { AdmissionUserInstance } from '../instance';
import { IUserInfoResponseType, IDeleteUserRequestType, IChangePasswordRequestType } from './type';

// 유저 정보 조회 API
export const getUserInfo = async (): Promise<IUserInfoResponseType> => {
  const { data } = await AdmissionUserInstance.get<IUserInfoResponseType>('/user/info');
  return data;
};

// 회원 탈퇴 API
export const deleteUser = async (userData: IDeleteUserRequestType): Promise<void> => {
  await AdmissionUserInstance.delete('/user/user', { data: userData });
};

// 비밀번호 변경 API
export const changePassword = async (userData: IChangePasswordRequestType): Promise<void> => {
  await AdmissionUserInstance.patch('/user/password', userData);
};
