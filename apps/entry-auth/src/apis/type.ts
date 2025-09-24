// 회원가입
export interface IsignUpRequestType {
  phoneNumber: string;
  password: string;
  isParent: boolean;
}

// 로그인
export interface IsignInRequestType {
  phoneNumber: string;
  password: string;
}

// 비밀번호 변경
export interface IChangePasswordRequestType {
  phoneNumber: string;
  newPassword: string;
}

// 토큰 갱신
export interface IRefreshTokenHeaderType {
  'X-Refresh-Token': string;
}

// 관리자 로그인
export interface IAdminSignInRequestType {
  adminId: string;
  password: string;
}

// 관지라 토큰 갱신
export interface IAdminRefreshTokenHeaderType {
  'X-Refresh-Token': string;
}

// 에러 응답
export interface IErrorResponseType {
  status: number;
  message: string;
}

// token res
export interface ITokenResponseType {
  accessToken: string;
  refreshToken: string;
}
