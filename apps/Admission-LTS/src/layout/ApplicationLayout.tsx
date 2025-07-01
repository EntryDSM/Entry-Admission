import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { PreviousButton } from '@entry/ui';
import { Flex, Text } from '@entry/design-token';
import { useCallback, useEffect, useRef } from 'react';
import { useApplicationData } from '@entry/ui';
import { toast } from 'react-toastify';

export const ApplicationLayout = () => {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousStateRef = useRef<string | null>(null);

  const { saveToStorage, loadFromStorage, state } = useApplicationData();

  // 컴포넌트 마운트 시 저장된 데이터 로딩
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // 초기 로딩 시 이전 상태 설정
  useEffect(() => {
    if (state && previousStateRef.current === null) {
      previousStateRef.current = JSON.stringify(state);
    }
  }, [state]);

  const handleTempSave = async () => {
    await saveToStorage();
    // 저장 후 이전 상태 업데이트
    if (state) {
      previousStateRef.current = JSON.stringify(state);
    }
    toast.success('임시저장이 완료되었습니다.');
  };

  // 키 입력 후 3초 이상 변화 없으면 저장
  const triggerDebouncedSave = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      await saveToStorage();
      // 저장 후 이전 상태 업데이트
      if (state) {
        previousStateRef.current = JSON.stringify(state);
      }
      toast.success('임시저장이 완료되었습니다.');
    }, 3000);
  }, [saveToStorage, state]);

  // 실제로 데이터가 변경되었을 때만 저장 트리거
  useEffect(() => {
    if (state && previousStateRef.current) {
      const currentStateString = JSON.stringify(state);
      // 이전 상태와 현재 상태를 비교
      if (currentStateString !== previousStateRef.current) {
        triggerDebouncedSave();
      }
    }
  }, [state, triggerDebouncedSave]);

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
              <PreviousButton onClick={handleTempSave}>
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
