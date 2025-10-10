import { AdmissionUserInstance } from "@entry/util-config";
import { useQuery } from "@tanstack/react-query";

export const useGetApplicationStatus = () => {
  return useQuery({
    queryKey: ['application-status'],
    queryFn: async () => {
      const { data } = await AdmissionUserInstance.get(`/application/status`);
      return data;
    },
  });
};
