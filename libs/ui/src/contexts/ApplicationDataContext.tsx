import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';

interface IApplicationClassificationType {
  typeSelection: string;
  regionSelection: string;
  graduationType: string;
  graduationDate: (string | number)[];
}

interface IApplicantInfoType {
  idPhoto: string | null;
  applicantName: string;
  dateOfBirth: (string | number)[];
  specialNotes: string;
  gender: string;
}

interface IGuardianInfoType {
  guardianName: string;
  applicantNumber: string;
  guardianNumber: string;
  gender: string;
  relationship: string[];
  postalCode: string; //우편번호
  address: string; //기본주소
  addressDetail: string; //상세주소
}

interface IMiddleSchoolInfoType {
  schoolName: string;
  schoolCode: string;
  studentId: number | null;
  schoolPhone: string;
  teacherName: string;
}

interface IPersonalStatementsType {
  personalStmt: string;
  studyPlan: string;
}

interface IGedScoreType {
  kor: number | null;
  soc: number | null;
  his: number | null;
  sci: number | null;
  tech: number | null;
  math: number | null;
  eng: number | null;
}

interface IGedAttendanceVolunteerType {
  dsmAlgorithm: 'O' | 'X' | null;
  certificate: 'O' | 'X' | null;
}

interface IScoreType {
  kor: string | null; // 국어
  soc: string | null; // 사회
  his: string | null; // 역사
  math: string | null; // 수학
  sci: string | null; // 과학
  tech: string | null; // 기술 · 가정
  eng: string | null; //영어
  [key: string]: string | null;
}

interface IActivityType {
  earlyLeave: string; //조퇴
  tardiness: string; //지각
  classExit: string; //결과
  absence: string; //결석
  dsmAlgorithm: 'O' | 'X' | null;
  certificate: 'O' | 'X' | null;
  volunteer: string; //봉사시간
  unexcused: string; //미인정
}

export interface ApplicationState {
  applicationClassification: IApplicationClassificationType;
  applicantInfo: IApplicantInfoType;
  guardianInfo: IGuardianInfoType;
  middleSchoolInfo: IMiddleSchoolInfoType;
  personalStatements: IPersonalStatementsType;
  gedScore: IGedScoreType;
  attendanceVolunteer: IGedAttendanceVolunteerType;
  firstGraduate: IScoreType;
  secondGraduate: IScoreType;
  thirdGraduate: IScoreType;
  fourthGraduate: IScoreType;
  activityGraduate: IActivityType;
  firstGraduateProspective: IScoreType;
  secondGraduateProspective: IScoreType;
  thirdGraduateProspective: IScoreType;
  activityGraduateProspective: IActivityType;
}

type ApplicationAction =
  | {
      type: 'UPDATE_PAGE_DATA';
      payload: { page: keyof ApplicationState; data: any };
    }
  | { type: 'LOAD_FROM_STORAGE'; payload: ApplicationState }
  | { type: 'CLEAR_ALL_DATA' };

const initialState: ApplicationState = {
  applicationClassification: {
    typeSelection: '',
    regionSelection: '',
    graduationType: '',
    graduationDate: [],
  },
  applicantInfo: {
    idPhoto: null,
    applicantName: '',
    dateOfBirth: [],
    specialNotes: '',
    gender: '',
  },
  guardianInfo: {
    guardianName: '',
    applicantNumber: '',
    guardianNumber: '',
    gender: '',
    relationship: [],
    postalCode: '',
    address: '',
    addressDetail: '',
  },
  middleSchoolInfo: {
    schoolName: '',
    schoolCode: '',
    studentId: null,
    schoolPhone: '',
    teacherName: '',
  },
  personalStatements: {
    personalStmt: '',
    studyPlan: '',
  },
  gedScore: {
    kor: null,
    soc: null,
    his: null,
    sci: null,
    tech: null,
    math: null,
    eng: null,
  },
  attendanceVolunteer: {
    dsmAlgorithm: null,
    certificate: null,
  },
  firstGraduate: {
    kor: null, // 국어
    soc: null, // 사회
    his: null, // 역사
    math: null, // 수학
    sci: null, // 과학
    tech: null, // 기술 · 가정
    eng: null, //영어
  },
  secondGraduate: {
    kor: null, // 국어
    soc: null, // 사회
    his: null, // 역사
    math: null, // 수학
    sci: null, // 과학
    tech: null, // 기술 · 가정
    eng: null, //영어
  },
  thirdGraduate: {
    kor: null, // 국어
    soc: null, // 사회
    his: null, // 역사
    math: null, // 수학
    sci: null, // 과학
    tech: null, // 기술 · 가정
    eng: null, //영어
  },
  fourthGraduate: {
    kor: null, // 국어
    soc: null, // 사회
    his: null, // 역사
    math: null, // 수학
    sci: null, // 과학
    tech: null, // 기술 · 가정
    eng: null, //영어
  },
  activityGraduate: {
    earlyLeave: '', //조퇴
    tardiness: '', //지각
    classExit: '', //결과
    absence: '', //결석
    dsmAlgorithm: null,
    certificate: null,
    volunteer: '', //봉사시간
    unexcused: '', //미인정
  },
  firstGraduateProspective: {
    kor: null, // 국어
    soc: null, // 사회
    his: null, // 역사
    math: null, // 수학
    sci: null, // 과학
    tech: null, // 기술 · 가정
    eng: null, //영어
  },
  secondGraduateProspective: {
    kor: null, // 국어
    soc: null, // 사회
    his: null, // 역사
    math: null, // 수학
    sci: null, // 과학
    tech: null, // 기술 · 가정
    eng: null, //영어
  },
  thirdGraduateProspective: {
    kor: null, // 국어
    soc: null, // 사회
    his: null, // 역사
    math: null, // 수학
    sci: null, // 과학
    tech: null, // 기술 · 가정
    eng: null, //영어
  },
  activityGraduateProspective: {
    earlyLeave: '', //조퇴
    tardiness: '', //지각
    classExit: '', //결과
    absence: '', //결석
    dsmAlgorithm: null,
    certificate: null,
    volunteer: '', //봉사시간
    unexcused: '', //미인정
  },
};

