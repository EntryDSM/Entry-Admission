import { useMutation } from "@tanstack/react-query"
import { IAdmissionRequest } from "./types"
import { AdmissionUserInstance } from "@entry/util-config"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"

export const useAdmissionSubmitPost = <T extends IAdmissionRequest>() => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async(data : T) => {
      const response = await AdmissionUserInstance.post('/api/v1/applications', data);
      return response.data
    },
    onSuccess: () => {
      toast.success('원서 제출이 정상적으로 완료되었습니다.')
    },
    onError: (error) => {
      const err = error as AxiosError<any>;
      if (err.response?.status === 409) {
        toast.error('동일한 계정으로 제출된 원서가 존재합니다.')
        setTimeout(() => {
          window.location.href="https://entrydsm.kr/"
        }, 3000)
      } else if (err.response?.status === 500) {
        toast.error("서버 오류가 발생했습니다. 다시 시도해주세요.");
        navigate('/')
      } else {
        toast.error("원서 제출 중 오류가 발생했습니다.");
        navigate('/')
      }
    }
  })
}