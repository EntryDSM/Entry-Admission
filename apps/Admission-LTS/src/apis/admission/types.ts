interface IProspectiveGraduateRequest {
  application: {
    applicationType: string,//"GENERAL"
    educationalStatus: string,//"GRADUATE_EXPECTED"
    region: string,//"DAEJEON"
    typeSelection: string,
    regionSelection: string,
    graduationType: string,
    graduationDate: string,
    idPhoto: string,
    applicantName: string,
    applicantGender: string,
    dateOfBirth: string,
    specialNotes: string,
    guardianName: string,
    applicantNumber: string,
    guardianNumber: string,
    guardianGender: string,
    relationship: string,
    address: string,
    addressDetail: string,
    postalCode: string,
    schoolName: string,
    studentId: string,
    schoolPhone: string,
    teacherName: string,
    schoolCode: string, //api 상 안 추가되어 있음 현재는
    personalStmt: string,
    studyPlan: string,
  },
  scores : {
    grade3_1: {
      korean_3_1: number;
      social_3_1: number;
      history_3_1: number;
      science_3_1: number;
      tech_3_1: number;
      math_3_1: number;
      english_3_1: number;
    },
    grade2_2: {
      korean_2_2: number;
      social_2_2: number;
      history_2_2: number;
      science_2_2: number;
      tech_2_2: number;
      math_2_2: number;
      english_2_2: number;
    },
    grade2_1: {
      korean_2_1: number;
      social_2_1: number;
      history_2_1: number;
      science_2_1: number;
      tech_2_1: number;
      math_2_1: number;
      english_2_1: number;
    },
    attendanceService: {
      absence: number; //결석
      tardiness: number; //지각
      earlyLeave: number; //조퇴
      classExit: number; //결과
      volunteer: number; //봉사시간
      algorithmAward: boolean;
      certificate: boolean;
      unexcused: number; //미인정
    }
  }
}


interface IGraduateRequest {
  userId: string;
  typeSelection: string,
  regionSelection: string,
  graduationType: string,
  graduationDate: string,
  idPhoto: string,
  applicantName: string,
  dateOfBirth: string,
  specialNotes: string,
  applicantGender: string,
  guardianName: string,
  applicantNumber: string,
  guardianNumber: string,
  guardianGender: string,
  relationship: string,
  postalCode: string,
  address: string,
  addressDetail: string,
  schoolName: string,
  schoolCode: string,
  studentId: string,
  schoolPhone: string,
  teacherName: string,
  personalStmt: string,
  studyPlan: string,
  scores: {
    kor3_2: number;
    soc3_2: number;
    his3_2: number;
    sci3_2: number;
    tech3_2: number;
    math3_2: number;
    eng3_2: number;

    kor3_1: number;
    soc3_1: number;
    his3_1: number;
    sci3_1: number;
    tech3_1: number;
    math3_1: number;
    eng3_1: number;
    
    kor2_2: number;
    soc2_2: number;
    his2_2: number;
    sci2_2: number;
    tech2_2: number;
    math2_2: number;
    eng2_2: number;

    kor2_1: number;
    soc2_1: number;
    his2_1: number;
    sci2_1: number;
    tech2_1: number;
    math2_1: number;
    eng2_1: number;

    earlyLeave: number; //조퇴
    tardiness: number; //지각
    classExit: number; //결과
    absence: number; //결석
    dsmAlgorithm: 'O' | 'X'; //점수로 계산할 시 수정
    certificate: 'O' | 'X';
    volunteer: number; //봉사시간
    unexcused: number; //미인정
  };
}



interface IGedRequest {
  userId: string;
  typeSelection: string,
  regionSelection: string,
  graduationType: string,
  graduationDate: string,
  idPhoto: string,
  applicantName: string,
  dateOfBirth: string,
  specialNotes: string,
  applicantGender: string,
  guardianName: string,
  applicantNumber: string,
  guardianNumber: string,
  guardianGender: string,
  relationship: string,
  postalCode: string,
  address: string,
  addressDetail: string,
  personalStmt: string,
  studyPlan: string,
  scores: {
    gedKor: number;
    gedSoc: number;
    gedHis: number;
    gedSci: number;
    gedTech: number;
    gedMath: number;
    gedEng: number;
  
    dsmAlgorithm: 'O' | 'X'; //점수로 계산할 시 수정
    certificate: 'O' | 'X';
  };
}


export type IAdmissionRequest = IProspectiveGraduateRequest | IGraduateRequest | IGedRequest;