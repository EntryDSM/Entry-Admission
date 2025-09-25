import { useMutation } from "@tanstack/react-query"
import { IValidateRequest } from "./types"
import { instance } from "@entry/util-config"
import { toast } from "react-toastify"

export const useValidatePost = <T extends IValidateRequest>() => {
  return useMutation({
    mutationFn: async(data : T) => {
      const response = await instance.post('/api/v1/validate', data);
      return response.data
    },
    onSuccess: () => {
      toast.success('성적 데이터 유효성 검사가 완료되었습니다.')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
}