import { useQuery } from '@tanstack/react-query';
import { AdmissionPublicInstance } from '@entry/util-config';

export const useGetSchoolSearch = (schoolName: string) => {
  return useQuery({
    queryKey: ['school', schoolName],
    queryFn: async () => {
      const { data } = await AdmissionPublicInstance.get(`/schools`, {
        params: { school_name: schoolName }
      });
      return data;
    },
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });
};