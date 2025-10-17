export interface IPdfPreviewSuccessRequest {
  sessionId: string;
  fileSize: number;
  generationTime: number;
}

export interface IPdfPreviewFailedRequest {
  sessionId: string;
  errorMessage: string;
}
