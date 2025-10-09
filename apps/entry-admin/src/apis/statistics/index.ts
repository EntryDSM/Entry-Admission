import { useQuery } from '@tanstack/react-query';
import { AdmissionAdminInstance } from '@entry/util-config';
import { IRegionStatisticsResponse, ICompetitionRateResponse } from './types';

const path = '/statistics';

export const useGetRegionStatistics = () => {
  return useQuery({
    queryKey: ['statistics', 'region'],
    queryFn: async () => {
      const { data } = await AdmissionAdminInstance.get<IRegionStatisticsResponse>(`${path}/region`);
      return data;
    },
  });
};

export const useGetCompetitionRate = () => {
  return useQuery({
    queryKey: ['statistics', 'competition-rate'],
    queryFn: async () => {
      const { data } = await AdmissionAdminInstance.get<ICompetitionRateResponse>(`${path}/competition-rate`);
      return data;
    },
  });
};

export * from './types';
