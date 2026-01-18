import { AdmissionPublicInstance } from '@entry/util-config';
import { CalculatorScoreRequest, CalculatorScoreResponse } from './types';

export const calculateScore = async (
  data: CalculatorScoreRequest
): Promise<CalculatorScoreResponse> => {
  const res = await AdmissionPublicInstance.post('/calculator', data);
  return res.data;
};
