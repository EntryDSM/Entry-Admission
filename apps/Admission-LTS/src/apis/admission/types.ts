export interface IAdmissionRequest {
  applicantInfo: IApplicantInfo
  addressInfo: IAddressInfo
  applicationInfo: IApplicationInfo
  schoolInfo: ISchoolInfo
  gradeInfo: IGradeInfo
  attendanceInfo: IAttendanceInfo
  awardAndCertificateInfo: IAwardAndCertificateInfo
}

interface IApplicantInfo {
  applicantName: string // applicant-info, 지원자 성명
  applicantTel: string // applicant-info, 지원자 연락처
  birthDate: string // applicant-info, 생년월일
  applicantGender: string // applicant-info, 지원자 성별

  parentName: string // guardian-info, 보호자 성명
  parentTel: string // guardian-info, 보호자 연락처
  parentRelation: string // guardian-info, 지원자와의 관계

}

interface IAddressInfo {
  isDaejeon: boolean // application-classification, 지역 선택
  streetAddress: string // guardian-info, 기본주소
  detailAddress: string // guardian-info, 상세주소
  postalCode: string // guardian-info, 우편번호
}

interface IApplicationInfo {
  applicationType: string | null // application-classification, 전형 선택
  educationalStatus: string | null // application-classification, 졸업 구분
  studentNumber: string | null // middle-school-info, 중학교 학번
  graduationDate: string | null // application-classification, 졸업 예정 연월
  
  studyPlan: string // personal-statements, 학업계획서
  selfIntroduce: string // personal-statements, 자기소개
  
  nationalMeritChild: boolean // applicant-info, 국가 유공자 체크
  specialAdmissionTarget: boolean // applicant-info, 특례입학 대상
}

interface ISchoolInfo {
  schoolCode: string | null // middle-school-info, 학교 코드
  schoolName: string | null // middle-school-info, 학교 이름
  schoolPhone: string | null // middle-school-info, 중학교 전화번호
  teacherName: string | null // middle-school-info, 중학교 교사 성명
}

interface IGradeInfo {
  koreanGrade: string | null
  socialGrade: string | null
  historyGrade: string | null
  mathGrade: string | null
  scienceGrade: string | null
  englishGrade: string | null
  techAndHomeGrade: string | null

  gedKorean: number | null
  gedSocial: number | null
  gedMath: number | null
  gedScience: number | null
  gedEnglish: number | null
  gedHistory: number | null
}

interface IAttendanceInfo {
  absence: number | null // 결석
  tardiness: number | null // 지각
  earlyLeave: number | null // 조퇴
  classExit: number | null // 결과
  volunteer: number | null // 봉사
}

interface IAwardAndCertificateInfo {
  algorithmAward: boolean
  infoProcessingCert: boolean
}
