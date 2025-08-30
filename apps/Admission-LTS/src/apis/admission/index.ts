import { useMutation } from "@tanstack/react-query"
import { IAdmissionRequest } from "./types"
import { instance } from "@entry/util-config"
import { toast } from "react-toastify"

export const useAdmissionSubmitPost = () => {
  return useMutation({
    mutationFn: async(data : IAdmissionRequest) => {
      const response = await instance.post('/api/v1/applications', data);
      return response.data
    },
    onSuccess: () => {
      toast.success('원서 제출이 정상적으로 완료되었습니다.')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
}