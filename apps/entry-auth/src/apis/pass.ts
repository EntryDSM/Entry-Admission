import { userInstance } from '@entry/util-config';

export const createPassPopup = async () => {
  const redirectUrl = `${window.location.origin}/user-info`;

  console.log('Frontend redirectUrl:', redirectUrl);

  const res = await userInstance.post('/user/verify/popup', { redirectUrl });
  return res.data;
};

export const getPassVerifyInfo = async (mdlToken: string) => {
  console.log('API 호출 시작 - mdlToken:', mdlToken);

  try {
    const res = await userInstance.get('/user/verify/info', {
      params: {
        mdl_tkn: mdlToken,
      },
    });
    console.log('API 요청 URL:', res.request?.responseURL || res.config.url);
    console.log('보낸 파라미터:', res.config.params);

    console.log('API 응답 성공:', res.data);
    return res.data as { phoneNumber: string; name: string };
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};
