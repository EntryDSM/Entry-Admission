// 회원가입
export interface IsignUpRequestType {
  phoneNumber: string;
  password: string;
  isParent: boolean;
}

export interface IsignUpResponseType {
  acceessToken: string;
  refreshToken: string;
}

// 로그인
export interface IsignInRequestType {
  phoneNumber: string;
  password: string;
}

export interface IsignInResponseType {
  accessToken: string;
  refreshToken: string;
}

// 토큰 갱신
export interface IRefreshTokenHeaderType {
  'X-Refresh-Token': string;
}

export interface IRefreshTokenResponseType {
  accessToken: string;
  refreshToken: string;
}

// 관리자 로그인
export interface IAdminSignInRequestType {
  adminId: string;
  password: string;
}

export interface IAdminSignInResponseType {
  accessToken: string;
  refreshToken: string;
}

// 관지라 토큰 갱신
export interface IAdminRefreshTokenHeaderType {
  'X-Refresh-Token': string;
}

export interface IAdminRefreshTokenResponseType {
  accessToken: string;
  refreshToken: string;
}

// 에러 응답
export interface IErrorResponseType {
  status: number;
  message: string;
}
