import { AdmissionUserInstance } from '@entry/util-config';

export const createPassPopup = async () => {
  const redirectUrl = `${window.location.origin}/mypage`;

  const res = await AdmissionUserInstance.post('/user/verify/popup', { redirectUrl });
  return res.data;
};

export const getPassVerifyInfo = async (mdlToken: string) => {
  const { data } = await AdmissionUserInstance.get('/user/verify/info', {
    params: { mdl_tkn: mdlToken },
  });
  return data as { phoneNumber: string; name: string };
};
