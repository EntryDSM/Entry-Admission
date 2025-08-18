import { ApplicationState } from './ApplicationDataContext';

// 빈 값 체크
const isEmpty = (value: any) => value === null || value === undefined || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0);

// 필드 값 가져오기
const getFieldValue = (obj: any, field: string) => obj && typeof obj === 'object' ? obj[field] : undefined;

// /first 페이지 특별 검증 함수
const validateFirstPage = (data: any) => {
  const missingFields = [];
  
  // 기본 필수 필드들
  ['typeSelection', 'regionSelection', 'graduationType'].forEach(field => {
    if (isEmpty(getFieldValue(data, field))) {
      missingFields.push(field);
    }
  });
  
  // graduationType에 따른 graduationDate 검증
  const graduationType = getFieldValue(data, 'graduationType');
  if (graduationType && graduationType !== '검정고시 (중학교 졸업 학력)') {
    if (isEmpty(getFieldValue(data, 'graduationDate'))) {
      missingFields.push('graduationDate');
    }
  }
  
  return missingFields;
};

// 페이지별 필수 필드 검증
const pageValidations: Record<string, (data: any) => string[]> = {
  '/first': validateFirstPage,
  '/second': d => ['idPhoto','applicantName','dateOfBirth','gender'].filter(f => isEmpty(getFieldValue(d,f))),
  '/third': d => ['guardianName','applicantNumber','guardianNumber','gender','relationship','postalCode','address', 'addressDetail'].filter(f => isEmpty(getFieldValue(d,f))),
  '/fourth': d => ['schoolName', 'studentId', 'schoolPhone','teacherName'].filter(f => isEmpty(getFieldValue(d,f))),
  '/fifth': d => ['personalStmt','studyPlan'].filter(f => isEmpty(getFieldValue(d,f))),
  '/first-graduate': d => ['kor','soc','his','math','sci','tech','eng'].filter(f => isEmpty(getFieldValue(d,f))),
  '/second-graduate': d => ['kor','soc','his','math','sci','tech','eng'].filter(f => isEmpty(getFieldValue(d,f))),
  '/third-graduate': d => ['kor','soc','his','math','sci','tech','eng'].filter(f => isEmpty(getFieldValue(d,f))),
  '/fourth-graduate': d => ['kor','soc','his','math','sci','tech','eng'].filter(f => isEmpty(getFieldValue(d,f))),
  '/activity-graduate': d => ['earlyLeave','tardiness','classExit','absence','volunteer','unexcused','dsmAlgorithm','certificate'].filter(f => isEmpty(getFieldValue(d,f))),
  '/first-prospective-graduate': d => ['kor','soc','his','math','sci','tech','eng'].filter(f => isEmpty(getFieldValue(d,f))),
  '/second-prospective-graduate': d => ['kor','soc','his','math','sci','tech','eng'].filter(f => isEmpty(getFieldValue(d,f))),
  '/third-prospective-graduate': d => ['kor','soc','his','math','sci','tech','eng'].filter(f => isEmpty(getFieldValue(d,f))),
  '/activity-prospective-graduate': d => ['earlyLeave','tardiness','classExit','absence','volunteer','unexcused', 'dsmAlgorithm', 'certificate'].filter(f => isEmpty(getFieldValue(d,f))),
  '/ged/score': d => ['kor','soc','his','sci','tech','math','eng'].filter(f => isEmpty(getFieldValue(d,f))),
  '/ged/attendance-volunteer': d => ['dsmAlgorithm','certificate'].filter(f => isEmpty(getFieldValue(d,f))),
};

// 필드명 한국어 매핑
const fieldNameMap: Record<string, string> = {
  typeSelection: '전형 선택',
  regionSelection: '지역 선택',
  graduationType: '졸업 구분',
  graduationDate: '졸업 연월',
  idPhoto: '증명 사진',
  applicantName: '지원자 성명',
  dateOfBirth: '생년월일',
  gender: '성별',
  guardianName: '보호자 성명',
  applicantNumber: '지원자 연락처',
  guardianNumber: '보호자 연락처',
  relationship: '지원자와의 관계',
  postalCode: '우편번호',
  address: '주소',
  addressDetail: '상세 주소',
  schoolName: '중학교 이름',
  studentId: '중학교 학번',
  schoolPhone: '중학교 전화번호',
  teacherName: '중학교 교사 성명',
  personalStmt: '자기소개서',
  studyPlan: '학업계획서',
  kor: '국어 성적',
  soc: '사회 성적',
  his: '역사 성적',
  math: '수학 성적',
  sci: '과학 성적',
  tech: '기술·가정 성적',
  eng: '영어 성적',
  earlyLeave: '조퇴',
  tardiness: '지각',
  classExit: '결과',
  absence: '결석',
  volunteer: '봉사시간',
  unexcused: '미인정',
  dsmAlgorithm: 'DSM 알고리즘 대회 입상',
  certificate: '정보처리기능사 자격증 취득',
};

// 데이터 검증
export const validatePageData = (state: ApplicationState, route: string) => {
  const validator = pageValidations[route];
  if (!validator) return { isValid: true, missingFields: [] };

  let data: any = {};
  switch(route){
    case '/first': data = state.first || {}; break;
    case '/second': data = state.second || {}; break;
    case '/third': data = state.third || {}; break;
    case '/fourth': data = state.fourth || {}; break;
    case '/fifth': data = state.fifth || {}; break;
    case '/first-graduate': data = state.firstGraduate || {}; break;
    case '/second-graduate': data = state.secondGraduate || {}; break;
    case '/third-graduate': data = state.thirdGraduate || {}; break;
    case '/fourth-graduate': data = state.fourthGraduate || {}; break;
    case '/activity-graduate': data = state.activityGraduate || {}; break;
    case '/first-prospective-graduate': data = state.firstGraduateProspective || {}; break;
    case '/second-prospective-graduate': data = state.secondGraduateProspective || {}; break;
    case '/third-prospective-graduate': data = state.thirdGraduateProspective || {}; break;
    case '/activity-prospective-graduate': data = state.activityGraduateProspective || {}; break;
    case '/ged/score': data = state.gedScore || {}; break;
    case '/ged/attendance-volunteer': data = state.attendanceVolunteer || {}; break;
    default: return { isValid: true, missingFields: [] };
  }

  const missingFields = validator(data);
  return { isValid: missingFields.length === 0, missingFields };
};

// 다음 페이지 이동 가능 여부
export const canProceedToNext = (state: ApplicationState, currentRoute: string) => {
  const { isValid, missingFields } = validatePageData(state, currentRoute);
  if (!isValid) {
    const missingFieldsKR = missingFields.map(f => fieldNameMap[f] || f);
    return { canProceed: false, message: `필수 항목이 누락되었습니다: ${missingFieldsKR.join(', ')}` };
  }
  return { canProceed: true };
};