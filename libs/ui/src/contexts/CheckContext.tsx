import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';

interface ICheckType {
  message: string;
}

interface CheckState {
  check: ICheckType;
}

type CheckAction =
  | {
      type: 'UPDATE_PAGE_DATA';
      payload: { page: keyof CheckState; data: any };
    }
  | { type: 'CLEAR_ALL_DATA' };

const initialState: CheckState = {
  check: {
    message: '',
  },
};

const applicationReducer = (
  state: CheckState,
  action: CheckAction
): CheckState => {
  switch (action.type) {
    case 'UPDATE_PAGE_DATA':
      return {
        ...state,
        [action.payload.page]: {
          ...state[action.payload.page],
          ...action.payload.data,
        },
      };
    case 'CLEAR_ALL_DATA':
      return initialState;
    default:
      return state;
  }
};

interface CheckContextType {
  state: CheckState;
  updatePageData: (page: keyof CheckState, data: any) => void;
  clearAllData: () => void;
}

const CheckDataContext = createContext<CheckContextType | undefined>(undefined);

export const CheckDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  const updatePageData = useCallback((page: keyof CheckState, data: any) => {
    dispatch({ type: 'UPDATE_PAGE_DATA', payload: { page, data } });
  }, []);

  const clearAllData = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_DATA' });
  }, []);

  const value: CheckContextType = {
    state,
    updatePageData,
    clearAllData,
  };

  return (
    <CheckDataContext.Provider value={value}>
      {children}
    </CheckDataContext.Provider>
  );
};

export const useCheckData = () => {
  const context = useContext(CheckDataContext);
  if (context === undefined) {
    throw new Error('useCheckData must be used within an CheckDataProvider');
  }
  return context;
};

export const useCheckPageData = <T extends keyof CheckState>(page: T) => {
  const { state, updatePageData } = useCheckData();

  const pageData = state[page];
  const setPageData = useCallback(
    (data: any) => {
      updatePageData(page, data);
    },
    [page, updatePageData]
  );

  return [pageData, setPageData] as const;
};
