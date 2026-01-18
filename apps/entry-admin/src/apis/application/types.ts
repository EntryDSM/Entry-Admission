// 원서 전체 조회 타입
export interface IApplicationAllListRequest {
  applicationType: 'COMMON' | 'MEISTER' | 'SOCIAL';
  educationalStatus: 'PROSPECTIVE_GRADUATE' | 'GRADUATE' | 'QUALIFICATION_EXAM';
  isDaejeon: boolean;
  page: number;
  size: number;
}

// 원서 전체 조회
export interface IApplicationAllListResponse {
  applicants: IApplicationType[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

// 원서 전체 조회 Applicant
export interface IApplicationType {
  receiptCode: number;
  applicantName: string;
  applicationType: string;
  educationalStatus: string;
  isDaejeon: boolean;
  isArrived: boolean;
}

// 원서 상세 조회 타입
export interface IApplicationDetailRequest {
  receiptCode: number;
}

export interface IApplicationDetailResponse {
  commonInformation: {
    name: string;
    parentName: string;
    parentTel: string;
  };
  moreInformation: {
    photoUrl: string;
    birthDay: string;
    applicationStatus: string;
    educationalStatus: string;
    applicationType: string;
    isDaejeon: boolean;
  } | null;
  evaluation: {
    totalScore: number;
    totalGradeScore: number;
    attendanceScore: number;
    volunteerScore: number;
    extraScore: number;
    selfIntroduce?: string | null;
    studyPlan?: string | null;
  } | null;
}

// 상세 정보
export interface IApplicationDetail {
  commonInformation: {
    name: string;
    parentName: string;
    parentTel: string;
  };
  moreInformation: {
    photoUrl: string;
    birthDay: string;
    applicationStatus: string;
    educationalStatus: string;
    applicationType: string;
    isDaejeon: boolean;
  } | null;
  evaluation: {
    totalScore: number;
    totalGradeScore: number;
    attendanceScore: number;
    volunteerScore: number;
    extraScore: number;
    selfIntroduce?: string | null;
    studyPlan?: string | null;
  } | null;
}
