export interface IUserInfoResponseType {
  name: string;
  phoneNumber: string;
  isParent: boolean;
}

export interface IDeleteUserRequestType {
  password: string;
}

export interface IChangePasswordRequestType {
  phoneNumber: string;
  newPassword: string;
}
