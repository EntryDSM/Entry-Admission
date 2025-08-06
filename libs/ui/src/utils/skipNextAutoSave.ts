export const AUTO_SAVE_DELAY = 3000;

export const previousDataRef = { current: null as string | null };
export const isSavingRef = { current: false };
export const skipNextAutoSave = { current: false };

// 토스트 함수 타입 정의
export type ToastFunction = (message: string, type: 'success' | 'error') => void;

// 임계영역 - 전역 저장 상태 관리
let savingPromise: Promise<void> | null = null;

export async function performSave(
  state: any,
  saveToStorage: () => Promise<void>,
  showToast?: ToastFunction
): Promise<boolean> {
  // 이미 저장 중이면 해당 Promise를 대기
  if (savingPromise) {
    await savingPromise;
    return false; // 중복 저장 방지
  }

  // 변경사항이 없으면 저장하지 않음
  if (!hasChanged(state)) {
    return false;
  }

  // 임계영역 시작
  isSavingRef.current = true;
  savingPromise = (async () => {
    try {
      await saveToStorage();
      previousDataRef.current = JSON.stringify(state);
      console.log('performSave - 저장 완료');
      
      if (showToast) {
        showToast('임시저장이 완료되었습니다.', 'success');
      }

    } catch (err) {
      if (showToast) {
        showToast('저장에 실패했습니다.', 'error');
      }
      console.error(err);
      throw err;
    } finally {
      isSavingRef.current = false;
      savingPromise = null; // 임계영역 종료
    }
  })();

  await savingPromise;
  return true;
}

export function hasChanged(state: any): boolean {
  if (!state || !previousDataRef.current) return false;
  return JSON.stringify(state) !== previousDataRef.current;
}