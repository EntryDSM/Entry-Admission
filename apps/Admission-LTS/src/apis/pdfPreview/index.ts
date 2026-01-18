import { useMutation } from "@tanstack/react-query"
import { IPdfPreviewRequest } from "./types"
import { AdmissionUserInstance } from "@entry/util-config"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

export const usePdfPreviewPost = <T extends IPdfPreviewRequest>() => {
  return useMutation({
    mutationFn: async(data : T) => {
      const response = await AdmissionUserInstance.post('/pdf/preview', data, {
        responseType: 'blob'
      });
      return response.data
    },
    onSuccess: () => {
      toast.success('pdf가 정상적으로 처리되었습니다.')
    },
    onError: () => {
      toast.error('pdf 생성에 실패하였습니다.')
    }
  })
}