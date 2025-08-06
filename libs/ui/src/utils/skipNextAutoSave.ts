export const AUTO_SAVE_DELAY = 3000;

export const previousDataRef = { current: null as string | null };
export const isSavingRef = { current: false };
export const skipNextAutoSave = { current: false };

// 수동 저장 타임스탬프 추가
export const lastManualSaveRef = { current: 0 };

// 페이지 네비게이션 추적을 위한 ref 추가
export const lastSavedPageRef = { current: null as string | null };

// 토스트 함수 타입 정의
export type ToastFunction = (message: string, type: 'success' | 'error') => void;

// 전역 토스트 함수 참조
export let globalShowToast: ToastFunction | null = null;

// 전역 토스트 함수 설정
export const setGlobalShowToast = (toastFn: ToastFunction) => {
  globalShowToast = toastFn;
};

// File 객체를 포함한 상태를 직렬화하는 함수 - export 추가
export function serializeStateWithFiles(state: any): string {
  const replacer = (key: string, value: any) => {
    if (value instanceof File) {
      return {
        __isFile: true,
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
        // File 객체의 고유 식별을 위한 해시 생성
        __fileHash: `${value.name}_${value.size}_${value.lastModified}_${value.type}`
      };
    }
    return value;
  };
  
  return JSON.stringify(state, replacer);
}

// 임계영역 - 전역 저장 상태 관리
let savingPromise: Promise<void> | null = null;

export async function performSave(
  state: any,
  saveToStorage: () => Promise<void>,
  isManual: boolean = false,
  currentPage?: string
): Promise<boolean> {
  // console.log(`[PERFORM SAVE] 시작 - ${isManual ? '수동' : '자동'} 저장`);
  // console.log({ currentPage, lastSavedPage: lastSavedPageRef.current, skipNext: skipNextAutoSave.current });

  if (savingPromise) {
    await savingPromise;
    return false;
  }

  if (!isManual && !shouldAllowAutoSave()) {
    return false;
  }

  if (!hasChanged(state)) {
    return false;
  }

  if (currentPage && lastSavedPageRef.current === currentPage) {
    const currentStateStr = serializeStateWithFiles(state);
    if (previousDataRef.current === currentStateStr) {
      return false;
    }
  }

  if (isManual) {
    lastManualSaveRef.current = Date.now();
    skipNextAutoSave.current = true;

    if (currentPage) {
      lastSavedPageRef.current = currentPage;
    }

    setTimeout(() => {
      skipNextAutoSave.current = false;
    }, AUTO_SAVE_DELAY + 500);
  }

  isSavingRef.current = true;
  savingPromise = (async () => {
    try {
      await saveToStorage();
      previousDataRef.current = serializeStateWithFiles(state);

      if (currentPage) {
        lastSavedPageRef.current = currentPage;
      }

      if (globalShowToast) {
        const message = `임시저장이 완료되었습니다.${currentPage ? ` (${currentPage})` : ''}`;
        globalShowToast(message, 'success');
      }
    } catch (err) {
      if (globalShowToast) {
        globalShowToast('저장에 실패했습니다.', 'error');
      }
      throw err;
    } finally {
      isSavingRef.current = false;
      savingPromise = null;
    }
  })();

  await savingPromise;
  return true;
}

export function hasChanged(state: any): boolean {
  if (!state) return false;
  if (!previousDataRef.current) return true;
  
  const currentStateStr = serializeStateWithFiles(state);
  return currentStateStr !== previousDataRef.current;
}

export function shouldAllowAutoSave(): boolean {
  if (skipNextAutoSave.current) {
    return false;
  }

  const timeSinceManualSave = Date.now() - lastManualSaveRef.current;
  if (timeSinceManualSave < AUTO_SAVE_DELAY) {
    return false;
  }

  return true;
}

export function onPageChange(newPage: string) {
  if (lastSavedPageRef.current !== newPage) {
    const timeSinceManualSave = Date.now() - lastManualSaveRef.current;
    if (timeSinceManualSave >= 1000) {
      skipNextAutoSave.current = false;
    }
  }
}

export function confirmManualSaveComplete() {
  // 수동 저장 완료 후 필요한 추가 작업이 있다면 여기에 작성
}