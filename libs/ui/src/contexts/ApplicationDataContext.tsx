import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';

interface IFirstPageType {
  typeSelection: string;
  regionSelection: string;
  graduationType: string;
  graduationDate: (string | number)[];
}

interface ISecondPageType {
  idPhoto: string | null;
  applicantName: string;
  dateOfBirth: (string | number)[];
  specialNotes: string;
  gender: string,
}

interface IThirdPageType {
  guardianName: string;
  applicantNumber: string;
  guardianNumber: string;
  gender: string;
  relationship: string[];
  postalCode: string,//우편번호
  address: string, //기본주소
  addressDetail: string,//상세주소
}

interface IFourthPageType {
  schoolName: string;
  studentId: number | null;
  schoolPhone: string;
  teacherName: string;
}

interface IFifthPageType {
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
  eng: string | null;//영어
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
  unexcused : string,//미인정
}

export interface ApplicationState {
  first: IFirstPageType;
  second: ISecondPageType;
  third: IThirdPageType;
  fourth: IFourthPageType;
  fifth: IFifthPageType;
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
  first: {
    typeSelection: '',
    regionSelection: '',
    graduationType: '',
    graduationDate: [],
  },
  second: {
    idPhoto: null,
    applicantName: '',
    dateOfBirth: [],
    specialNotes: '',
    gender: ''
  },
  third: {
    guardianName: '',
    applicantNumber: '',
    guardianNumber: '',
    gender: '',
    relationship: [],
    postalCode: '',
    address: '',
    addressDetail: '',
  },
  fourth: {
    schoolName: '',
    studentId: null,
    schoolPhone: '',
    teacherName: '',
  },
  fifth: {
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
    unexcused : '',//미인정
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
    unexcused : '',//미인정
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
  saveToStorage: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  clearAllData: () => void;
}

const ApplicationDataContext = createContext<
  ApplicationContextType | undefined
>(undefined);

const DB_NAME = 'ApplicationFormDB';
const DB_VERSION = 1;
const STORE_NAME = 'formData';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

const saveToIndexedDB = async (data: ApplicationState): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  await new Promise<void>((resolve, reject) => {
    const request = store.put({ id: 'applicationData', data });
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

const loadFromIndexedDB = async (): Promise<ApplicationState | null> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get('applicationData');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result;
      resolve(result ? result.data : null);
    };
  });
};

export const ApplicationDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  const updatePageData = useCallback(
    (page: keyof ApplicationState, data: any) => {
      dispatch({ type: 'UPDATE_PAGE_DATA', payload: { page, data } });
    },
    []
  );

  const saveToStorage = useCallback(async () => {
    try {
      await saveToIndexedDB(state);
      console.log('데이터가 임시저장되었습니다.');
    } catch (error) {
      console.error('임시저장 실패:', error);
    }
  }, [state]);

  const loadFromStorage = useCallback(async () => {
    try {
      const savedData = await loadFromIndexedDB();
      if (savedData) {
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: savedData });
        console.log('저장된 데이터를 불러왔습니다.');
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  }, []);

  const clearAllData = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_DATA' });
  }, []);

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
