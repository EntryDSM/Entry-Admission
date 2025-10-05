export interface IAdmissionRequest {
  applicantName: string, //applicant-info, 지원자 성명
  applicantTel: string, //applicant-info, 지원자 연락처
  applicationType: string | null, //application-classification, 전형 선택 
  educationalStatus: string | null, //application-classification, 졸업 구분
  birthDate: string, //applicant-info, 생년월일
  applicantGender: string, //applicant-info, 지원자 성별
  streetAddress: string, //guardian-info, 기본주소
  postalCode: string, //guardian-info, 우편번호
  detailAddress: string, //guardian-info, 상세주소
  isDaejeon: boolean, //application-classification, 지역 선택
  parentName: string, //guardian-info, 보호자 성명
  parentTel: string, //guardian-info, 보호자 연락처
  parentRelation: string, //guardian-info, 지원자와의 관계
  guardianGender: string, //guardian-info, 성별
  schoolCode: string | null, //middle-school-info, 학교 코드
  schoolName: string | null, //middle-school-info, 학교 이름
  studentId: number | null, //middle-school-info, 중학교 학번
  schoolPhone: string | null, //middle-school-info, 중학교 전화번호 
  teacherName: string | null, //middle-school-info, 중학교 교사 성명
  nationalMeritChild: boolean, //applicant-info, 국가 유공자 체크
  specialAdmissionTarget: boolean, //applicant-info, 특례입학 대상
  graduationDate: string | null, //application-classification, 졸업 예정 연월
  studyPlan: string, //personal-statements, 학업계획서
  selfIntroduce: string, //personal-statements, 자기소개
  korean_3_1: number | null,
  social_3_1: number | null,
  history_3_1: number | null,
  math_3_1: number | null,
  science_3_1: number | null,
  tech_3_1: number | null,
  english_3_1: number | null,
  korean_3_2: number | null,
  social_3_2: number | null,
  history_3_2: number | null,
  math_3_2: number | null,
  science_3_2: number | null,
  tech_3_2: number | null,
  english_3_2: number | null,
  korean_2_2: number | null,
  social_2_2: number | null,
  history_2_2: number | null,
  math_2_2: number | null,
  science_2_2: number | null,
  tech_2_2: number | null,
  english_2_2: number | null,
  korean_2_1: number | null,
  social_2_1: number | null,
  history_2_1: number | null,
  math_2_1: number | null,
  science_2_1: number | null,
  tech_2_1: number | null,
  english_2_1: number | null,
  gedKorean: number | null,
  gedSocial: number | null,
  gedHistory: number | null,
  gedMath: number | null,
  gedScience: number | null,
  gedTech: number | null,
  gedEnglish: number | null,
  absence: number | null, //결석
  tardiness: number | null, //지각
  earlyLeave: number | null, //조퇴
  classExit: number | null, //결과
  unexcused: number | null, //미인정
  volunteer: number | null, //봉사
  algorithmAward: boolean,
  infoProcessingCert: boolean
}