const applicationReducer = (
  state: ApplicationState,
  action: ApplicationAction
): ApplicationState => {
  switch (action.type) {
    case 'UPDATE_PAGE_DATA':
      return {
        ...state,
        [action.payload.page]: {
          ...state[action.payload.page],
          ...action.payload.data,
        },
      };
    case 'LOAD_FROM_STORAGE':
      return action.payload;
    case 'CLEAR_ALL_DATA':
      return initialState;
    default:
      return state;
  }
};

interface ApplicationContextType {
  state: ApplicationState;
  updatePageData: (page: keyof ApplicationState, data: any) => void;
  saveToStorage: () => void;
  loadFromStorage: () => void;
  clearAllData: () => void;
}

const ApplicationDataContext = createContext<
  ApplicationContextType | undefined
>(undefined);

const STORAGE_KEY = 'applicationFormData';

const saveToLocalStorage = (data: ApplicationState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('데이터가 localStorage에 저장되었습니다.');
  } catch (error) {
    console.error('localStorage 저장 실패:', error);
  }
};

const loadFromLocalStorage = (): ApplicationState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      console.log('localStorage에서 데이터를 불러왔습니다:', data);
      return data;
    }
    return null;
  } catch (error) {
    console.error('localStorage 로드 실패:', error);
    return null;
  }
};

const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('localStorage 데이터가 삭제되었습니다.');
  } catch (error) {
    console.error('localStorage 삭제 실패:', error);
  }
};

export const ApplicationDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // localStorage에서 초기 데이터 로드
  const [state, dispatch] = useReducer(applicationReducer, () => {
    const savedData = loadFromLocalStorage();
    return savedData || initialState;
  });

  const updatePageData = useCallback(
    (page: keyof ApplicationState, data: any) => {
      dispatch({ type: 'UPDATE_PAGE_DATA', payload: { page, data } });
    },
    []
  );

  const saveToStorage = useCallback(() => {
    saveToLocalStorage(state);
    console.log('데이터가 임시저장되었습니다.');
  }, [state]);

  const loadFromStorage = useCallback(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: savedData });
      console.log('저장된 데이터를 불러왔습니다.');
    }
  }, []);

  const clearAllData = useCallback(() => {
    clearLocalStorage();
    dispatch({ type: 'CLEAR_ALL_DATA' });
    console.log('모든 데이터가 삭제되었습니다.');
  }, []);

  // 상태 변경 시 자동으로 localStorage에 저장
  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  const value: ApplicationContextType = {
    state,
    updatePageData,
    saveToStorage,
    loadFromStorage,
    clearAllData,
  };

  return (
    <ApplicationDataContext.Provider value={value}>
      {children}
    </ApplicationDataContext.Provider>
  );
};

export const useApplicationData = () => {
  const context = useContext(ApplicationDataContext);
  if (context === undefined) {
    throw new Error(
      'useApplicationData must be used within an ApplicationDataProvider'
    );
  }
  return context;
};

export const usePageData = <T extends keyof ApplicationState>(page: T) => {
  const { state, updatePageData } = useApplicationData();

  const pageData = state[page];
  const setPageData = useCallback(
    (data: any) => {
      updatePageData(page, data);
    },
    [page, updatePageData]
  );

  return [pageData, setPageData] as const;
};