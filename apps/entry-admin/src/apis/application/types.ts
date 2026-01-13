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
  success: boolean;
  data: {
    applicationId: string;
    userId: string;
    receiptCode: number;
    applicantName: string;
    applicantTel: string;
    parentName: string;
    parentTel: string;
    birthDate: string;
    applicationType: string;
    educationalStatus: string;
    status: string;
    submittedAt: string;
    reviewedAt: string;
    createdAt: string;
    updatedAt: string;
    photoUrl: string;
    studyPlan: string;
    selfIntroduce: string;
    isDaejeon: boolean;
    scores: {
      totalScore: number;
      subjectScore: number;
      attendanceScore: number;
      volunteerScore: number;
      bonusScore: number;
    };
  };
}

// 상세 정보
export interface IApplicationDetail {
  applicationId: string;
  userId: string;
  receiptCode: number;
  applicantName: string;
  applicantTel: string;
  parentName: string;
  parentTel: string;
  birthDate: string;
  applicationType: string;
  educationalStatus: string;
  status: string;
  submittedAt: string;
  reviewedAt: string;
  createdAt: string;
  updatedAt: string;
}
