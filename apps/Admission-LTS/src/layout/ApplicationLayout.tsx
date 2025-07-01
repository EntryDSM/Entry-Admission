import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { PreviousButton } from '@entry/ui';
import { Flex, Text } from '@entry/design-token';
import { useCallback, useEffect, useRef } from 'react';
import { useApplicationData } from '@entry/ui';
import { toast } from 'react-toastify';

// 자동 저장 관련 상수
const AUTO_SAVE_DELAY = 3000; // 3초

export const ApplicationLayout = () => {
  // 저장 관련 상태
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousDataRef = useRef<string | null>(null);
  const isSavingRef = useRef<boolean>(false);

  const { saveToStorage, loadFromStorage, state } = useApplicationData();

  // 초기 데이터 로딩
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // 초기 상태 설정 (한 번만 실행)
  useEffect(() => {
    if (state && previousDataRef.current === null) {
      previousDataRef.current = JSON.stringify(state);
    }
  }, [state]);

  // 수동 저장 함수
  const handleManualSave = async () => {
    if (isSavingRef.current) {
      console.log('이미 저장 중입니다.');
      return;
    }

    await performSave();
  };

  // 실제 저장 로직
  const performSave = async () => {
    isSavingRef.current = true;

    try {
      await saveToStorage();
      updateSavedDataReference();
      toast.success('임시저장이 완료되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      toast.error('저장에 실패했습니다.');
    } finally {
      isSavingRef.current = false;
    }
  };

  // 저장 완료 후 기준 데이터 업데이트
  const updateSavedDataReference = () => {
    if (state) {
      previousDataRef.current = JSON.stringify(state);
    }
  };

  // 자동 저장 타이머 설정
  const scheduleAutoSave = useCallback(() => {
    // 기존 타이머가 있으면 취소
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // 새로운 자동 저장 타이머 설정
    autoSaveTimerRef.current = setTimeout(async () => {
      if (!isSavingRef.current) {
        await performSave();
      }
    }, AUTO_SAVE_DELAY);
  }, []);

  // 데이터 변경 감지 및 자동 저장 트리거
  useEffect(() => {
    // 초기 로딩 중이거나 저장 중이면 무시
    if (!state || !previousDataRef.current || isSavingRef.current) {
      return;
    }

    const currentDataString = JSON.stringify(state);
    const hasDataChanged = currentDataString !== previousDataRef.current;

    if (hasDataChanged) {
      scheduleAutoSave();
    }
  }, [state, scheduleAutoSave]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, []);

  return (
    <Flex width="100%" height="fit-content">
      <Main>
        <Flex isColumn={true} gap={125} height="fit-content" width="100%">
          <Flex
            isColumn={true}
            gap={60}
            width="100%"
            alignItems="fit-content"
            height="fit-content"
          >
            <Flex
              width="100%"
              height="fit-content"
              justifyContent="space-between"
            >
              <Text fontSize={32} fontWeight={600}>
                지원자 전형 구분
              </Text>
              <PreviousButton onClick={handleManualSave}>
                임시 저장
              </PreviousButton>
            </Flex>
            <Outlet />
          </Flex>
        </Flex>
      </Main>
    </Flex>
  );
};

const Main = styled.main`
  margin-top: 70px;
  width: 100%;
`;
