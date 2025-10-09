export interface DeleteApplicationResponse {
  success: boolean;
  message: string;
}

// 지원정보 상태 조회 응답
export interface IApplicationStatusResponse {
  receiptCode: number;
  phoneNumber: string;
  name: string;
  isSubmitted: boolean;
  isPrintedArrived: boolean;
  selfIntroduce: string;
  studyPlan: string;
}
