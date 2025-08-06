import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { Text } from '@entry/design-token';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useApplicationData } from '@entry/ui';
import {
  skipNextAutoSave,
  previousDataRef,
  isSavingRef,
  performSave,
  hasChanged,
  AUTO_SAVE_DELAY,
  type ToastFunction,
} from '@entry/ui';
import { toast } from 'react-toastify';

export const ApplicationLayout = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState<string>('지원자 전형 구분');
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { saveToStorage, loadFromStorage, state } = useApplicationData();

  // 토스트 함수 정의
  const showToast = useCallback<ToastFunction>((message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
}, []);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (state && previousDataRef.current === null) {
      previousDataRef.current = JSON.stringify(state);
    }
  }, [state]);

  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(async () => {
      if (!isSavingRef.current && hasChanged(state)) {
        await performSave(state, saveToStorage, showToast);
        previousDataRef.current = JSON.stringify(state);
      }
    }, AUTO_SAVE_DELAY);
  }, [state, saveToStorage, showToast]);

  const hasLoggedSkip = useRef(false);

  useEffect(() => {
    if (!state || !previousDataRef.current || isSavingRef.current) return;

    const currentDataString = JSON.stringify(state);
    const hasDataChanged = currentDataString !== previousDataRef.current;

    if (skipNextAutoSave.current) {
      if (!hasLoggedSkip.current) {
        console.log('[SKIP] 이전 수동 저장 직후. skipNextAutoSave = true');
        showToast("임시 저장이 완료되었습니다.", "success");
        hasLoggedSkip.current = true;
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          skipNextAutoSave.current = false;
          hasLoggedSkip.current = false;
        });
      });
      previousDataRef.current = currentDataString;
      return;
    }

    if (hasDataChanged) {
      console.log('[AUTO SAVE TRIGGER]');
      scheduleAutoSave();
    }
  }, [state, scheduleAutoSave]);


  useEffect(() => {
    if (pathname.includes('second')) {
      setTitle('지원자 인적사항');
    } else if (pathname.includes('third')) {
      setTitle('보호자 인적사항');
    } else if (pathname.includes('fourth')) {
      setTitle('중학교 정보 입력');
    } else if (pathname.includes('fifth')) {
      setTitle('자기소개서 & 학업계획서 ');
    } else {
      setTitle('지원자 전형 구분');
    }
  }, [pathname]);

  return (
    <Container>
      <TitleSection>
        <Text fontSize={32} fontWeight={600}>
          {title}
        </Text>
      </TitleSection>
      <ContentSection>
        <Outlet />
      </ContentSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const TitleSection = styled.div`
  width: 100%;
`;

const ContentSection = styled.div`
  width: 100%;
  flex: 1;
`;