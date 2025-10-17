import { useQuery } from '@tanstack/react-query';
import { AdmissionAdminInstance } from '@entry/util-config';
import { IRegionStatisticsResponse, ICompetitionRateResponse, IGenderStatisticsResponse } from './types';

// 정확한 엔드포인트로 직접 호출

export const useGetRegionStatistics = () => {
  return useQuery({
    queryKey: ['statistics', 'region'],
    queryFn: async () => {
      const { data } = await AdmissionAdminInstance.get<IRegionStatisticsResponse>(
        '/api/v1/admin/statistics/region'
      );
      return data;
    },
  });
};

export const useGetGenderStatistics = () => {
  return useQuery({
    queryKey: ['statistics', 'gender'],
    queryFn: async () => {
      const { data } = await AdmissionAdminInstance.get<IGenderStatisticsResponse>(
        '/api/v1/admin/statistics/gender'
      );
      return data;
    },
  });
};

export const useGetCompetitionRate = () => {
  return useQuery({
    queryKey: ['statistics', 'competition-rate'],
    queryFn: async () => {
      const { data } = await AdmissionAdminInstance.get<ICompetitionRateResponse>(
        '/api/v1/admin/statistics/competition-rate'
      );
      return data;
    },
  });
};

export * from './types';
