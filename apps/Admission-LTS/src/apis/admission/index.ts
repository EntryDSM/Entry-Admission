import { useMutation } from "@tanstack/react-query"
import { IAdmissionRequest } from "./types"
import { AdmissionUserInstance } from "@entry/util-config"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"

const sendErrorReport = async (
  sessionId: string,
  error: AxiosError<any>,
  requestData: any,
  responseTime: number = 0
) => {
  try {
    const errorReport = {
      sessionId,
      pageType: "ADMISSION",
      endpoint: "/api/v1/applications",
      httpMethod: "POST",
      httpStatus: error.response?.status || 0,
      errorCategory: "SERVER_ERROR",
      errorCode: error.code || "UNKNOWN_ERROR",
      message: error.message || "원서 제출 중 오류가 발생했습니다.",
      stackTrace: error.stack || "",
      requestPayload: JSON.stringify(requestData),
      responseTime
    }

    await fetch('https://meeeeercat.ncloud.sbs/v1/error/server', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorReport)
    })
  } catch (reportError) {
    console.error('Error reporting failed:', reportError)
  }
}

export const useAdmissionSubmitPost = <T extends IAdmissionRequest>() => {
  const navigate = useNavigate()
  const sessionId = crypto.randomUUID()

  return useMutation({
    mutationFn: async (data: T) => {
      const startTime = Date.now()
      try {
        const response = await AdmissionUserInstance.post('/api/v1/applications', data)
        return response.data
      } catch (error) {
        const responseTime = Date.now() - startTime
        throw { error, responseTime }
      }
    },

    onSuccess: (data) => {
      toast.success('원서 제출이 정상적으로 완료되었습니다.')

      setTimeout(() => {
        window.location.href = "https://entrydsm.kr/"
      }, 2000)
    },

    onError: async (errorData: any, variables) => {
      const err = errorData.error as AxiosError<any>
      const responseTime = errorData.responseTime || 0

      if (err.response?.status === 409) {
        toast.error('동일한 계정으로 제출된 원서가 존재합니다.')
        await sendErrorReport(sessionId, err, variables, responseTime)

        setTimeout(() => {
          window.location.href = "https://entrydsm.kr/"
        }, 2000)
      } else if (err.response?.status === 400 || err.response?.status === 500 || err.response?.status === 502 || err.response?.status === 503 || err.response?.status === 530) {
        toast.error("일시적으로 처리할 수 없습니다. 다시 시도해 주세요.")
        await sendErrorReport(sessionId, err, variables, responseTime)

        setTimeout(() => {
          window.location.href = "https://entrydsm.kr/"
        }, 2000)
      } else {
        toast.error("원서 제출 중 오류가 발생했습니다.")
        await sendErrorReport(sessionId, err, variables, responseTime)

        setTimeout(() => {
          window.location.href = "https://entrydsm.kr/"
        }, 2000)
      }
    }
  })
}
