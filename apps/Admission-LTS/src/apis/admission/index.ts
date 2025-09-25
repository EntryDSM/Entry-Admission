import { useMutation } from "@tanstack/react-query"
import { IAdmissionRequest } from "./types"
import { AdmissionUserInstance } from "@entry/util-config"
import { toast } from "react-toastify"

export const useAdmissionSubmitPost = <T extends IAdmissionRequest>() => {
  return useMutation({
    mutationFn: async(data : T) => {
      const response = await AdmissionUserInstance.post('/api/v1/applications', data);
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