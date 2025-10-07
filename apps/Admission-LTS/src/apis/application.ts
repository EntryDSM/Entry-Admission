// import { TestInstance } from '@entry/util-config';

export interface ApplicationData {
  entranceYear: string;
  receiptCode: string;
  schoolCode: string;
  userName: string;
  applicantTel: string;
  birthday: string;
  schoolRegion: string;
  gender: string;
  schoolName: string;
  educationalStatus: string;
  address: string;
  detailAddress: string;
  parentName: string;
  parentRelation: string;
  parentTel: string;
  region: string;
  applicationType: string;
  applicationRemark: string;
  imageUrl: string;
  absenceDayCount: string;
  latenessCount: string;
  earlyLeaveCount: string;
  lectureAbsenceCount: string;
  volunteerTime: string;
  koreanThirdGradeSecondSemester: string;
  koreanThirdGradeFirstSemester: string;
  koreanSecondGradeSecondSemester: string;
  koreanSecondGradeFirstSemester: string;
  socialThirdGradeSecondSemester: string;
  socialThirdGradeFirstSemester: string;
  socialSecondGradeSecondSemester: string;
  socialSecondGradeFirstSemester: string;
  historyThirdGradeSecondSemester: string;
  historyThirdGradeFirstSemester: string;
  historySecondGradeSecondSemester: string;
  historySecondGradeFirstSemester: string;
  mathThirdGradeSecondSemester: string;
  mathThirdGradeFirstSemester: string;
  mathSecondGradeSecondSemester: string;
  mathSecondGradeFirstSemester: string;
  scienceThirdGradeSecondSemester: string;
  scienceThirdGradeFirstSemester: string;
  scienceSecondGradeSecondSemester: string;
  scienceSecondGradeFirstSemester: string;
  applicationCase: string;
  techAndHomeThirdGradeSecondSemester: string;
  techAndHomeThirdGradeFirstSemester: string;
  techAndHomeSecondGradeSecondSemester: string;
  techAndHomeSecondGradeFirstSemester: string;
  englishThirdGradeSecondSemester: string;
  englishThirdGradeFirstSemester: string;
  englishSecondGradeSecondSemester: string;
  englishSecondGradeFirstSemester: string;
  hasCompetitionPrize: string;
  hasCertificate: string;
  year: string;
  month: string;
  day: string;
  veteransNumber: string;
  teacherName: string;
  teacherTel: string;
  examCode: string;
  selfIntroduction: string;
  studyPlan: string;
}

// // 원서 접수/수정 (Upsert)
// export const submitApplication = async (data: ApplicationData) => {
//   const response = await TestInstance.post('/application', data);
//   return response.data;
// };

// // 원서 확정
// export const confirmApplication = async () => {
//   const response = await TestInstance.patch('/application/confirm');
//   return response.data;
// };

// // 원서 확정 취소
// export const cancelApplication = async () => {
//   const response = await TestInstance.patch('/application/cancel');
//   return response.data;
// };

// // 원서 PDF 미리보기용 URL 생성
// export const getApplicationPDFUrl = async (): Promise<string> => {
//   const response = await TestInstance.get('/application/pdf', {
//     responseType: 'blob',
//   });

//   // Blob URL 생성하여 반환
//   return window.URL.createObjectURL(new Blob([response.data]));
// };

// // 원서 PDF 다운로드
// export const downloadApplicationPDF = async () => {
//   const response = await TestInstance.get('/application/pdf', {
//     responseType: 'blob',
//   });

//   // Blob으로 파일 다운로드 처리
//   const url = window.URL.createObjectURL(new Blob([response.data]));
//   const link = document.createElement('a');
//   link.href = url;
//   link.setAttribute('download', '입학원서.pdf');
//   document.body.appendChild(link);
//   link.click();
//   link.remove();
//   window.URL.revokeObjectURL(url);
// };

// // 이미지 업로드
// export const uploadImage = async (file: File) => {
//   const formData = new FormData();
//   formData.append('image', file);

//   const response = await TestInstance.post('/upload-image', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };