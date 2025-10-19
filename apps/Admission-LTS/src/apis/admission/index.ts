import { useMutation } from "@tanstack/react-query"
import { IAdmissionRequest } from "./types"
import { AdmissionUserInstance } from "@entry/util-config"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"

const sendErrorReport = async (error: AxiosError<any>, requestData: any) => {
  try {
    const errorReport = {
      sessionId: crypto.randomUUID(),
      pageType: "ADMISSION_SUBMIT",
      endpoint: "/api/v1/applications",
      httpMethod: "POST",
      httpStatus: error.response?.status || 0,
      errorCategory: "CLIENT_ERROR",
      errorCode: error.code || "UNKNOWN_ERROR",
      message: error.message || "원서 제출 중 오류가 발생했습니다.",
      stackTrace: error.stack || "",
      requestPayload: JSON.stringify(requestData),
      responseTime: 0
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

const sendSubmissionReport = async (
  sessionId: string,
  submissionId: number,
  status: 'complete' | 'failed',
  errorMessage?: string
) => {
  try {
    const endpoint = status === 'complete'
      ? 'https://meeeeercat.ncloud.sbs/v1/submission/complete'
      : 'https://meeeeercat.ncloud.sbs/v1/submission/failed'

    const payload = {
      sessionId,
      submissionId,
      ...(status === 'failed' && { errorMessage: errorMessage || '원서 제출 중 오류가 발생했습니다.' })
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.error(`Report failed with status ${response.status}`)
    }
  } catch (reportError) {
    console.error('Error reporting failed:', reportError)
  }
}

export const useAdmissionSubmitPost = <T extends IAdmissionRequest>() => {
  const navigate = useNavigate()
  const sessionId = crypto.randomUUID()

  return useMutation({
    mutationFn: async (data: T) => {
      const response = await AdmissionUserInstance.post('/api/v1/applications', data)
      return response.data
    },

    onSuccess: (data) => {
      const submissionId = data?.id || data?.submissionId || 0

      toast.success('원서 제출이 정상적으로 완료되었습니다.')
      sendSubmissionReport(sessionId, submissionId, 'complete')

      setTimeout(() => {
        window.location.href = "https://entrydsm.kr/"
      }, 2000)
    },

    onError: async (error, variables) => {
      const err = error as AxiosError<any>
      const submissionId = (variables as any)?.id || (variables as any)?.submissionId || 0

      if (err.response?.status === 409) {
        toast.error('동일한 계정으로 제출된 원서가 존재합니다.')
        await sendSubmissionReport(
          sessionId,
          submissionId,
          'failed',
          '동일한 계정으로 제출된 원서가 존재합니다.'
        )

        setTimeout(() => {
          window.location.href = "https://entrydsm.kr/"
        }, 2000)
      } else if (err.response?.status === 400 || err.response?.status === 500 || err.response?.status === 502 || err.response?.status === 503) {
        toast.error("일시적으로 처리할 수 없습니다. 다시 시도해 주세요.")
        await sendSubmissionReport(
          sessionId,
          submissionId,
          'failed',
          `서버 오류 (HTTP ${err.response.status})`
        )

        setTimeout(() => {
          window.location.href = "https://entrydsm.kr/"
        }, 2000)
      } else {
        toast.error("원서 제출 중 오류가 발생했습니다.")

        await sendErrorReport(err, variables)
        await sendSubmissionReport(
          sessionId,
          submissionId,
          'failed',
          err.message || '원서 제출 중 오류가 발생했습니다.'
        )

        setTimeout(() => {
          window.location.href = "https://entrydsm.kr/"
        }, 2000)
      }
    }
  })
}
