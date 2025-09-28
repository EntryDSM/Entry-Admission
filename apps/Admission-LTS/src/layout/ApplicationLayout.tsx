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
  shouldAllowAutoSave,
  setGlobalShowToast,
  serializeStateWithFiles,
  AUTO_SAVE_DELAY,
  type ToastFunction,
} from '@entry/ui';
import { toast } from 'react-toastify';

export const ApplicationLayout = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState<string>('지원자 전형 구분');
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { saveToStorage, loadFromStorage, state } = useApplicationData();

  // 전역 토스트 함수 정의 및 등록
  const showToast = useCallback<ToastFunction>((message, type) => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }, []);

  // 전역 토스트 함수 등록
  useEffect(() => {
    setGlobalShowToast(showToast);
  }, [showToast]);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (state && previousDataRef.current === null) {
      previousDataRef.current = serializeStateWithFiles(state);
    }
  }, [state]);

  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(async () => {
      // 자동 저장 허용 여부 체크
      if (!shouldAllowAutoSave()) {
        return;
      }

      if (!isSavingRef.current && hasChanged(state)) {
        // isManual = false로 설정하여 자동 저장임을 표시
        await performSave(state, saveToStorage, false);
        if (state) {
          previousDataRef.current = serializeStateWithFiles(state);
        }
      }
    }, AUTO_SAVE_DELAY);
  }, [state, saveToStorage]);

  useEffect(() => {
    if (!state || !previousDataRef.current || isSavingRef.current) return;

    const currentDataString = serializeStateWithFiles(state);
    const hasDataChanged = currentDataString !== previousDataRef.current;

    if (hasDataChanged) {
      scheduleAutoSave();
    }
  }, [state, scheduleAutoSave]);

  useEffect(() => {
    if (pathname.includes('applicant-info')) {
      setTitle('지원자 인적사항');
    } else if (pathname.includes('guardian-info')) {
      setTitle('보호자 인적사항');
    } else if (pathname.includes('middle-school-info')) {
      setTitle('중학교 정보 입력');
    } else if (pathname.includes('personal-statements')) {
      setTitle('자기소개서 & 학업계획서');
    } else if(pathname.includes('application-classification')) {
      setTitle('지원자 전형 구분');
    } else if(pathname.includes('submit-check') || pathname.includes('application-preview') ) {
      setTitle('');
    } else {
      setTitle('성적 기입')
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