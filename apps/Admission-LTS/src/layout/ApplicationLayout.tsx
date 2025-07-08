import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { PreviousButton } from '@entry/ui';
import { Flex, Text } from '@entry/design-token';
import { useCallback, useEffect, useRef } from 'react';
import { useApplicationData } from '@entry/ui';
import {
  skipNextAutoSave,
  previousDataRef,
  isSavingRef,
  performSave,
  hasChanged,
  AUTO_SAVE_DELAY,
} from '@entry/ui';

export const ApplicationLayout = () => {
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { saveToStorage, loadFromStorage, state } = useApplicationData();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (state && previousDataRef.current === null) {
      previousDataRef.current = JSON.stringify(state);
    }
  }, [state]);

  const handleManualSave = async () => {
    if (isSavingRef.current) {
      console.log('이미 저장 중입니다.');
      return;
    }
    await performSave(state, saveToStorage);
  };

  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(async () => {
      if (!isSavingRef.current && hasChanged(state)) {
        await performSave(state, saveToStorage);
      }
    }, AUTO_SAVE_DELAY);
  }, [state, saveToStorage]);

  useEffect(() => {
    if (!state || !previousDataRef.current || isSavingRef.current) return;

    const currentDataString = JSON.stringify(state);
    const hasDataChanged = currentDataString !== previousDataRef.current;

    if (skipNextAutoSave.current) {
      console.log('[SKIP] 이전 수동 저장 직후. skipNextAutoSave = true');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          skipNextAutoSave.current = false;
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
