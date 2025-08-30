import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IFormulaRequest } from "./types"
import { instance } from "@entry/util-config";
import { toast } from "react-toastify";

export const useFormulaPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(data : IFormulaRequest) => {
      const response = await instance.post('/api/v1/formulas', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('수식 생성이 완료되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['formula'] });
    },
    onError: (error) => {
      console.log(error);
    }
  })
}

export const useGetFormula = () => {
  return useQuery({
    queryKey: ['formula'],
    queryFn: async () => {
      const { data } = await instance.get('/api/v1/formulas');
      return data;
    }
  })
}

export const useFormulaDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async(formulaSetId : string) => {
      await instance.delete(`/api/v1/formulas/${formulaSetId}`);
    },
    onSuccess: () => {
      toast.success('수식 삭제가 완료되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['formula'] });
    },
    onError: (error) => {
      console.log(error);
    }
  })
}