export interface IAdmissionRequest {
  userId: string;
  application: {
    applicantName: string;
    applicantTel: string;
    parentName: string;
    parentTel: string;
    sex: string;
    birthDate: string;
    streetAddress: string;
    postalCode: string;
    detailAddress: string;
    isDaejeon: boolean;
    applicationType: string;
    applicationRemark: string;
    educationalStatus: string;
  };
  scores: {
    [key: string]: object;
  };
}
