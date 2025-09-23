import { userInstance } from '@entry/util-config';

export const createPassPopup = async () => {
  const redirectUrl = `${window.location.origin}/user-info`;

  const res = await userInstance.post('/user/verify/popup', { redirectUrl });
  return res.data;
};

export const getPassVerifyInfo = async (mdlToken: string) => {
  try {
    const res = await userInstance.get('/user/verify/info', {
      params: {
        mdl_tkn: mdlToken,
      },
    });

    return res.data as { phoneNumber: string; name: string };
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};
