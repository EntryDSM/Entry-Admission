import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';

interface IScoreType {
  kor: string | null;
  soc: string | null;
  his: string | null;
  math: string | null;
  sci: string | null;
  tech: string | null;
  [key: string]: string | null;
}

interface IActivityType {
  absences: string;
  earlyLeaves: string;
  lateArrivals: string;
  resultMissing: string;
  volunteerHours: string;
  dsmAlgorithm: 'O' | 'X' | null;
  infoProcessing: 'O' | 'X' | null;
}

interface IQEScoreType {
  korean: string;
  social: string;
  history: string;
  science: string;
  technology: string;
  math: string;
}

interface CalculationState {
  primaryThird: IScoreType;
  primarySecond: IScoreType;
  primaryFirst: IScoreType;
  primaryActivity: IActivityType;
  
  graduatedThird2: IScoreType;
  graduatedThird1: IScoreType;
  graduatedSecond2: IScoreType;
  graduatedSecond1: IScoreType;
  graduatedActivity: IActivityType;
  
  qeScore: IQEScoreType;
  qeActivity: IActivityType;
}

type CalculationAction =
  | {
      type: 'UPDATE_PAGE_DATA';
      payload: { page: keyof CalculationState; data: any };
    }
  | { type: 'LOAD_FROM_STORAGE'; payload: CalculationState }
  | { type: 'CLEAR_ALL_DATA' };

const initialState: CalculationState = {
  primaryThird: {
    kor: null,
    soc: null,
    his: null,
    math: null,
    sci: null,
    tech: null,
  },
  primarySecond: {
    kor: null,
    soc: null,
    his: null,
    math: null,
    sci: null,
    tech: null,
  },
  primaryFirst: {
    kor: null,
    soc: null,
    his: null,
    math: null,
    sci: null,
    tech: null,
  },
  primaryActivity: {
    absences: '',
    earlyLeaves: '',
    lateArrivals: '',
    resultMissing: '',
    volunteerHours: '',
    dsmAlgorithm: null,
    infoProcessing: null,
  },
  
  graduatedThird2: {
    kor: null,
    soc: null,
    his: null,
    math: null,
    sci: null,
    tech: null,
  },
  graduatedThird1: {
    kor: null,
    soc: null,
    his: null,
    math: null,
    sci: null,
    tech: null,
  },
  graduatedSecond2: {
    kor: null,
    soc: null,
    his: null,
    math: null,
    sci: null,
    tech: null,
  },
  graduatedSecond1: {
    kor: null,
    soc: null,
    his: null,
    math: null,
    sci: null,
    tech: null,
  },
  graduatedActivity: {
    absences: '',
    earlyLeaves: '',
    lateArrivals: '',
    resultMissing: '',
    volunteerHours: '',
    dsmAlgorithm: null,
    infoProcessing: null,
  },
  
  qeScore: {
    korean: '',
    social: '',
    history: '',
    science: '',
    technology: '',
    math: '',
  },
  qeActivity: {
    absences: '',
    earlyLeaves: '',
    lateArrivals: '',
    resultMissing: '',
    volunteerHours: '',
    dsmAlgorithm: null,
    infoProcessing: null,
  },
};

const calculationReducer = (
  state: CalculationState,
  action: CalculationAction
): CalculationState => {
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

interface CalculationContextType {
  state: CalculationState;
  updatePageData: (page: keyof CalculationState, data: any) => void;
  saveToStorage: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  clearAllData: () => void;
}

const CalculationDataContext = createContext<
  CalculationContextType | undefined
>(undefined);

const DB_NAME = 'CalculationFormDB';
const DB_VERSION = 1;
const STORE_NAME = 'calculationData';

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

const saveToIndexedDB = async (data: CalculationState): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  await new Promise<void>((resolve, reject) => {
    const request = store.put({ id: 'calculationData', data });
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

const loadFromIndexedDB = async (): Promise<CalculationState | null> => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get('calculationData');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result;
      resolve(result ? result.data : null);
    };
  });
};

export const CalculationDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(calculationReducer, initialState);

  const updatePageData = useCallback(
    (page: keyof CalculationState, data: any) => {
      dispatch({ type: 'UPDATE_PAGE_DATA', payload: { page, data } });
    },
    []
  );

  const saveToStorage = useCallback(async () => {
    try {
      await saveToIndexedDB(state);
      console.log('계산 데이터가 저장되었습니다.');
    } catch (error) {
      console.error('계산 데이터 저장 실패:', error);
    }
  }, [state]);

  const loadFromStorage = useCallback(async () => {
    try {
      const savedData = await loadFromIndexedDB();
      if (savedData) {
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: savedData });
        console.log('저장된 계산 데이터를 불러왔습니다.');
      }
    } catch (error) {
      console.error('계산 데이터 로드 실패:', error);
    }
  }, []);

  const clearAllData = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_DATA' });
  }, []);

  const value: CalculationContextType = {
    state,
    updatePageData,
    saveToStorage,
    loadFromStorage,
    clearAllData,
  };

  return (
    <CalculationDataContext.Provider value={value}>
      {children}
    </CalculationDataContext.Provider>
  );
};

export const useCalculationData = () => {
  const context = useContext(CalculationDataContext);
  if (context === undefined) {
    throw new Error(
      'useCalculationData must be used within a CalculationDataProvider'
    );
  }
  return context;
};

export const useCalculationPageData = <T extends keyof CalculationState>(page: T) => {
  const { state, updatePageData } = useCalculationData();

  const pageData = state[page];
  const setPageData = useCallback(
    (data: CalculationState[T]) => {
      updatePageData(page, data);
    },
    [page, updatePageData]
  );

  return [pageData, setPageData] as const;
};
