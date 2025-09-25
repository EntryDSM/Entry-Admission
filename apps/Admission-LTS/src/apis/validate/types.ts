interface IProspectiveGraduateRequest {
  applicationType: string,
  educationalStatus: string,
  scoreData: {
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


interface IGraduateRequest {
  applicationType: string,
  educationalStatus: string,
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
  applicationType: string,
  educationalStatus: string,
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


export type IValidateRequest = IProspectiveGraduateRequest | IGraduateRequest | IGedRequest;