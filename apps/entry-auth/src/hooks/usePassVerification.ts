import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPassPopup, getPassVerifyInfo } from '../apis';

export const usePassVerification = () => {
  const [mdlToken, setMdlToken] = useState<string | null>(null);
  const [isRedirectedFromPass, setIsRedirectedFromPass] =
    useState<boolean>(false);

  const popupMutation = useMutation({
    mutationFn: createPassPopup,
    onSuccess: (html) => {
      // PASS 인증 페이지로 이동
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // 돌아올 페이지 저장
      localStorage.setItem('returnAfterAuth', '/user-info');

      window.location.replace(url);
    },
    onError: (error) => {
      console.error('PASS 인증 페이지 생성 실패:', error);
    },
  });

  const verifyQuery = useQuery({
    queryKey: ['pass-verify', mdlToken],
    queryFn: async () => {
      if (!mdlToken) throw new Error('토큰이 없습니다.');
      const data = await getPassVerifyInfo(mdlToken);
      return data;
    },
    enabled: !!mdlToken,
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mdlTokenFromUrl = urlParams.get('mdl_tkn');

    if (mdlTokenFromUrl) {
      setMdlToken(mdlTokenFromUrl);
      setIsRedirectedFromPass(true);
      localStorage.setItem('mdlToken', mdlTokenFromUrl);

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('mdl_tkn');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, []);

  const startVerification = () => {
    setMdlToken(null);
    setIsRedirectedFromPass(false);
    popupMutation.mutate();
  };

  const reset = () => {
    setMdlToken(null);
    setIsRedirectedFromPass(false);
    localStorage.removeItem('passReturnUrl');
    popupMutation.reset();
  };

  return {
    startVerification,
    isLoading: popupMutation.isPending || verifyQuery.isFetching,
    isVerified: !!verifyQuery.data,
    verifyData: verifyQuery.data,
    error: popupMutation.error || verifyQuery.error,
    isRedirectedFromPass,
    reset,
  };
};
