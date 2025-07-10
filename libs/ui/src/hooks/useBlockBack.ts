import { useEffect } from 'react';

export const useBlockBack = () => {
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // 뒤로가기를 눌렀을 때 history를 다시 앞으로 밀기
      window.history.pushState(null, document.title, window.location.href);
    };

    // 페이지가 로드될 때 히스토리 상태를 하나 추가해 둠
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
};
