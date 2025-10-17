import { AdmissionUserInstance } from "@entry/util-config";
import { useMutation } from "@tanstack/react-query"
import { IIdPhotoRequest } from "./types";
import { toast } from "react-toastify";

const path = "/photo"

export const usePostIdPhoto = () => {
  return useMutation({
    mutationFn: async (data: IIdPhotoRequest) => {
      const formData = new FormData();
      formData.append("image", data.file);
      const response = await AdmissionUserInstance.post(`${path}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const total = progressEvent.total ?? 0;
          const loaded = progressEvent.loaded ?? 0;
          if (total > 0) {
            const percent = Math.round((loaded * 100) / total);
            data.onProgress?.(percent);
          }
        },
      });
      return response;
    },
    onSuccess: () => {
      toast.success('증명사진 파일 업로드가 완료되었습니다.')
    },
    onError: () => {
      toast.error('증명사진 업로드가 실패하였습니다.')
    }
  })
}