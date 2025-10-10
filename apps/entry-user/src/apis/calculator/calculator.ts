import { AdmissionPublicInstance } from '@entry/util-config';
import { CalculatorScoreRequest, CalculatorScoreResponse } from './types';

export const calculateScore = async (
  data: CalculatorScoreRequest
): Promise<CalculatorScoreResponse> => {
  const res = await AdmissionPublicInstance.post('/api/v1/public/calculator/score', data);
  return res.data;
};
